import createFetchClient, { type Middleware } from 'openapi-fetch';
import type { paths } from '@/lib/types';
import { supabase } from '@/lib/supabase';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  const supabaseUrl = 'https://jpknmfiuuwknywnfokxa.supabase.co';
  const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwa25tZml1dXdrbnl3bmZva3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MzExMTQsImV4cCI6MjA1NzIwNzExNH0.RCFAUeqEHkP3KPHEtz_xjQGsf9qDdZe0I8c628HUnGQ';

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

export const typedApiClient = createFetchClient<paths>({
  baseUrl: 'http://localhost:3002',
});

const middleware: Middleware = {
  async onRequest({ request }) {
    try {
      // Routes that don't require authentication
      const publicRoutes = [
        `http://localhost:3002/plans`,
        `http://localhost:3002/health`,
      ];

      // Skip authentication for public routes
      console.log('Request URL:', request.url);
      if (publicRoutes.includes(request.url)) {
        console.log('Skipping authentication for public route:', request.url);
        request.headers.set('Content-Type', 'application/json');
        request.headers.set('Accept', 'application/json');
        return request;
      }

      // Get the current session using server component client
      let token;

      try {
        // Try to get the session from the server component client
        const supabaseServer = await createClient();
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
