import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth, currentUser } from '@clerk/nextjs/server';
import { useAuth } from '@clerk/nextjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  isNetworkError?: boolean;
  error?: {
    message: string;
    code: string;
  };
}

export async function getTokenWithClerk(): Promise<string | null> {
  try {
      const { getToken } = await auth();
      return await getToken();
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

export async function getCurrentUser() {
  try {
    return await currentUser();
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export function useClerkToken() {
  const { getToken } = useAuth();
  
  const getClientToken = async (): Promise<string | null> => {
    try {
      return await getToken();
    } catch (error) {
      console.error('Error getting client token:', error);
      return null;
    }
  };
  
  return { getClientToken };
} 
export const isErrorResponse = (
  response: any,
): response is ApiResponse<unknown> => {
  return 'ok' in response && !response.ok;
};

