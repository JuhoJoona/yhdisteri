import createFetchClient, { type Middleware } from 'openapi-fetch';
import type { paths } from '@/lib/types';
import { useAuth } from '@clerk/nextjs';

export const typedApiClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002',
});

export function useApiClient() {
  const { getToken } = useAuth();

  const middleware: Middleware = {
    async onRequest({ request }) {
      const token = await getToken();
      if (token) {
        request.headers.set('Authorization', `Bearer ${token}`);
      }
      return request;
    },
  };

  const clientInstance = createFetchClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002',
  });

  clientInstance.use(middleware);

  return clientInstance;
}
