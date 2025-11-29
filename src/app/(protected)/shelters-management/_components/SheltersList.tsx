import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GetUserSheltersSuccess } from "../dataFetchers";

export function SheltersList({
  shelters,
}: {
  shelters: GetUserSheltersSuccess["shelters"];
}) {
  return shelters.map((shelter) => (
    <div
      key={shelter.id}
      className="p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
    >
      <div>
        <h2 className="text-lg font-semibold">{shelter.name}</h2>
        <p className="text-sm text-muted-foreground">{shelter.description}</p>
      </div>
      <Button className="mt-2" asChild>
        <Link href={`/shelters-management/edit/${shelter.id}`}>
          Manage Shelter
        </Link>
      </Button>
    </div>
  ));
}
