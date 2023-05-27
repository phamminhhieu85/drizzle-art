import { relations } from "drizzle-orm";
import {
  longtext,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { photos } from "./photos";
import { users } from "./users";

export const comments = mysqlTable("comments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  photoId: varchar("photo_id", { length: 255 }).notNull(),
  content: longtext("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

export const commentRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),

  photo: one(photos, {
    fields: [comments.photoId],
    references: [photos.id],
  }),
}));
