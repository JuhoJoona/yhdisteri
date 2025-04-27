import React from 'react';
import { Check, Home } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function PaymentSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Payment' });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <div className="relative mb-10">
        <div className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-white flex items-center justify-center">
          <div className={`transition-all duration-700`}>
            <Check size={40} strokeWidth={3} color="green" />
          </div>
        </div>
        <div
          className={`absolute inset-0 rounded-full border-4 border-black dark:border-white transition-all duration-1000`}
        ></div>
        <div
          className={`absolute inset-0 rounded-full border-2 border-black dark:border-white transition-all duration-1500 delay-200`}
        ></div>
      </div>

      <div className={`text-center max-w-md`}>
        <h1 className="text-3xl font-bold mb-2">{t('paymentSuccessful')}</h1>
        <p className="text-gray-600 mb-8">
          {t('paymentSuccessfulDescription')}
        </p>

        <Link
          className="flex items-center justify-center"
          href={`/${locale}/member/dashboard`}
        >
          <button className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium border border-black hover:bg-gray-100 transition-colors">
            <Home size={18} />
            <span>{t('dashboard')}</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
