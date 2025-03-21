import { typedApiClient } from '../server';

const getPlans = async () => {
  const response = await typedApiClient.GET('/plans');

  return response.data;
};

export { getPlans };
