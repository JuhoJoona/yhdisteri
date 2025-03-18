import { Building } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export const EmptyOrganizationItem = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale, namespace: 'lander' });

  return (
    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
      <Building className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">{t('noOrganizations')}</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {t('noOrganizationsDescription')}
      </p>
    </div>
  );
};
