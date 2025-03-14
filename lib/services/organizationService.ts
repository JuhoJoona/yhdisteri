import { typedApiClient } from '../server';
import { paths } from '../types';

export type CreateOrganizationRequest =
  paths['/organizations/create']['post']['requestBody']['content']['application/json'];

const createOrganization = async (
  organization: CreateOrganizationRequest,
  planId: string
) => {
  try {
    console.log('createOrganization', organization, planId);
    const response = await typedApiClient.POST('/organizations/create', {
      body: {
        ...organization,
        planId,
      },
    });
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
};

const getOrganization = async (organizationId: string) => {
  try {
    console.log('getOrganization', organizationId);
    const response = await typedApiClient.GET('/organizations/{id}', {
      params: {
        path: { id: organizationId },
      },
    });
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
};

const getOrganizationByCode = async (code: string) => {
  try {
    console.log('getOrganizationByCode', code);
    const response = await typedApiClient.GET('/organizations/code/{code}', {
      params: {
        path: { code },
      },
    });
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
};

const joinOrganizationByCode = async (code: string) => {
  try {
    console.log('joinOrganizationByCode', code);
    const response = await typedApiClient.POST(
      '/organizations/code/{code}/join',
      {
        params: {
          path: { code },
        },
      }
    );
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('error', error);
    return null;
  }
};
export {
  createOrganization,
  getOrganization,
  getOrganizationByCode,
  joinOrganizationByCode,
};
