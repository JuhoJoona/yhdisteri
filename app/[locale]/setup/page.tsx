import SetupForm from './SetupForm';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { NavBar } from '@/components/NavBar';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('setup.title'),
    description: t('setup.description'),
  };
}

export default async function SetupPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <NavBar locale={locale} />

        <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-12">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-8">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-primary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-primary font-bold text-3xl">Y</span>
                </div>
              </div>
            </div>
            <SetupForm />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
