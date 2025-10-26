import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { organization } from "./auth-schema";

export const animals = sqliteTable("animals", {
  id: text("id").primaryKey(),
  shelterId: text("shelter_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  species: text("species").notNull(),
  breed: text("breed"),
  age: integer("age"),
  gender: text("gender"),
  description: text("description"),
  photos: text("photos"),
  medicalNotes: text("medical_notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const animalsRelations = relations(animals, ({ one }) => ({
  shelter: one(organization, {
    fields: [animals.shelterId],
    references: [organization.id],
  }),
}));
