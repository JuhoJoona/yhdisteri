import { typedApiClient } from '../server';
import { OrganizationMembershipType } from '../types/plans';

const getPlans = async () => {
  const response = await typedApiClient.GET('/plans');

  return response.data;
};

const getMembershipTypes = async (organizationId: string) => {
  const response = await typedApiClient.GET(
    `/organizations/{id}/membership-types`,
    {
      params: {
        path: { id: organizationId },
      },
    }
  );

  return response.data;
};

export { getPlans, getMembershipTypes };
