import createFetchClient, { type Middleware } from 'openapi-fetch';
import type { paths } from '@/lib/types';
import { createBrowserClient } from '@supabase/ssr';

export const typedApiClient = createFetchClient<paths>({
  baseUrl: 'https://yhdisteri-api.onrender.com',
});

const supabaseUrl = 'https://jpknmfiuuwknywnfokxa.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwa25tZml1dXdrbnl3bmZva3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MzExMTQsImV4cCI6MjA1NzIwNzExNH0.RCFAUeqEHkP3KPHEtz_xjQGsf9qDdZe0I8c628HUnGQ';

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export async function getUser() {
  const supabaseClient = createClient();
  const { data: sessionData } = await supabaseClient.auth.getSession();
  return sessionData.session?.user;
}

const middleware: Middleware = {
  async onRequest({ request }) {
    try {
      const supabaseClient = createClient();
      const { data: sessionData } = await supabaseClient.auth.getSession();
      console.log('Session Data:', sessionData);
      const token = sessionData.session?.access_token;

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
