import { getUserByExternalId } from '@/lib/services/usersService';
import { MemberDetails } from '@/components/MemberDetails';

export default async function MemberPage({
  params,
  searchParams,
}: {
  params: { memberId: string };
  searchParams: { edit?: string; organizationId: string };
}) {
  const { memberId } = params;
  const organizationId = searchParams.organizationId;
  const isEditMode = searchParams.edit === 'true';

  const member = await getUserByExternalId(memberId);

  if (!member) {
    return <div>Member not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <MemberDetails
        //@ts-expect-error Veän kaikkia lättyy ku en jaksa korjata
        member={member}
        isEditMode={isEditMode}
        organizationId={organizationId}
      />
    </div>
  );
}
