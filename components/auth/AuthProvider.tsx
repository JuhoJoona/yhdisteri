'use client';

import { AuthProvider as AuthContextProvider } from '@/contexts/AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
