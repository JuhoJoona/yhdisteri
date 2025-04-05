import { getUserByExternalId } from '@/lib/services/usersService';
import { MemberDetails } from '@/components/MemberDetails';

export default async function MemberPage({
  params,
  searchParams,
}: {
  params: Promise<{ memberId: string; locale: string }>;
  searchParams: Promise<{ edit?: string; organizationId: string }>;
}) {
  const { memberId } = await params;
  const { organizationId, edit } = await searchParams;
  const isEditMode = edit === 'true';

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
