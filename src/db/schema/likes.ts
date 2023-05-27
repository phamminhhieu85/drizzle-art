import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { photos } from "./photos";
import { users } from "./users";

export const likes = mysqlTable("likes", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  photoId: int("photo_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const likeRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  photo: one(photos, {
    fields: [likes.photoId],
    references: [photos.id],
  }),
}));
