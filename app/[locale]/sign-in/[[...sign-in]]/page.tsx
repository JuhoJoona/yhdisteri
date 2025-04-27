import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { login } from '@/lib/actions/authActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('signIn.title'),
    description: t('signIn.description'),
  };
}

export default async function SignInPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ redirect: string; code: string; error: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const { redirect: redirectDestination, code, error } = await searchParams;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {t('common.signIn')}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          action={async (formData) => {
            'use server';

            await login(formData, locale, redirectDestination, code);
          }}
          className="space-y-6"
        >
          <div>
            <Label htmlFor="email">{t('common.email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <Label htmlFor="password">{t('common.password')}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full"
            />
            {error && (
              <p className="text-red-500 text-sm">{t(`errors.${error}`)}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <Button
              type="submit"
              formAction={async (formData) => {
                'use server';
                await login(formData, locale, redirectDestination, code);
              }}
              className="w-full"
            >
              {t('common.signIn')}
            </Button>
          </div>
          <div className="flex space-x-4 justify-between flex-row">
            <Link
              href={`/${locale}/sign-up?redirect=${redirectDestination}&code=${code}`}
            >
              <h3 className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:underline">
                {t('common.dontHaveAccount')}
              </h3>
            </Link>
            <Link href="/privacy-policy">
              <h3 className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:underline">
                {t('common.privacyPolicy')}
              </h3>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
