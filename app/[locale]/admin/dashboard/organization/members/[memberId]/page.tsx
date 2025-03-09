import { getUserById } from '@/lib/services/usersService';
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

  const member = await getUserById(memberId, organizationId);

  if (!member) {
    return <div>Member not found</div>;
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
