import { typedApiClient } from '../server';
import { paths } from '../types';

export type Plan =
  paths['/plans']['get']['responses']['200']['content']['application/json'];

const getPlans = async () => {
  const response = await typedApiClient.GET('/plans');

  return response.data;
};

export { getPlans };
