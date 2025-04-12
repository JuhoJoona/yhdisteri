import { typedApiClient } from '../client';
import { OrganizationMembershipType } from '../types/plans';

const createMembershipType = async (
  organizationId: string,
  membershipType: OrganizationMembershipType
) => {
  const response = await typedApiClient.POST(
    '/organizations/{id}/membership-types',
    {
      params: { path: { id: organizationId } },
      body: {
        name: membershipType.name || '',
        description: membershipType.description || '',
        price: membershipType.price || 0,
        interval: membershipType.interval || '',
        stripeProductId: membershipType.stripeProductId || '',
      },
    }
  );

  return response.data;
};

export { createMembershipType };
