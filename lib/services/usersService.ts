import { typedApiClient } from '../server';

export const getUserByExternalId = async (id: string) => {
  try {
    const response = await typedApiClient.GET('/users/external/{id}', {
      params: {
        path: { id },
      },
    });
    if (!response.data) {
      throw new Error(`User with id ${id} not found`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOwnData = async () => {
  try {
    const response = await typedApiClient.GET('/users/me');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getUserOrganizations = async () => {
  try {
    const response = await typedApiClient.GET('/users/organizations');
    console.log('User Organizations:', response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrganizationMembers = async (organizationId: string) => {
  try {
    const response = await typedApiClient.GET('/organizations/{id}/members', {
      params: {
        path: { id: organizationId },
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const approveMember = async (
  organizationId: string,
  memberId: string
) => {
  try {
    const response = await typedApiClient.POST(
      '/organizations/{organizationId}/members/{memberId}/approve',
      {
        params: {
          path: { organizationId, memberId },
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserMembershipInfo = async (
  organizationId: string,
  memberId: string
) => {
  const response = await typedApiClient.GET(
    '/users/organization/{organizationId}/members/{memberId}',
    {
      params: {
        path: { organizationId, memberId },
      },
    }
  );
  return response.data;
};

export const getOwnMembershipInfo = async (organizationId: string) => {
  const response = await typedApiClient.GET(
    '/users/organization/{organizationId}/me',
    {
      params: {
        path: { organizationId },
      },
    }
  );
  return response.data;
};

export const getUserPreferences = async () => {
  const response = await typedApiClient.GET('/users/preferences/me');
  return response.data;
};

export const getUserBillingDetails = async () => {
  const response = await typedApiClient.GET('/users/billing/me');
  return response.data;
};

export const updateUserBillingDetails = async (details: {
  billingStreet: string;
  billingCity: string;
  billingZip: string;
  billingFullname: string;
  billingEmail: string;
  billingCompany: string | null;
  billingCompanyId: string | null;
}) => {
  const response = await typedApiClient.POST('/users/billing/me', {
    body: details,
  });
  return response.data;
};

export const updateUserPreferences = async (preferences: {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
}) => {
  const response = await typedApiClient.POST('/users/preferences/me', {
    body: preferences,
  });
  return response.data;
};
