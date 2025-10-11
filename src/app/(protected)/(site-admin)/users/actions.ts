"use server";

import { auth } from "@/lib/auth";
import { Role } from "@/lib/auth/permissions";
import { updateRoleRequest } from "@/lib/db/roleRequests";
import {
  RoleRequestChangeStatus,
  roleRequestChangeStatusSchema,
} from "@/lib/db/schemas/role-request-schema";
import { headers } from "next/headers";

export async function updateRequestStatus(_, data: RoleRequestChangeStatus) {
  const result = roleRequestChangeStatusSchema.safeParse(data);

  if (result.error) {
    return { success: false, error: result.error };
  }

  const { id, status } = result.data;

  // TODO: check that this user is a site admin

  try {
    const result = await updateRoleRequest({ id, status });
    if (result.status === "approved") {
      // Activate the role for the user
      await auth.api.setRole({
        body: {
          userId: result.userId,
          role: result.role as Role,
        },
        headers: await headers(),
      });
    }
    return { success: true, data: result };
  } catch (error) {
    console.error(`Failed to update request ${id} status to ${status}:`, error);
  }
}
