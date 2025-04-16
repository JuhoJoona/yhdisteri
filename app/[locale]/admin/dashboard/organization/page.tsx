import { getOrganizationMembers } from '@/lib/services/usersService';
import ClientMembersTable from './ClientMembersTable';
import CopyInviteLinkToClipboard from './CopyCodeToClipboard';
import {
  getOrganization,
  getOrganizationMembershipTypes,
} from '@/lib/services/organizationService';
import { AlertCircle, CalendarIcon, ClockIcon, CodeIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MembershipTypesTable from '@/components/MembershipTypesTable';

const OrganizationPage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ organizationId?: string; searchTerm?: string }>;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Organization' });

  const { organizationId, searchTerm } = await searchParams;

  const members = await getOrganizationMembers(organizationId || '');
  const organization = await getOrganization(organizationId || '');
  const membershipTypes = await getOrganizationMembershipTypes(
    organizationId || ''
  );
  console.log('membershipTypes', membershipTypes);

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

      <div className="mb-8">
        {!organization?.organization?.stripeAccountConnected && (
          <div className="bg-card rounded-md p-6 border border-red-500 flex items-center flex-row gap-2 justify-between">
            <div className="flex items-center flex-row gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <h2 className="text-sm font-medium text-muted-foreground">
                {t('stripeAccountNotConnected')}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('stripeAccountNotConnectedDescription')}
            </p>
            <Button variant="outline" size="sm">
              <Link
                href={`/admin/dashboard/organization/stripe?organizationId=${organizationId}`}
              >
                {t('connectStripeAccount')}
              </Link>
            </Button>
          </div>
        )}
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
                  {organization.organization?.paymentsActive
                    ? t('canReceivePayments')
                    : t('cannotReceivePayments')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <MembershipTypesTable
        membershipTypes={membershipTypes || []}
        organizationId={organizationId || ''}
        stripeAccountConnected={
          organization?.organization?.stripeAccountConnected || false
        }
      />

      <div className="space-y-8">
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
