import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from './ui/button';

const AuthenticatedNav = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale });
  return (
    <nav className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href={`/${locale}/member/dashboard`}>{t('nav.memberPages')}</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href={`/${locale}/admin/dashboard`}>{t('nav.adminPages')}</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href={`/${locale}/sign-out`}>{t('nav.signOut')}</Link>
      </Button>
    </nav>
  );
};

export default AuthenticatedNav;
