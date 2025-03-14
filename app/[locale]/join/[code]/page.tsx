import {
  getOrganizationByCode,
  joinOrganizationByCode,
} from '@/lib/services/organizationService';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

const JoinPage = async ({
  params,
}: {
  params: Promise<{ code: string; locale: string }>;
}) => {
  const { code } = await params;
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Join' });
  const organization = await getOrganizationByCode(code);

  async function joinOrganization() {
    'use server';
    console.log('joinOrganization', code);
    const res = await joinOrganizationByCode(code);
    console.log('res', res);
    if (res) {
      redirect(`/member/organization/${res.organizationId}`);
    }
  }

  if (!organization) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {t('organizationNotFound')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('invalidCode')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            {t('title')}
          </h2>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">
              {t('organizationDetails')}
            </h3>

            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  {t('name')}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {organization.name}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  {t('code')}
                </span>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-900">
                  {organization.code}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-center text-md font-medium text-gray-400">
              {t('areYouSure')}
            </h3>
            <form
              action={async () => {
                'use server';
                await joinOrganization();
              }}
            >
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full mt-2"
              >
                {t('confirmJoin')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
