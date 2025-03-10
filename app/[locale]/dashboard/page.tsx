import { ProtectedRoute } from '@/components/ProtectedRoute';
import { NavBar } from '@/components/NavBar';
import { getServerUser } from '@/lib/auth-server';
import { getTranslations } from 'next-intl/server';

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });
  const user = await getServerUser();

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <NavBar locale={locale} />

        <main className="flex-1 container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">{t('dashboard.title')}</h1>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t('dashboard.welcome')}
            </h2>
            <p className="mb-4">
              {t('dashboard.welcomeMessage', {
                name:
                  user?.user_metadata?.first_name ||
                  user?.email ||
                  t('dashboard.user'),
              })}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">
                  {t('dashboard.organizations')}
                </h3>
                <p className="text-gray-600">
                  {t('dashboard.organizationsDescription')}
                </p>
                <button className="mt-4 text-primary hover:underline">
                  {t('dashboard.manageOrganizations')}
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">{t('dashboard.profile')}</h3>
                <p className="text-gray-600">
                  {t('dashboard.profileDescription')}
                </p>
                <button className="mt-4 text-primary hover:underline">
                  {t('dashboard.editProfile')}
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">{t('dashboard.settings')}</h3>
                <p className="text-gray-600">
                  {t('dashboard.settingsDescription')}
                </p>
                <button className="mt-4 text-primary hover:underline">
                  {t('dashboard.manageSettings')}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
