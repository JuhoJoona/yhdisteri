import { getOrganizationMembers } from '@/lib/services/usersService';
import ClientMembersTable from './ClientMembersTable';
import { StatsCard } from '@/components/StatsCard';
import CopyInviteLinkToClipboard from './CopyCodeToClipboard';
import { getOrganization } from '@/lib/services/organizationService';
import { CalendarIcon, ClockIcon, CodeIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

const OrganizationPage = async ({
  searchParams,
  params,
}: {
  searchParams: { organizationId?: string; searchTerm?: string };
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Organization' });
  const organizationId = searchParams.organizationId || '';
  const searchTerm = searchParams.searchTerm || '';

  const members = await getOrganizationMembers(organizationId);
  const organization = await getOrganization(organizationId);

  const newThisMonth =
    members?.filter(
      (member) =>
        member.joinDate &&
        new Date(member.joinDate) >
          new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    ).length || 0;
  const retention =
    members?.filter((member) => member.status === 'active').length || 0;

  return (
    <main className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {organization?.organization?.name || 'Organization'}{' '}
            {t('dashboard')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('manageYourOrganizationAndMembers')}
          </p>
        </div>
        <CopyInviteLinkToClipboard
          code={organization?.organization?.code || ''}
        />
      </div>

      {organization && (
        <div className="bg-card rounded-lg p-6 mb-8 border border-border">
          <h2 className="text-xl font-semibold mb-4">
            {t('organizationDetails')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <CodeIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t('organizationCode')}
                </p>
                <p className="font-medium">
                  {organization.organization?.code || 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t('created')}
                </p>
                <p className="font-medium">
                  {organization.organization?.createdAt
                    ? formatDate(new Date(organization.organization?.createdAt))
                    : 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <ClockIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t('lastUpdated')}
                </p>
                <p className="font-medium">
                  {organization.organization?.updatedAt
                    ? formatDate(new Date(organization.organization?.updatedAt))
                    : 'N/A'}
                </p>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <div className="flex items-center mt-2">
                <div
                  className={`h-3 w-3 rounded-full mr-2 ${
                    organization.organization?.paymentsActive
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                ></div>
                <span className="text-sm font-medium">
                  {t('paymentStatus')}:{' '}
                  {organization.organization?.paymentsActive
                    ? t('active')
                    : t('inactive')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        <StatsCard
          stats={{
            total: members?.length || 0,
            active:
              members?.filter((member) => member.status === 'active').length ||
              0,
            inactive:
              members?.filter((member) => member.status === 'inactive')
                .length || 0,
            pending:
              members?.filter((member) => member.status === 'pending').length ||
              0,
            newThisMonth: newThisMonth,
            retention: retention,
          }}
        />

        <div className="bg-card rounded-lg p-6 border border-border">
          <ClientMembersTable
            members={members || []}
            searchQuery={searchTerm}
            organizationId={organizationId}
            locale={locale}
          />
        </div>
      </div>
    </main>
  );
};

export default OrganizationPage;
