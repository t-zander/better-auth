import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ShelterDetails } from "./_components/shelter-details/ShelterDetails";
import { ShelterMembersTable } from "./_components/shelter-members/ShelterMembersTable";

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ shelterId: string }>;
}) {
  const { shelterId } = await params;
  const fullOrganization = await auth.api.getFullOrganization({
    headers: await headers(),
    query: {
      organizationId: shelterId,
    },
  });

  const canSeeMembers = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      organizationId: shelterId,
      permissions: {
        shelterMembers: ["view"],
      },
    },
  });
  const canManagePendingApprovals = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      organizationId: shelterId,
      permissions: {
        shelterMembers: ["approvePendingRequests"],
      },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Shelter Details</h1>

      <div className="mt-6">
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            {canSeeMembers && (
              <TabsTrigger value="members">Members</TabsTrigger>
            )}
            {canManagePendingApprovals && (
              <TabsTrigger value="pending-approvals">
                Pending Approvals
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
                <CardDescription>
                  Make changes to your shelter details here. Click save when
                  you&apos;re done.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4">
                <ShelterDetails
                  shelterDetails={{
                    name: fullOrganization?.name ?? "",
                    description: fullOrganization?.description ?? "",
                    location: fullOrganization?.address ?? "",
                    avatar: fullOrganization?.logo ?? null,
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Shelter members</CardTitle>
                <CardDescription>
                  Manage your shelter members here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4">
                <ShelterMembersTable
                  members={fullOrganization?.members ?? []}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pending-approvals">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>
                  Accept or reject pending member requests here.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4"></CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
