import createFetchClient, { type Middleware } from 'openapi-fetch';
import type { paths } from '@/lib/types';
import { createClient } from '@supabase/supabase-js';

const customFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(input, {
    ...init,
    redirect: 'follow',
    credentials: 'include',
  });
  return response;
};

export const typedApiClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002',
  fetch: customFetch,
});

const middleware: Middleware = {
  async onRequest({ request }) {
    try {
      // Create a Supabase client for server-side requests
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      );

      // Get the session from Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No authenticated user found');
      }

      const token = session.access_token;
      if (!token) {
        throw new Error('No authentication token available');
      }

      request.headers.set('Authorization', `Bearer ${token}`);
      request.headers.set('Content-Type', 'application/json');
      request.headers.set('Accept', 'application/json');

      console.log('API Request:', {
        url: request.url,
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
      });

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
