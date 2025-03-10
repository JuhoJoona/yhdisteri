'use client';

import { UserButton } from '@/components/auth/AuthComponents';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function ClientNavActions({
  authenticated,
}: {
  authenticated: boolean;
}) {
  const t = useTranslations();

  return (
    <div className="flex items-center">
      {authenticated ? (
        <AuthProvider>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link href="/dashboard">{t('nav.dashboard')}</Link>
            </Button>
            <UserButton />
          </div>
        </AuthProvider>
      ) : (
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link href="/sign-in">{t('nav.signIn')}</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">{t('nav.signUp')}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
