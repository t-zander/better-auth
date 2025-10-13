import { eq } from "drizzle-orm";
import { db } from "./db";
import { roleRequest, RoleRequestChangeStatus } from "./schemas/schema";
import { updateUserRole } from "./user";

/** Finds all role requests. This is shown to site admin and allows him to approve or reject them */
export function findAllRoleRequests() {
  return db.query.roleRequest.findMany({
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
          banned: true,
        },
      },
    },
    /* orderBy: (roleRequest, { desc }) => [desc(roleRequest.createdAt)] */
  });
}

/** Updates status of the role request. This will activate user role or mark it as rejected */
export async function updateRoleRequest({
  id,
  status,
}: RoleRequestChangeStatus) {
  const data = await db
    .update(roleRequest)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(roleRequest.id, id))
    .returning({
      id: roleRequest.id,
      userId: roleRequest.userId,
      role: roleRequest.role,
      status: roleRequest.status,
    })
    .get();

  await updateUserRole({ userId: data.userId, role: data.role });

  return data;
}
