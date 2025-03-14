import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { login } from '@/lib/actions/authActions';
import { signup } from '@/lib/actions/authActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SignIn' });
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {t('title')}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          action={async (formData) => {
            'use server';
            await login(formData, locale);
          }}
          method="POST"
          className="space-y-6"
        >
          <div>
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <Label htmlFor="password">{t('password')}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full"
            />
          </div>

          <div className="flex space-x-4">
            <Button
              type="submit"
              formAction={async (formData) => {
                'use server';
                await login(formData, locale);
              }}
              className="w-full"
            >
              {t('signup')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
