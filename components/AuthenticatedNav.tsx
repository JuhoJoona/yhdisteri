import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from './ui/button';

const AuthenticatedNav = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale });
  return (
    <nav className="flex flex-row justify-between gap-x-2 text-center">
      <Button asChild>
        <Link href={`/${locale}/lander`}>{t('nav.dashboard')}</Link>
      </Button>
      <Button asChild>
        <Link href={`/${locale}/sign-out`}>{t('nav.signOut')}</Link>
      </Button>
      <Button asChild>
        <Link href={`/${locale}/member/dashboard`}>{t('nav.memberPages')}</Link>
      </Button>
      <Button asChild>
        <Link href={`/${locale}/admin/dashboard`}>{t('nav.adminPages')}</Link>
      </Button>
    </nav>
  );
};

export default AuthenticatedNav;
