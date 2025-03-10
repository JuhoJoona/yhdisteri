import { SignUpForm } from '@/components/auth/SignUpForm';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('signUp.title'),
    description: t('signUp.description'),
  };
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign Up
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthProvider>
          <SignUpForm />
        </AuthProvider>
      </div>
    </div>
  );
}
