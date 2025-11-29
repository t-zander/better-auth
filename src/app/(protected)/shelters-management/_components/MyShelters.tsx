import { Button } from "@/components/ui/button";
import { Roles } from "@/lib/auth/permissions";
import Link from "next/link";
import { getUserShelters } from "../dataFetchers";
import { SheltersList } from "./SheltersList";

export async function MyShelters() {
  const data = await getUserShelters(Roles.shelterOwner);

  if (!data.success) {
    return <div>Error loading shelters: {data.error}</div>;
  }

  return data.shelters.length === 0 ? (
    <div className="space-y-2 flex flex-1 flex-col items-center justify-center">
      <p>You have no shelters yet.</p>
      <Button>
        <Link href="/shelters-management/create">
          Create your first shelter
        </Link>
      </Button>
    </div>
  ) : (
    <div className="flex flex-col flex-1 space-y-4">
      <SheltersList shelters={data.shelters} />
    </div>
  );
}
