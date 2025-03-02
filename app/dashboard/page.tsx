import { getUserOrganizations } from "@/lib/services/usersService";
import { components } from "@/lib/types";

export default async function Dashboard() {
  const organizations = await getUserOrganizations();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Your organizations</h1>
      {organizations.length > 0 && (
        <div>
          {organizations.map((organization: components["schemas"]["Organization"]) => (
            <div key={organization.id}>{organization.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
