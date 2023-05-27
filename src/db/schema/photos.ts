import { InferModel, relations } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { comments } from "./comments";
import { likes } from "./likes";
import { users } from "./users";

export const photos = mysqlTable("photos", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  name: text("photo_name").notNull(),
  url: text("photo_url").notNull(),
  tags: text("photo_tags").notNull(),
  isDraft: boolean("is_draft").notNull().default(false),
  likes: int("likes").default(0).notNull(),
  views: int("views").default(0).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow().onUpdateNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  collectionId: varchar("collection_id", { length: 255 }),
});

export const photoRelations = relations(photos, ({ one, many }) => ({
  user: one(users, {
    fields: [photos.userId],
    references: [users.id],
  }),
  collection: one(photos, {
    fields: [photos.id],
    references: [photos.id],
  }),
  likes: many(likes),
  comments: many(comments),
}));

export type Photo = InferModel<typeof photos>;
