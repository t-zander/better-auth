"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ShelterDetailsForm } from "./_components/ShelterDetailsForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  IoCheckmarkCircle,
  IoPaw,
  IoPeople,
  IoSettings,
} from "react-icons/io5";
import { toast } from "sonner";
import { createShelter } from "./actions";

interface ShelterData {
  id: string;
  name: string;
  description: string;
  location: string;
  avatar?: string | null;
}

interface ShelterFormValues {
  name: string;
  description: string;
  location: string;
  avatar?: string | null;
}

// Step 2: Preview & Next Actions
function ShelterCreatedPreview({ shelter }: { shelter: ShelterData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex items-center gap-2">
            <IoCheckmarkCircle className="text-green-500" />
            Shelter Created!
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Minimal preview, like public profile */}
        <div className="flex gap-6 items-center">
          {shelter.avatar && (
            <Image
              src={shelter.avatar}
              alt={shelter.name}
              width={80}
              height={80}
              className="rounded-full object-cover border"
            />
          )}
          <div>
            <h2 className="text-xl font-bold">{shelter.name}</h2>
            {shelter.description && (
              <p className="text-muted-foreground">{shelter.description}</p>
            )}
            {shelter.location && (
              <p className="text-sm text-muted-foreground">
                {shelter.location}
              </p>
            )}
          </div>
        </div>
        {/* Next actions */}
        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link href={`/shelters-management/${shelter.id}/animals`}>
              <IoPaw className="mr-2" /> Add Animals
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/shelters-management/${shelter.id}/admins`}>
              <IoPeople className="mr-2" /> Add Administrators
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={`/shelters-management/${shelter.id}/edit`}>
              <IoSettings className="mr-2" /> Edit Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CreateShelterPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (data: ShelterFormValues) => {
    startTransition(async () => {
      const result = await createShelter(data);

      if (!result.success) {
        toast.error(result?.message || "Failed to create shelter");
        return;
      }

      toast.success("Shelter created successfully!");
      if (result?.data?.id) {
        router.push(`/shelters-management/edit/${result.data.id}`);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Shelter</CardTitle>
      </CardHeader>
      <CardContent>
        <ShelterDetailsForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </CardContent>
    </Card>
  );
}
