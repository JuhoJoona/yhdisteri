import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getOrganizationByCode } from '@/lib/services/organizationService';
import { getTranslations } from 'next-intl/server';

const JoinPage = async ({
  params,
}: {
  params: Promise<{ code: string; locale: string }>;
}) => {
  const { code } = await params;
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Join' });

  const organization = await getOrganizationByCode(code);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {t('title')}
        </h2>
        <p>{organization?.name}</p>
        <p>{organization?.code}</p>
      </div>
    </div>
  );
};

export default JoinPage;
