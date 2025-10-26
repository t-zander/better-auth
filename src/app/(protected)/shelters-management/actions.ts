import { auth } from "@/lib/auth";
import { Role } from "@/lib/auth/permissions";
import { headers } from "next/headers";

type GetUserSheltersSuccess = {
  success: true;
  shelters: Awaited<ReturnType<typeof auth.api.listOrganizations>>;
};
type GetUserSheltersError = {
  success: false;
  error: string;
};

export async function getUserShelters(
  forRole: Role
): Promise<GetUserSheltersSuccess | GetUserSheltersError> {
  const session = await auth.api.getSession({ headers: await headers() });

  const currentUser = session?.user?.id;

  if (!currentUser) {
    return {
      success: true,
      shelters: [],
    };
  }

  const roles = session.user?.role?.split(",") ?? [];

  /* Current user is not allowed to see any shelters */
  if (!roles.includes(forRole)) {
    return {
      success: true,
      shelters: [],
    };
  }

  try {
    const shelters = await auth.api.listOrganizations({
      headers: await headers(),
    });
    return {
      success: true,
      shelters,
    };
  } catch {
    return {
      success: false,
      error: "Failed to fetch shelters",
    };
  }
}
