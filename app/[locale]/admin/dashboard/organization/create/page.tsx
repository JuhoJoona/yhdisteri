import BasicInfoForm from './BasicInfoForm';

export default async function CreateOrganizationPage({
  searchParams,
}: {
  searchParams: Promise<{ plan: string }>;
}) {
  const { plan } = await searchParams;
  return <BasicInfoForm plan={plan} />;
}
