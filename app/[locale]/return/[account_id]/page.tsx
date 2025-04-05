import React from 'react';
import OrganizationConnectSuccess from '@/components/OrganizationConnectSuccess';
import { ConnectionSuccessAnimation } from '@/components/SubtleAnimation';
import { Confetti } from '@/components/Confetti';

export default async function Return({
  params,
}: {
  params: Promise<{ account_id: string }>;
}) {
  const { account_id } = await params;
  console.log('connectedAccountId', account_id);

  return (
    <>
      <Confetti />
      <ConnectionSuccessAnimation />
      <OrganizationConnectSuccess />
    </>
  );
}
