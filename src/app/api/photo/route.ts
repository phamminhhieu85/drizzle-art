import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { photos } from "@/db/schema/photos";
import { currentUser } from "@clerk/nextjs";

import { PhotoFormValues } from "@/components/upload/photo-form";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { name, url, tags, isDraft }: PhotoFormValues = await request.json();
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not found");

    const newPhoto = await db
      .insert(photos)
      .values({ userId: user.id, name, url, tags, isDraft });

    console.log(newPhoto);
    return NextResponse.json({ res: newPhoto });
  } catch (e) {
    console.log(e);
  }
}
