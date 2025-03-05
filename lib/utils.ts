import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
      
      return "Bearer eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18ydGRqS2wyRXdsaW5HblBQRW5jUzB4a1ZoUWoiLCJzcmYiOnRydWUsInR5cCI6IkpXVCJ9.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE3NDEwMTUxNTEsImZ2YSI6WzExMTEsLTFdLCJpYXQiOjE3NDEwMTUwOTEsImlzcyI6Imh0dHBzOi8vY2hhbXBpb24tbG9jdXN0LTE1LmNsZXJrLmFjY291bnRzLmRldiIsIm5iZiI6MTc0MTAxNTA4MSwic2lkIjoic2Vzc18ydG1EWGc1djZzZThSNGRiUWtra3pscFFBSlIiLCJzdWIiOiJ1c2VyXzJ0aUNxUHViWVJoRlhCdlI2aHg0bHRoUlRnTCJ9.aPsZFFeOJ1sJnTqbs2eTv0URVNCB4EHuUM9jarAQMsuKFBjXytV0iUdoAd8GOZ4fpIRrXUpiVYZmOFPrL6twP04HuL-WTtcP2jqyhyGXoYOzRs2EBZjXeC63hJxq3AnW64x2JJvA3Ob9CWSi6-xwRZJ2zpUuEaTi5jtShTKgVxwQSCpY4lxUQpe_Fc_11amvQIQYgM371CYfVcpecXV6gnndbhmLlNKvHb6H9T1sEVSlxjX7-a4EX3Nxzd6bgCuCeRG1s7eoYRQt3xiW_d3HXKuILZn2jQdk51E715EVstOCQxcLCfizdAbPPY7eXGlAAt90_e5VLCzm5G333s08lA"
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

export const isErrorResponse = (
  response: any,
): response is ApiResponse<unknown> => {
  return 'ok' in response && !response.ok;
};

