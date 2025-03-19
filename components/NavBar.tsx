import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/server';
import AuthenticatedNav from './AuthenticatedNav';
import UnauthenticatedNav from './UnauthenticatedNav';

export async function NavBar({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-white shadow flex flex-row justify-between text-center px-12 py-4">
      <Link href="/" className="text-xl font-bold">
        Yhdisteri
      </Link>

      <div className="flex flex-row justify-between text-center">
        {user ? (
          <AuthenticatedNav locale={locale} />
        ) : (
          <UnauthenticatedNav locale={locale} />
        )}
      </div>
    </header>
  );
}
