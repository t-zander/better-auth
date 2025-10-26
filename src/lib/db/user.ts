import { eq } from "drizzle-orm";
import { db } from "./db";
import { user } from "./schemas/auth-schema";
import {
  roleRequest,
  RoleRequestInsert,
  RoleUpdateRequestFind,
} from "./schemas/role-request";

/** Given user id and role searches for existing role update request */
export function findUserRoleUpdateRequest({
  userId,
  role,
}: RoleUpdateRequestFind) {
  return db.query.roleRequest.findFirst({
    where: (roleRequest, { eq }) =>
      eq(roleRequest.userId, userId) && eq(roleRequest.role, role),
  });
}

/** Given user id find all existing role update requests for this user */
export function findUserRoleUpdateRequests({ userId }: { userId: string }) {
  return db.query.roleRequest.findMany({
    where: (roleRequest, { eq }) => eq(roleRequest.userId, userId),
  });
}

/** used when user wants to select another role. Creates a role request entry.
 * This entry is used later so that site admin can approve or reject this request
 */
export function requestUserRoleUpdate({ userId, role }: RoleRequestInsert) {
  return db
    .insert(roleRequest)
    .values({
      role,
      userId: userId,
      status: "pending",
    })
    .returning({
      id: roleRequest.id,
    })
    .get();
}

export async function updateUserRole({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) {
  // TODO: Improve it and use dynamic access control & organizations
  // https://www.better-auth.com/docs/plugins/organization#updating-a-role
  const userData = await db.query.user.findFirst({
    where: eq(user.id, userId),
  });
  if (userData) {
    const roles = userData.role?.split(",") ?? [];
    if (roles.includes(role)) {
      return;
    }

    await db
      .update(user)
      .set({
        role: Array.from(new Set([...roles, role])).join(","),
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId))
      .returning({
        id: user.id,
        role: user.role,
      })
      .get();
  }
}
