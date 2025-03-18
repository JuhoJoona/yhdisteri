import { getUserOrganizations } from '@/lib/services/usersService';
import { Building, Plus, HelpCircle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import MyOrganizationItem from './MyOrganizationItem';
import AdminOrganizationItem from './AdminOrganizationItem';
import { EmptyOrganizationItem } from './EmptyOrganizationItem';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
export default async function Dashboard({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const organizations = await getUserOrganizations();
  const t = await getTranslations({ locale, namespace: 'lander' });

  if (!organizations || organizations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <Building className="w-20 h-20 mx-auto text-blue-500 mb-6" />
          <h1 className="text-2xl font-bold mb-4">{t('noOrganizations')}</h1>
          <p className="text-gray-600 mb-8">
            {t('noOrganizationsDescription')}
          </p>

          <Button>
            <Link
              href={`/${locale}/admin/dashboard/organization/create`}
              className=""
            >
              <Plus className="w-5 h-5 mr-2" />
              {t('createOrganization')}
            </Link>
          </Button>
          <Button variant="outline">
            <Link href="/join" className="p-4">
              <h3 className="">{t('joinOrganization')}</h3>
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const organizationsWhereAdmin = organizations.filter(
    (org) => org.role === 'admin'
  );

  const organizationsWhereMember = organizations.filter(
    (org) => org.role !== 'admin'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('yourOrganizations')}
            </h1>
            <p className="text-gray-600 mt-1">
              {t('manageAndAccessYourOrganizations')}
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Button>
              <Link href={`/${locale}/admin/dashboard/organization/create`}>
                {t('createOrganization')}
              </Link>
            </Button>
            <Button variant="outline">
              <Link href="/join" className="p-4">
                <h3 className="">{t('joinOrganization')}</h3>
              </Link>
            </Button>
          </div>
        </div>

        {organizations.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <Building className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              {t('noOrganizations')}
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {t('noOrganizationsDescription')}
            </p>
            <Link
              href="/dashboard/organization/create"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              {t('createOrganization')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <h2 className="text-xl font-semibold mb-2">
              {t('memberInOrganization')}
            </h2>
            {organizationsWhereMember.length == 0 ? (
              <EmptyOrganizationItem locale={locale} admin={false} />
            ) : (
              <>
                {organizationsWhereMember.map((org) => (
                  <MyOrganizationItem key={org.id} org={org} locale={locale} />
                ))}
              </>
            )}
            <Separator className="my-4" />
            <h2 className="text-xl font-semibold mb-2">
              {t('adminInOrganization')}
            </h2>
            {organizationsWhereAdmin.length == 0 ? (
              <EmptyOrganizationItem locale={locale} admin={true} />
            ) : (
              <>
                {organizationsWhereAdmin.map((org) => (
                  <AdminOrganizationItem
                    key={org.id}
                    organization={org}
                    locale={locale}
                  />
                ))}
              </>
            )}
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-start">
            <HelpCircle className="w-6 h-6 text-blue-500 mr-4 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {t('needHelpTitle')}
              </h2>
              <p className="text-gray-600">
                <Link href="/help" className="text-blue-600 hover:underline">
                  {t('helpCenter')}
                </Link>{' '}
                or contact{' '}
                <a
                  href="mailto:support@example.com"
                  className="text-blue-600 hover:underline"
                >
                  {t('supportEmail')}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
