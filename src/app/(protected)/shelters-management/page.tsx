import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { hasRole } from "../../../lib/auth/utils";
import { AdministratingShelters } from "./_components/AdministratingShelters";
import { MyShelters } from "./_components/MyShelters";

export default async function SheltersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session.user?.role) {
    redirect("/signin");
  }

  const isShelterOwner = hasRole(session.user.role, "shelterOwner");
  const isShelterAdmin = hasRole(session.user.role, "shelterAdmin");

  if (!isShelterOwner && !isShelterAdmin) {
    redirect("/");
  }

  // User is shelter owner and also a shelter admin in some shelters
  // show both tabs
  if (isShelterOwner && isShelterAdmin) {
    <Tabs defaultValue={"my-shelters"} className="w-full">
      <TabsList>
        {isShelterOwner && (
          <TabsTrigger value="my-shelters">My shelters</TabsTrigger>
        )}

        {isShelterAdmin && (
          <TabsTrigger value="admin-shelters" className="flex flex-col flex-1">
            Administrating shelters
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="my-shelters" className="flex flex-col flex-1">
        <MyShelters />
      </TabsContent>
      <TabsContent value="admin-shelters">
        <AdministratingShelters />
      </TabsContent>
    </Tabs>;
  }

  if (isShelterOwner) {
    return <MyShelters />;
  }

  return <AdministratingShelters />;
}
