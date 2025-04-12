import { typedApiClient } from '../client';

const createAccountLink = async (connectedAccountId: string) => {
  const response = await typedApiClient.POST('/billing/account_link', {
    body: {
      account: connectedAccountId,
    },
  });

  return response.data;
};

const createAccount = async (organizationId: string) => {
  console.log('createAccount', organizationId);
  const response = await typedApiClient.POST('/billing/account', {
    body: {
      organizationId: organizationId,
    },
  });

  return response.data;
};

export { createAccountLink, createAccount };
