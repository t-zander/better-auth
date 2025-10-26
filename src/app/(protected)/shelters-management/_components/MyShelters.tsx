import { Button } from "@/components/ui/button";
import { Roles } from "@/lib/auth/permissions";
import Link from "next/link";
import { getUserShelters } from "../actions";

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
      {data.shelters.map((shelter) => (
        <div
          key={shelter.id}
          className="p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
        >
          <div>
            <h2 className="text-lg font-semibold">{shelter.name}</h2>
            <p className="text-sm text-gray-600">{shelter.description}</p>
          </div>
          <Button className="mt-2" asChild>
            <Link href={`/shelters-management/edit/${shelter.id}`}>
              Manage Shelter
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
