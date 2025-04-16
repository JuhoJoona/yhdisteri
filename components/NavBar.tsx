import Link from 'next/link';
import { createClient } from '@/lib/server';
import AuthenticatedNav from './AuthenticatedNav';
import UnauthenticatedNav from './UnauthenticatedNav';
import Image from 'next/image';

export async function NavBar({ locale }: { locale: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/yhdisteri.svg"
            alt="Yhdisteri"
            width={150}
            height={150}
            priority
            className="h-20 w-auto"
          />
        </Link>

        <div className="flex items-center">
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
