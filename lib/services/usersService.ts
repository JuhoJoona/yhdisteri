import { typedApiClient } from '../server';
import { UpdateUserRequestBody } from '../types/member';

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

export const updateUserById = async (
  id: string,
  data: UpdateUserRequestBody
) => {
  const response = await typedApiClient.PUT('/users/{id}', {
    params: {
      path: { id },
    },
    body: data,
  });
  return response.data;
};

export const getUserPreferences = async () => {
  const response = await typedApiClient.GET('/users/preferences/me');
  return response.data;
};
