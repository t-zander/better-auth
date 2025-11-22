import { ErrorCodes } from "../errorCodes";
import { db } from "./db";

/**
 * takes an invitation ID and returns the next step for the invited user
 * based on whether the user already exists in the system or not
 *
 */
export async function verifyNextStepForInvitedUser(
  invitationId: string
): Promise<{
  action: "sign-in" | "sign-up";
  email: string;
}> {
  const pendingInvitation = await db.query.invitation.findFirst({
    where: (invitation, { eq, and }) =>
      and(eq(invitation.id, invitationId), eq(invitation.status, "pending")),
  });

  if (!pendingInvitation) {
    throw new Error(ErrorCodes.InvitationInvalid);
  }
  const existingUser = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.email, pendingInvitation.email),
  });

  if (existingUser) {
    return {
      action: "sign-in",
      email: existingUser.email,
    };
  }
  return {
    action: "sign-up",
    email: pendingInvitation.email,
  };
}
