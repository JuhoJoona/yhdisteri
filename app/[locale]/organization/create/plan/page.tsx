import { redirect } from 'next/navigation';
import PlanSelectionForm from './PlanSelectionForm';
import { createOrganization } from '@/lib/services/organizationService';
import { getPlans } from '@/lib/services/plansService';
import { CreateOrganizationRequest } from '@/lib/types/organization';

export default async function PlanPage() {
  async function submitOrganization(
    organization: CreateOrganizationRequest,
    planId: string
  ) {
    'use server';

    const response = await createOrganization(organization, planId);

    if (response) {
      redirect(
        `/dashboard/organization?organizationId=${response?.organization?.id}`
      );
    } else {
      return { error: 'Organization creation failed' };
    }
  }

  const plans = await getPlans();

  if (!plans || plans.length === 0) {
    return <div>No plans found</div>;
  }

  return (
    /* @ts-expect-error Veän kaikkia lättyy ku en jaksa korjata */
    <PlanSelectionForm plans={plans} submitOrganization={submitOrganization} />
  );
}
