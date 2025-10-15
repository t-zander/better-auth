import { relations } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./schema";
import { shelter } from "./shelter";

export const shelterToUser = sqliteTable(
  "shelter_to_user",
  {
    userId: text()
      .notNull()
      .references(() => user.id),
    shelterId: text()
      .notNull()
      .references(() => shelter.id),
    role: text().notNull(), // e.g. "owner", "admin", "content_creator"
  },
  (table) => [primaryKey({ columns: [table.userId, table.shelterId] })]
);

export const shelterToUserRelations = relations(shelterToUser, ({ one }) => ({
  shelter: one(shelter, {
    fields: [shelterToUser.shelterId],
    references: [shelter.id],
  }),
  user: one(user, {
    fields: [shelterToUser.userId],
    references: [user.id],
  }),
}));
