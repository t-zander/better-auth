"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type CreateOrganizationSuccess = {
  success: true;
  data: Awaited<ReturnType<typeof auth.api.createOrganization>>;
};

type CreateOrganizationFailure = {
  success: false;
  message: string;
};

export async function createShelter(shelter: {
  name: string;
  description: string;
  location: string;
  avatar?: string | null;
}): Promise<CreateOrganizationSuccess | CreateOrganizationFailure> {
  try {
    const data = await auth.api.createOrganization({
      body: {
        name: shelter.name,
        description: shelter.description,
        address: shelter.location,
        slug: shelter.name.toLowerCase().replace(/\s+/g, "-"),
        logo: shelter.avatar ?? undefined,
      },
      headers: await headers(),
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create shelter",
    };
  }
}
