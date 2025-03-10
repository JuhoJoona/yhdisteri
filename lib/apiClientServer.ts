import createFetchClient, { type Middleware } from 'openapi-fetch';
import type { paths } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const typedApiClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002',
});

const middleware: Middleware = {
  async onRequest({ request }) {
    try {
      // Get the current session using server component client
      let token;

      try {
        // Try to get the session from the server component client
        const supabaseServer = createServerComponentClient({ cookies });
        const { data: sessionData } = await supabaseServer.auth.getSession();
        console.log('Server Session Data:', sessionData);
        token = sessionData.session?.access_token;
      } catch (error) {
        console.log(
          'Failed to get server session, falling back to client session:',
          error
        );
        // Fall back to the client-side session if server-side fails
        const { data: sessionData } = await supabase.auth.getSession();
        console.log('Client Session Data:', sessionData);
        token = sessionData.session?.access_token;
      }

      if (!token) {
        throw new Error('No authentication token available');
      }

      request.headers.set('Authorization', `Bearer ${token}`);
      request.headers.set('Content-Type', 'application/json');
      request.headers.set('Accept', 'application/json');

      return request;
    } catch (error) {
      console.error('API Client Middleware Error:', error);
      throw error;
    }
  },
  async onResponse({ response }) {
    if (!response.ok) {
      const error = await response.json().catch(() => null);
      console.error('API Response Error:', {
        status: response.status,
        statusText: response.statusText,
        error,
      });
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response;
  },
};

typedApiClient.use(middleware);
