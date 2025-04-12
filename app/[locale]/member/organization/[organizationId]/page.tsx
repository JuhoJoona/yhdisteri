import { getOrganization } from '@/lib/services/organizationService';
import { getOrganizationMembers } from '@/lib/services/usersService';
import { Building, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTranslations } from 'next-intl/server';
import { getOwnMembershipInfo } from '@/lib/services/usersService';
import { Organization } from '@/lib/types/organization';
import { getMembershipTypes } from '@/lib/services/plansService';
import Header from '../Header';
import OrganizationDetails from './OrganizationDetails';
import OrganizationMembers from './OrganizationMembers';
import OrganizationBilling from './OrganizationBilling';

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ organizationId: string; locale: string }>;
}) {
  const { organizationId, locale } = await params;
  const organizationData = await getOrganization(organizationId);
  const members = await getOrganizationMembers(organizationId);
  const membershipInfo = await getOwnMembershipInfo(organizationId);
  const membershipTypes = await getMembershipTypes(organizationId);

  const t = await getTranslations({ locale, namespace: 'Member' });

  const organization = organizationData as Organization;

  if (!organization) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <Building className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">
            {t('organizationNotFound')}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t('organizationNotFoundDescription')}
          </p>
          <Button asChild>
            <Link href="/member/dashboard">
              <ChevronLeft className="h-4 w-4 mr-2" />
              {t('backToDashboard')}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Header organization={organization} />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
          <TabsTrigger value="members">{t('members')}</TabsTrigger>
          <TabsTrigger value="subscription">{t('subscription')}</TabsTrigger>
        </TabsList>

        <OrganizationDetails
          organization={organization}
          membershipInfo={membershipInfo}
          members={members}
        />

        <OrganizationMembers members={members} />

        <OrganizationBilling
          membershipInfo={membershipInfo}
          membershipTypes={membershipTypes}
        />
      </Tabs>
    </div>
  );
}
