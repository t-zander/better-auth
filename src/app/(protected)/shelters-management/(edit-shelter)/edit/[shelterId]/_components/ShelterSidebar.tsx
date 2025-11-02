import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ShelterDetails } from "./ShelterDetails";
import { ShelterNavigationBar } from "./ShelterNavigationBar";
import { ShelterPets } from "./ShelterPets";

export async function ShelterSidebar({ shelterId }: { shelterId: string }) {
  const fullOrganization = await auth.api.getFullOrganization({
    headers: await headers(),
    query: {
      organizationId: shelterId,
    },
  });

  return (
    <div className="space-y-6">
      <ShelterDetails
        name={fullOrganization?.name ?? ""}
        shelterOwnersAmount={
          fullOrganization?.members.filter(
            (member) => member.role === "shelterOwner"
          ).length ?? 0
        }
        shelterAdminsAmount={
          fullOrganization?.members.filter(
            (member) => member.role === "shelterAdmin"
          ).length ?? 0
        }
      />
      <ShelterPets />
      <ShelterNavigationBar />
    </div>
  );
}
