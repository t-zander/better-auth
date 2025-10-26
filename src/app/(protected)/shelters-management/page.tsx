import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { Roles } from "@/lib/auth/permissions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { MyShelters } from "./_components/MyShelters";

export default async function SheltersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const roles = session.user?.role?.split(",") ?? [];

  if ((roles.includes("user") && roles.length === 1) || roles.length === 0) {
    redirect("/signin");
  }

  return (
    <Tabs defaultValue="my-shelters" className="w-full">
      <TabsList>
        {roles.includes(Roles.shelterOwner) && (
          <TabsTrigger value="my-shelters">My shelters</TabsTrigger>
        )}

        {roles.includes(Roles.shelterAdmin) && (
          <TabsTrigger value="admin-shelters" className="flex flex-col flex-1">
            Administrating shelters
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="my-shelters" className="flex flex-col flex-1">
        <MyShelters />
      </TabsContent>
      <TabsContent value="admin-shelters">
        {/* Content for Administrating shelters */}
      </TabsContent>
    </Tabs>
  );
}
