import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { NavBar } from '@/components/NavBar';
import { Toaster } from '@/components/ui/sonner';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error('error', error);
    notFound();
  }

  if (!routing.locales.includes(locale as 'en' | 'fi' | 'sv')) notFound();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NavBar locale={locale} />
      <Toaster />
      {children}
    </NextIntlClientProvider>
  );
}
