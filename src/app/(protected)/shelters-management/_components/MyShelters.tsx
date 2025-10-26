import { Button } from "@/components/ui/button";
import { Roles } from "@/lib/auth/permissions";
import Link from "next/link";
import { getUserShelters } from "../actions";

export async function MyShelters() {
  const shelters = await getUserShelters(Roles.shelterOwner);

  console.log("My shelters:", shelters);

  return shelters.length === 0 ? (
    <div className="space-y-2 flex flex-1 flex-col items-center justify-center">
      <p>You have no shelters yet.</p>
      <Button>
        <Link href="/shelters-management/create">
          Create your first shelter
        </Link>
      </Button>
    </div>
  ) : (
    <>list</>
  );
}
