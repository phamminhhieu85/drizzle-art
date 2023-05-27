import { InferModel, relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

import { collections } from "./collections";
import { comments } from "./comments";
import { likes } from "./likes";
import { photos } from "./photos";

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    avatarUrl: text("avatar_url").notNull(),
    follower: int("follower").notNull().default(0),
    following: int("following").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (user) => {
    return {
      emailIdx: uniqueIndex("email_idx").on(user.email),
    };
  }
);

export const userRelations = relations(users, ({ many }) => ({
  photos: many(photos),
  likes: many(likes),
  comments: many(comments),
  collectons: many(collections),
}));

export type User = InferModel<typeof users>;
