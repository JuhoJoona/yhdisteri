import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ClientNavActions } from './ClientNavActions';
import { createClient } from '@/lib/server';
import { User } from '@supabase/supabase-js';

export async function NavBar({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-xl font-bold">
                Yhdisteri
              </Link>
            </div>
            <nav className="ml-6 flex items-center space-x-4">
              <Link
                href={`/${locale}/plans`}
                className="text-gray-500 hover:text-gray-900"
              >
                {t('nav.plans')}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-gray-500 hover:text-gray-900"
              >
                {t('nav.about')}
              </Link>
              {user && (
                <Link
                  href={`/${locale}/lander`}
                  className="text-gray-500 hover:text-gray-900"
                >
                  {t('nav.dashboard')}
                </Link>
              )}
            </nav>
          </div>

          <ClientNavActions user={user as User} locale={locale} />
        </div>
      </div>
    </header>
  );
}
