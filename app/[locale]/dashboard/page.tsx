
import { getUserOrganizations } from "@/lib/services/usersService";
import { Building, Settings, Users, ChevronRight } from "lucide-react";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  const organizations = await getUserOrganizations();
  
  if (!organizations) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>No organizations found</h1>
        <Link href="/setup">Create organization</Link>
      </div>
    );
  }
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Organizations</h1>
        <Link href="/dashboard/organization/create" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Create Organization
        </Link>
      </div>

      {organizations.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <Building className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Organizations Found</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You haven&apos;t joined any organizations yet. Create a new organization to get started.
          </p>
          <Link href="/dashboard/organization/create" className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto">
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Organization
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {organizations.map((org) => (
            <div 
              key={org.id} 
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all bg-white hover:border-blue-200 cursor-pointer"
              
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-2">
                    <Building className="w-5 h-5 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold">{org.name || "Unnamed Organization"}</h3>
                    {org.paymentsActive && (
                      <span className="ml-3 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Active Subscription
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mb-4">
                    Code: {org.code || "N/A"} • Created: {formatDate(org.createdAt)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    href={`/dashboard/${org.id}/settings`}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
                  <Link 
                    href={`/dashboard/${org.id}/members`}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Users className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Link 
                  href={`/dashboard/organization?organizationId=${org.id}`} 
                  className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  Go to Dashboard
                  <ChevronRight className="ml-1 w-4 h-4" />

                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
        <p className="text-gray-600">
          If you&apos;re having trouble accessing your organizations or need assistance with account settings, 
          please visit our <a href="/help" className="text-blue-600 hover:underline">Help Center</a> or 
          contact <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>.
        </p>
      </div>
    </div>
  );
}