import { randomUUID } from "crypto";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notification = sqliteTable("notification", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),

  // TODO: there is a need to handle cases when notification is
  // for specific user
  // for specific users with certain role
  // or for specific users with specific role and in specific organization
  recipientId: text("recipient_id"),

  // to differentiate between these cases in the UI
  // e.g.
  // shelter_owner_registration_request
  // shelter_owner_registration_approved
  // shelter_owner_registration_rejected
  // ...
  type: text("type").notNull(),

  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});
