import Link from 'next/link';
import { createClient } from '@/lib/server';
import AuthenticatedNav from './AuthenticatedNav';
import UnauthenticatedNav from './UnauthenticatedNav';
import Image from 'next/image';
import { ThemeToggle } from './theme-toggle';

export async function NavBar({ locale }: { locale: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50  backdrop-blur-sm border-b py-2">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/yhdisteri.svg"
            alt="Yhdisteri"
            width={150}
            height={150}
            priority
            className="h-28 w-auto dark:invert"
          />
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <AuthenticatedNav locale={locale} />
          ) : (
            <UnauthenticatedNav locale={locale} />
          )}
        </div>
      </div>
    </header>
  );
}
