import { db } from "./db";

export function findUserShelters({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) {
  return db.query.member.findMany({
    where: (member, { eq, and }) =>
      and(eq(member.userId, userId), eq(member.role, role)),
    with: {
      organization: true,
    },
  });
}
