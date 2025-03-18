import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getAccessToken } from './supabase';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  if (!date) return 'N/A';
  return date.toLocaleDateString('fi-FI', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
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
    const token = await getAccessToken();
    return token ? `Bearer ${token}` : null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

export const isErrorResponse = (
  response: any
): response is ApiResponse<unknown> => {
  return 'ok' in response && !response.ok;
};
