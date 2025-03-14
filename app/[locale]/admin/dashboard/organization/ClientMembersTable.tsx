import { Member } from '@/types/member';
import { Button } from '@/components/ui/button';
import { Users, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { MemberCard } from '@/components/MemberCard';

const MembersTable = ({
  members,
  searchQuery = '',
  statusFilter = 'all',
  organizationId,
}: {
  members: Member[];
  searchQuery?: string;
  statusFilter?: string;
  organizationId: string;
}) => {
  // Apply filtering server-side
  const filteredMembers = filterMembers(members, searchQuery, statusFilter);

  // Count members by status
  const activeMembersCount = members.filter(
    (m) => m.status === 'active'
  ).length;
  const inactiveMembersCount = members.filter(
    (m) => m.status === 'inactive'
  ).length;
  const pendingMembersCount = members.filter(
    (m) => m.status === 'pending'
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight flex items-center">
            <Users className="mr-2 h-5 w-5 text-primary" />
            Members
            <Badge variant="outline" className="ml-2">
              {members.length}
            </Badge>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your organization members
          </p>
        </div>

        <form action="/api/export-members" method="post">
          <input type="hidden" name="organizationId" value={organizationId} />
          <Button type="submit" size="sm" className="self-start sm:self-auto">
            <Download className="mr-2 h-4 w-4" />
            Export Members
          </Button>
        </form>
      </div>

      {/* Replace SearchBar with server-side form */}
      <form className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search members..."
            defaultValue={searchQuery}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>

      <Tabs defaultValue={statusFilter || 'all'} className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto">
          <Link
            href={`/admin/dashboard/organization?status=all&organizationId=${organizationId}`}
            legacyBehavior
          >
            <TabsTrigger value="all" className="flex-1 sm:flex-none">
              All
              <Badge variant="secondary" className="ml-2">
                {members.length}
              </Badge>
            </TabsTrigger>
          </Link>
          <Link
            href={`/admin/dashboard/organization?status=active&organizationId=${organizationId}`}
            legacyBehavior
          >
            <TabsTrigger value="active" className="flex-1 sm:flex-none">
              Active
              <Badge variant="secondary" className="ml-2">
                {activeMembersCount}
              </Badge>
            </TabsTrigger>
          </Link>
          <Link
            href={`/admin/dashboard/organization?status=inactive&organizationId=${organizationId}`}
            legacyBehavior
          >
            <TabsTrigger value="inactive" className="flex-1 sm:flex-none">
              Inactive
              <Badge variant="secondary" className="ml-2">
                {inactiveMembersCount}
              </Badge>
            </TabsTrigger>
          </Link>
          <Link
            href={`/admin/dashboard/organization?status=pending&organizationId=${organizationId}`}
            legacyBehavior
          >
            <TabsTrigger value="pending" className="flex-1 sm:flex-none">
              Pending
              <Badge variant="secondary" className="ml-2">
                {pendingMembersCount}
              </Badge>
            </TabsTrigger>
          </Link>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <MembersGrid
            members={filteredMembers}
            organizationId={organizationId}
          />
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <MembersGrid
            members={filteredMembers}
            organizationId={organizationId}
          />
        </TabsContent>

        <TabsContent value="inactive" className="mt-0">
          <MembersGrid
            members={filteredMembers}
            organizationId={organizationId}
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          <MembersGrid
            members={filteredMembers}
            organizationId={organizationId}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to filter members server-side
function filterMembers(
  members: Member[],
  query: string,
  status: string
): Member[] {
  let result = [...members];

  // Apply search query filtering
  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    result = result.filter(
      (member) =>
        member.firstName.toLowerCase().includes(lowerCaseQuery) ||
        member.lastName.toLowerCase().includes(lowerCaseQuery) ||
        member.email.toLowerCase().includes(lowerCaseQuery)
    );
  }

  // Apply status filtering
  if (status !== 'all') {
    result = result.filter((member) => member.status === status);
  }

  return result;
}

// Simplified MembersGrid component for server rendering
const MembersGrid = ({
  members,
  organizationId,
}: {
  members: Member[];
  organizationId: string;
}) => {
  if (members.length === 0) {
    return (
      <div className="col-span-full text-center py-12 border border-dashed rounded-lg bg-muted/20">
        <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-medium">No members found</h3>
        <p className="text-muted-foreground max-w-md mx-auto mt-1">
          Try adjusting your search or filter criteria to find what you&apos;re
          looking for
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-350px)] min-h-[400px] pr-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4">
        {members.map((member) => (
          <Link
            href={`/admin/dashboard/organization/members/${member.id}?organizationId=${organizationId}`}
            key={member.id}
          >
            <MemberCard member={member} organizationId={organizationId} />
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MembersTable;
