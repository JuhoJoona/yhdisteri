import { getUserByExternalId } from '@/lib/services/usersService';
import { MemberDetails } from '@/components/MemberDetails';
import { getTranslations } from 'next-intl/server';

export default async function MemberPage({
  params,
  searchParams,
}: {
  params: Promise<{ memberId: string; locale: string }>;
  searchParams: Promise<{ edit?: string; organizationId: string }>;
}) {
  const { memberId, locale } = await params;
  const { organizationId, edit } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'Member' });
  const isEditMode = edit === 'true';

  const member = await getUserByExternalId(memberId);

  if (!member) {
    return <div>{t('memberNotFound')}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <MemberDetails
        member={member}
        isEditMode={isEditMode}
        organizationId={organizationId}
      />
    </div>
  );
}
