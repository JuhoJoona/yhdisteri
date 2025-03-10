import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth-server';

export async function ProtectedRoute({
  children,
  redirectTo = '/sign-in',
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}
