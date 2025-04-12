import React from 'react';
import OrganizationConnectSuccess from '@/components/OrganizationConnectSuccess';
import { ConnectionSuccessAnimation } from '@/components/SubtleAnimation';
import { Confetti } from '@/components/Confetti';
import { getOrganizationByStripeId } from '@/lib/services/organizationService';

export default async function Return({
  params,
}: {
  params: Promise<{ account_id: string }>;
}) {
  const { account_id } = await params;
  console.log('connectedAccountId', account_id);
  const organizationData = await getOrganizationByStripeId(account_id);
  console.log('organization', organizationData);

  const orgName = organizationData?.organization?.name;

  return (
    <>
      <Confetti />
      <ConnectionSuccessAnimation />
      <OrganizationConnectSuccess
        isLoading={false}
        orgName={orgName}
        organizationId={organizationData?.organization?.id}
      />
    </>
  );
}
