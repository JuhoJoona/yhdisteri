import { typedApiClient } from '../client';

interface CreateCheckoutSessionParams {
  organizationId: string;
  membershipTypeId: string;
  price: number;
  interval: string;
  memberId: string;
}

export const createCheckoutSession = async (
  params: CreateCheckoutSessionParams
) => {
  try {
    console.log('Creating checkout session with params:', params);
    const response = await typedApiClient.POST('/billing/checkout', {
      body: {
        organizationId: params.organizationId,
        membershipTypeId: params.membershipTypeId,
        price: params.price,
        interval: params.interval,
        memberId: params.memberId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const createAccount = async (organizationId: string) => {
  try {
    const response = await typedApiClient.POST('/billing/account', {
      body: {
        organizationId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Stripe account:', error);
    throw error;
  }
};

export const createAccountLink = async (accountId: string) => {
  try {
    const response = await typedApiClient.POST('/billing/account_link', {
      body: {
        account: accountId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating account link:', error);
    throw error;
  }
};

export const getCheckoutSession = async (sessionId: string) => {
  try {
    const response = await typedApiClient.GET('/billing/checkout/{sessionId}', {
      params: {
        path: {
          sessionId,
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching checkout session:', error);
    throw error;
  }
};
