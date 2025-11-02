import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import { getBasePath } from "./_utils/urlUtils";

const mockPets = [
  {
    id: "pet1",
    name: "Buddy",
    breed: "Golden Retriever",
    imageUrl: "https://placedog.net/500/500?id=1",
  },
  {
    id: "pet2",
    name: "Lucy",
    breed: "Labrador",
    imageUrl: "https://placedog.net/500/500?id=2",
  },
  {
    id: "pet3",
    name: "Max",
    breed: "German Shepherd",
    imageUrl: "https://placedog.net/500/500?id=3",
  },
  {
    id: "pet4",
    name: "Daisy",
    breed: "Beagle",
    imageUrl: "https://placedog.net/500/500?id=4",
  },
  {
    id: "pet5",
    name: "Charlie",
    breed: "Poodle",
    imageUrl: "https://placedog.net/500/500?id=5",
  },
  {
    id: "pet6",
    name: "Sadie",
    breed: "Bulldog",
    imageUrl: "https://placedog.net/500/500?id=6",
  },
];

const pets = mockPets;

export default async function EditShelterPage({
  params,
}: {
  params: Promise<{ shelterId: string }>;
}) {
  const { shelterId } = await params;
  const basePath = getBasePath(shelterId);

  return (
    <div className="flex flex-col h-full gap-6">
      {pets.length > 0 ? (
        <>
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold">My Pets</h2>
          </div>
          <div className="flex-grow overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.slice(0, 6).map((pet) => (
                <Card key={pet.id}>
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={pet.imageUrl}
                        alt={pet.name}
                        fill
                        className="rounded-t-lg object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground">{pet.breed}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`${basePath}/pets/${pet.id}/edit`}>Edit</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center h-full">
          <h3 className="text-xl font-bold tracking-tight">
            You have no pets yet
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add your first pet to get started.
          </p>
          <Button asChild>
            <Link href={`${basePath}/pets/add`}>
              <IoAdd className="mr-2 h-4 w-4" /> Add New Pet
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
