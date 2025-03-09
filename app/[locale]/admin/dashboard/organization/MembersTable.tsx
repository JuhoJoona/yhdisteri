"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { StatsGrid } from "@/components/StatsCard";
import { SearchBar } from "@/components/SearchBar";
import { MemberCard } from "@/components/MemberCard";
import { Member } from "@/types/member";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const MembersTable = ({ 
  members, 
  initialSearchTerm = "" 
}: { 
  members: Member[], 
  initialSearchTerm?: string 
}) => {
  const navigate = useRouter();
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(members);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchTerm);
  const { toast } = useToast();

  // Initialize filtered members with search term if provided
  useEffect(() => {
    if (initialSearchTerm) {
      filterMembers(initialSearchTerm, statusFilter);
    } else {
      setFilteredMembers(members);
    }
  }, [members, initialSearchTerm]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterMembers(query, statusFilter);
  };

  const handleFilter = (status: string) => {
    setStatusFilter(status);
    filterMembers(searchQuery, status);
  };

  const filterMembers = (query: string, status: string) => {
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
    if (status !== "all") {
      result = result.filter((member) => member.status === status);
    }

    setFilteredMembers(result);
  };

  const handleEditMember = (member: Member) => {
    toast({
      title: "Edit Member",
      description: `Editing ${member.firstName} ${member.lastName}`,
    });
    // In a real app, this would navigate to an edit page
    // navigate(`/members/${member.id}/edit`);
  };

  const handleDeleteMember = (id: string) => {
    toast({
      title: "Delete Member",
      description: "This action would delete the member in a real application.",
      variant: "destructive",
    });
  };

  const handleAddNewMember = () => {
    toast({
      title: "Add New Member",
      description:
        "This would open a form to add a new member in a real application.",
    });
    // In a real app, this would navigate to a new member form
    // navigate("/members/new");
  };

  const handleMemberCardClick = (member: Member) => {
    navigate.push(`/members/${member.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-6 space-y-6 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to your Yhdisteri dashboard
            </p>
          </div>
          <Button className="w-full md:w-auto" onClick={handleAddNewMember}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Member
          </Button>
        </div>

        <StatsGrid stats={{
            total: members.length,
            active: members.filter((member) => member.status === "active").length,
            inactive: members.filter((member) => member.status === "inactive").length,
            pending: members.filter((member) => member.status === "pending").length,
            newThisMonth: 1,
            retention: 1
        }} />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Members</h2>
          </div>

          <SearchBar
            onSearch={handleSearch}
            onFilter={handleFilter}
            className="mb-6"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onEdit={() => handleEditMember(member)}
                  onDelete={() => handleDeleteMember(member.id)}
                  onClick={() => handleMemberCardClick(member)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium">No members found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MembersTable;
