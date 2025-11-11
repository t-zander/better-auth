"use server";

import { auth } from "@/lib/auth";
import {
  findUserRoleUpdateRequest,
  requestUserRoleUpdate,
} from "@/lib/db/user";
import { headers } from "next/headers";

export async function updateUserRoleAction(role: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { success: false, message: "You are not authenticated" };
  }

  // Assign Shelter owner role to the user
  // set validation status to pending
  // Later: send an email / notification to site admin for approval
  // For now: will simply show it in notifications for site admin
  try {
    const requestWasAlreadyMade = await findUserRoleUpdateRequest({
      userId: session.user.id,
      role,
    });

    if (requestWasAlreadyMade) {
      return {
        success: false,
        message: "Your request is already pending. Please wait for approval.",
      };
    }
    await requestUserRoleUpdate({
      userId: session.user.id,
      role,
    });

    return {
      success: true,
      message:
        "Your request has been submitted for approval. After it is approved you will be able to manage shelters.",
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, message: "Failed to update user role" };
  }
}
