import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { shelterToUser } from "./shelter-to-user";

export const shelter = sqliteTable("shelter", {
  id: text()
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text().notNull(),
  address: text().notNull(),
  phone: text(),
  email: text(),
  website: text(),
  description: text(),

  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});
export const shelterRelations = relations(shelter, ({ many }) => ({
  shelterToUser: many(shelterToUser),
}));
