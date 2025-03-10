import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { isAuthenticated } from '@/lib/auth-server';
import { ClientNavActions } from './ClientNavActions';

export async function NavBar({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });
  const authenticated = await isAuthenticated();

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
              <Link href="/plans" className="text-gray-500 hover:text-gray-900">
                {t('nav.plans')}
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900">
                {t('nav.about')}
              </Link>
              {authenticated && (
                <Link
                  href="/dashboard"
                  className="text-gray-500 hover:text-gray-900"
                >
                  {t('nav.dashboard')}
                </Link>
              )}
            </nav>
          </div>

          <ClientNavActions authenticated={authenticated} />
        </div>
      </div>
    </header>
  );
}
