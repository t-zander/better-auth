"use client";

import { ShelterDetailsForm } from "./_components/ShelterDetailsForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { createShelter } from "./actions";

interface ShelterFormValues {
  name: string;
  description: string;
  location: string;
  avatar?: string | null;
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
