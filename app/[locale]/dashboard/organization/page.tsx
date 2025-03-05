import { getOrganizationMembers } from "@/lib/services/usersService";
import ClientMembersTable from "./ClientMembersTable";
import { StatsGrid } from "@/components/StatsCard";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const OrganizationPage = async ({ searchParams }: { 
  searchParams: { organizationId?: string, searchTerm?: string } 
}) => {
  const organizationId = searchParams.organizationId || "";
  const searchTerm = searchParams.searchTerm || "";
  
  const members = await getOrganizationMembers(organizationId);
  const newThisMonth = members?.filter((member) => member.joinDate && new Date(member.joinDate) > new Date(new Date().getFullYear(), new Date().getMonth(), 1)).length || 0;
  const retention = members?.filter((member) => member.status === "active").length || 0;
  
  return (
    <main className="w-3/4 justify-center items-center flex flex-col gap-4 border border-red-400">
    <div className="">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your Yhdisteri dashboard
        </p>
      </div>
      <Link href={`/dashboard/organization/add-member?organizationId=${organizationId}`} className="w-full md:w-auto">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Member
      </Link>
    </div>
    <div className="">
              <StatsGrid stats={{
            total: members?.length || 0,
            active: members?.filter((member) => member.status === "active").length || 0,
            inactive: members?.filter((member) => member.status === "inactive").length || 0,
            pending: members?.filter((member) => member.status === "pending").length || 0,
            newThisMonth: newThisMonth,
            retention: retention
        }} />

      <ClientMembersTable 
        members={members || []} 
        initialSearchTerm={searchTerm}
      />
    </div>
    </main>
    
  );
};

export default OrganizationPage;
