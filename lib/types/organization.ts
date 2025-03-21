import { paths } from '@/lib/types';

export type CreateOrganizationRequest =
  paths['/organizations/create']['post']['requestBody']['content']['application/json'];

export type Organization =
  paths['/organizations/{id}']['get']['responses']['200']['content']['application/json'];
