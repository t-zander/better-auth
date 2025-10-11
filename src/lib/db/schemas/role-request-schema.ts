import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";
import { user } from "./schema";

export const roleRequest = sqliteTable("role_request", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  role: text("role").notNull(),
  // id of the user that request role to be assigned to him
  userId: text("user_id").notNull(),
  status: text("status").default("pending").notNull(), // pending, approved, rejected
  reason: text("reason"), // reason for rejection if any
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const roleRequestRelations = relations(roleRequest, ({ one }) => ({
  user: one(user, {
    fields: [roleRequest.userId],
    references: [user.id],
  }),
}));

export const findUserRoleUpdateRequestSchema = createSelectSchema(roleRequest, {
  status: z.enum(["pending", "approved", "rejected"]).optional(),
}).pick({
  userId: true,
  role: true,
});

export const roleRequestInsertSchema = createInsertSchema(roleRequest, {
  status: z.enum(["pending", "approved", "rejected"]).optional(),
}).pick({
  userId: true,
  role: true,
  status: true,
});

export const roleRequestChangeStatusSchema = createUpdateSchema(roleRequest)
  .pick({
    id: true,
    status: true,
  })
  .required({
    id: true,
    status: true,
  });

export type RoleRequestInsert = z.infer<typeof roleRequestInsertSchema>;
export type RoleUpdateRequestFind = z.infer<
  typeof findUserRoleUpdateRequestSchema
>;
export type RoleUpdateRequestStatus = z.infer<
  typeof findUserRoleUpdateRequestSchema
>;
export type RoleRequestChangeStatus = z.infer<
  typeof roleRequestChangeStatusSchema
>;
