import { ArrowRight } from 'lucide-react';
import { KeyRound } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function JoinCodePage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { error?: string };
}) {
  const t = await getTranslations({ locale, namespace: 'inputCode' });
  const error = searchParams?.error;

  async function joinOrganization(formData: FormData) {
    'use server';

    const joinCode = formData.get('joinCode') as string;

    if (!joinCode || !joinCode.trim()) {
      // You could return an error here, but for simplicity we'll just redirect
      // to the same page (in a real app, you might want to add error handling)
      return redirect('/lander?error=empty-code');
    }

    // Redirect to the join page with the code
    return redirect(`/join/${joinCode.trim()}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
          <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-6">
            <KeyRound className="w-10 h-10 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold mb-3">{t('joinOrganization')}</h1>
          <p className="text-gray-600 mb-8">{t('enterJoinCodeDescription')}</p>

          <form action={joinOrganization} className="w-full">
            <div className="relative">
              <input
                type="text"
                name="joinCode"
                placeholder={t('enterJoinCode')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />

              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {error === 'empty-code' && (
              <p className="mt-2 text-red-600 text-sm">{t('emptyCodeError')}</p>
            )}

            <p className="mt-3 text-sm text-gray-500">{t('joinCodeExample')}</p>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 mb-4">{t('dontHaveCode')}</p>
            <div className="flex flex-col space-y-3">
              <Link
                href="/admin/dashboard/organization/create"
                className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('createOrganization')}
              </Link>

              <Link
                href="/dashboard"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {t('backToLander')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
