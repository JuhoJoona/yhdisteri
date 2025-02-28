import { Member } from "@/types/member";
import MembersTable from "./MembersTable";

const Index = async ({ params }: { params: { organizationId: string } }) => {
  const organizationId = params.organizationId;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/organizations/${organizationId}/members`
  );
  console.log(
    "response",
    `${process.env.NEXT_PUBLIC_API_URL}/organizations/${organizationId}/members`
  );
  const data = await response.json();
  console.log(data);
  return (
    <div>
      <MembersTable members={data as Member[]} />
    </div>
  );
};

export default Index;
