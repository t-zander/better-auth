import { auth } from "@/lib/auth";
import { Role } from "@/lib/auth/permissions";
import { findUserShelters } from "@/lib/db/shelters";
import { headers } from "next/headers";

export async function getUserShelters(forRole: Role) {
  const session = await auth.api.getSession({ headers: await headers() });

  const currentUser = session?.user?.id;

  if (!currentUser) {
    return [];
  }

  const roles = session.user?.role?.split(",") ?? [];

  if (!roles.includes(forRole)) {
    return [];
  }

  // fetch all shelters where userId is current user and user has the specified role
  // TODO: proper error handling
  const shelters = await findUserShelters({
    userId: currentUser,
    role: forRole,
  });

  // based on user permission fetch shelters
  // if this is a shelter owner fetch
  // Placeholder: Fetch shelters from the database
  return shelters;
}
