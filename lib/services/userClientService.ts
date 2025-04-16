import { typedApiClient } from '../client';
import { UpdateUserRequestBody } from '../types/member';

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

export const suspendMember = async (
  organizationId: string,
  memberId: string
) => {
  const response = await typedApiClient.POST(
    '/organizations/{organizationId}/members/{memberId}/suspend',
    {
      params: {
        path: { organizationId, memberId },
      },
    }
  );
  return response.data;
};
