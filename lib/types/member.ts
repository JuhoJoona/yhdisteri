import { paths } from '.';

export type OwnData =
  paths['/users/me']['get']['responses']['200']['content']['application/json'];
export type UserOrganizations =
  paths['/users/organizations']['get']['responses']['200']['content']['application/json'];

export type UserOrganization = UserOrganizations[number];

export type OrganizationMemberResponse =
  paths['/organizations/{id}/members']['get']['responses']['200']['content']['application/json'];

export type OrganizationMember = OrganizationMemberResponse[number];
