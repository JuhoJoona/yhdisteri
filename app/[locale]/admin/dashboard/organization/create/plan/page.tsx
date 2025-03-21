import { redirect } from 'next/navigation';
import PlanSelectionForm from './PlanSelectionForm';
import {
  createOrganization,
  CreateOrganizationRequest,
} from '@/lib/services/organizationService';
import { getPlans } from '@/lib/services/plansService';

export default async function PlanPage() {
  async function submitOrganization(
    organization: CreateOrganizationRequest,
    planId: string
  ) {
    'use server';
    console.log('submitOrganization', organization, planId);
    const response = await createOrganization(organization, planId);
    console.log('response', response);
    if (response && response.organization?.id) {
      redirect(`/lander`);
    } else {
      return { error: 'Organization creation failed' };
    }
  }

  const plans = await getPlans();
  console.log('plans', plans);
  if (!plans || plans.length === 0) {
    return <div>No plans found</div>;
  }

  return (
    <PlanSelectionForm plans={plans} submitOrganization={submitOrganization} />
  );
}
