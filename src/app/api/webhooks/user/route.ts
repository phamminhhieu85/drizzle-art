import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema/users";
import { env } from "@/env.mjs";
import { eq } from "drizzle-orm";
import { Webhook } from "svix";

export const runtime = "edge";

type Event = {
  data: Record<string, any>;
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "user.updated";

export async function POST(req: NextRequest) {
  // Verify the webhook
  const payload = JSON.stringify(await req.json());

  const headers = {
    "svix-id": req.headers.get("svix-id") as string,
    "svix-timestamp": req.headers.get("svix-timestamp") as string,
    "svix-signature": req.headers.get("svix-signature") as string,
  };

  const wh = new Webhook(env.WEBHOOK_SECRET);

  let event: Event | null = null;

  try {
    event = wh.verify(payload, headers) as Event;
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  // Handle the webhook
  const eventType: EventType = event.type;

  const { id, image_url, first_name, last_name, email_addresses } = event.data;

  if (eventType === "user.created") {
    await db.insert(users).values({
      id,
      avatarUrl: image_url,
      firstName: first_name,
      lastName: last_name,
      email: email_addresses[0].email_address,
    });
  } else if (eventType === "user.updated") {
    await db
      .update(users)
      .set({ firstName: first_name, lastName: last_name, avatarUrl: image_url })
      .where(eq(users.id, id));
  }

  return NextResponse.json({ message: "Received webhook" });
}
