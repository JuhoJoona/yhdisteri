import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { signup } from '@/lib/actions/authActions';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('signUp.title'),
    description: t('signUp.description'),
  };
}

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {t('common.signUp')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('common.alreadyHaveAccount')}{' '}
          <Link
            href={`/${locale}/sign-in`}
            className="font-medium text-primary hover:text-primary/90 hover:underline"
          >
            {t('common.signIn')}
          </Link>
        </p>
      </div>

      <Card className="w-full mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>{t('common.createAccount')}</CardTitle>
          <CardDescription>{t('common.fillDetails')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              'use server';
              await signup(formData, locale);
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="first_name" className="text-sm font-medium">
                  {t('common.firstName')}
                </Label>
                <Input
                  id="first_name"
                  name="first_name"
                  required
                  className="mt-1 block w-full"
                  placeholder={t('common.firstNamePlaceholder')}
                />
              </div>

              <div>
                <Label htmlFor="last_name" className="text-sm font-medium">
                  {t('common.lastName')}
                </Label>
                <Input
                  id="last_name"
                  name="last_name"
                  required
                  className="mt-1 block w-full"
                  placeholder={t('common.lastNamePlaceholder')}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                {t('common.email')}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full"
                placeholder={t('common.emailPlaceholder')}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                {t('common.password')}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full"
                placeholder={t('common.passwordPlaceholder')}
              />
              <p className="mt-1 text-xs text-gray-500">
                {t('common.passwordRequirements')}
              </p>
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                {t('common.phone')}
              </Label>
              <Input
                id="phone"
                name="phone"
                required
                className="mt-1 block w-full"
                placeholder={t('common.phonePlaceholder')}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full py-2 font-semibold">
                {t('common.signUp')}
              </Button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-4">
              {t('common.termsNotice')}{' '}
              <Link
                href={`/${locale}/terms`}
                className="text-primary hover:underline"
              >
                {t('common.terms')}
              </Link>{' '}
              {t('common.and')}{' '}
              <Link
                href={`/${locale}/privacy`}
                className="text-primary hover:underline"
              >
                {t('common.privacyPolicy')}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
