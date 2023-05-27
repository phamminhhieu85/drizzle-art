import Image from "next/image";
import { db } from "@/db/db";
import { photos } from "@/db/schema/photos";
import { eq } from "drizzle-orm";
import { Bookmark, Heart, UserPlus2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Props {
  params: { slug: string };
}

export default async function Photo({ params }: Props) {
  const { slug } = params;
  const photo = await db
    .select()
    .from(photos)
    .where(eq(photos.id, Number(slug)));

  return (
    <div>
      <div className="flex justify-between ">
        <div className="flex gap-4 items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <p className="font-semibold">{photo[0].name}</p>
            <p>32 followers</p>
          </div>

          <Button variant="ghost" className="gap-2">
            <UserPlus2 />
            Follow
          </Button>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="aspect-square w-fit p-0">
            <Bookmark size={20} />
          </Button>

          <Button variant="outline" className="gap-2">
            <Heart size={20} />
            <p>28</p>
          </Button>

          <Button>Download</Button>
        </div>
      </div>

      <div className="mt-5 aspect-video relative">
        <Image src={photo[0].url} alt="" fill className="object-contain" />
      </div>
      <div className="mt-5">
        <h3></h3>
      </div>
    </div>
  );
}
