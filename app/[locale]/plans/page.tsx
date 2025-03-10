import { NavBar } from '@/components/NavBar';
import { getTranslations } from 'next-intl/server';
import { getServerUser } from '@/lib/auth-server';
import { PlansList } from '@/components/plans/PlansList';

export default async function PlansPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });
  const user = await getServerUser();
  const isAuthenticated = !!user;

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar locale={locale} />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">{t('plans.title')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('plans.description')}
          </p>
        </div>

        <PlansList
          isAuthenticated={isAuthenticated}
          userId={user?.id}
          locale={locale}
        />
      </main>
    </div>
  );
}
