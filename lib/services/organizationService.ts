import { typedApiClient } from '../server';
import { CreateOrganizationRequest } from '../types/organization';

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
    const response = await fetch(
      `https://yhdisteri-api.onrender.com/organizations/code/${code}`
    );
    const data = await response.json();
    console.log('response', data);
    return data;
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

const addOrganizationStripeId = async (
  organizationId: string,
  stripeId: string
) => {
  try {
    console.log('addOrganizationStripeId', organizationId, stripeId);
    const response = await typedApiClient.POST(
      '/organizations/billing/stripe',
      {
        body: {
          organizationId,
          stripeId,
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
  addOrganizationStripeId,
};
