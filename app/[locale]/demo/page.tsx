import Link from 'next/link';
import { DemoRequestForm } from './demoRequestForm';
import { getTranslations } from 'next-intl/server';

export default async function DemoRequestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'DemoRequestForm' });
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
              {t('title')}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {t('description')}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-lg md:p-8 dark:bg-[#111111]">
            <DemoRequestForm />
          </div>

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-300">
            <p>
              {t('haveQuestions')}
              <Link
                href="mailto:joni@pohina.group"
                className="text-blue-600 ml-2 hover:underline"
              >
                {t('email')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
