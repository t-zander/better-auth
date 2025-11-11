import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { organization, user } from "./auth-schema";

export const shelterMemberRequest = sqliteTable("shelter_member_request", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  role: text("role").notNull(),
  // id of the user that request role to be assigned to him
  userId: text("user_id").notNull(),
  shelterId: text("shelter_id").notNull(),
  status: text("status").default("pending").notNull(), // pending, approved, rejected
  reason: text("reason"), // reason for rejection if any
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const shelterMemberRequestRelations = relations(
  shelterMemberRequest,
  ({ one }) => ({
    user: one(user, {
      fields: [shelterMemberRequest.userId],
      references: [user.id],
    }),
    shelter: one(organization, {
      fields: [shelterMemberRequest.shelterId],
      references: [organization.id],
    }),
  })
);
