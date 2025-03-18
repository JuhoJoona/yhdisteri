'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { User } from '@supabase/supabase-js';

export function ClientNavActions({
  user,
  locale,
}: {
  user: User;
  locale: string;
}) {
  const t = useTranslations();

  return (
    <div className="flex items-center">
      {user ? (
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link href={`/${locale}/lander`}>{t('nav.dashboard')}</Link>
          </Button>
        </div>
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
