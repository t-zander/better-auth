import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllUsersTable, mockUsers } from "./AllUsersTable";
import { RoleRequestsTable } from "./role-requests/RoleRequestsTable";
import { UsersTabs } from "./UsersTabs";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { currentTab?: string };
}) {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Users Management</h1>

      <UsersTabs currentTab={(await searchParams).currentTab || "allUsers"}>
        <TabsList>
          <TabsTrigger value="allUsers">All users</TabsTrigger>
          <TabsTrigger value="roleRequests">Role requests</TabsTrigger>
        </TabsList>

        <TabsContent value="allUsers">
          <AllUsersTable users={mockUsers} />
        </TabsContent>
        <TabsContent value="roleRequests">
          <RoleRequestsTable />
        </TabsContent>
      </UsersTabs>
    </div>
  );
}
