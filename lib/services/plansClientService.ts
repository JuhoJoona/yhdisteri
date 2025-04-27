import { typedApiClient } from '../client';
import { OrganizationMembershipType } from '../types/plans';

export const getMembershipType = async (id: string) => {
  const response = await typedApiClient.GET(
    '/organizations/membership-types/{id}',
    {
      params: {
        path: {
          id,
        },
      },
    }
  );

  return response.data;
};

export const createMembershipType = async (
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
        price: parseFloat(membershipType.price || '0'),
        interval: membershipType.interval || '',
        stripeProductId: membershipType.stripeProductId || '',
        accessCode: membershipType.accessCode || '',
      },
    }
  );

  return response.data;
};
