import { paths } from '.';

export type Plan =
  paths['/plans']['get']['responses']['200']['content']['application/json'];

export type OrganizationMembershipTypes =
  paths['/organizations/{id}/membership-types']['get']['responses']['200']['content']['application/json'];

export type OrganizationMembershipType = OrganizationMembershipTypes[number];
