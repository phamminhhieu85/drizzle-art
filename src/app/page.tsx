import { db } from "@/db/db";
import { photos } from "@/db/schema/photos";
import { users } from "@/db/schema/users";

import ImageItem from "@/components/common/image-item";

export default async function Home() {
  const data = await db.select().from(photos);
  const userData = await db.select().from(users);
  console.log({ userData });

  return (
    <div className="columns-3 gap-5 space-y-5">
      {data.map((photo, index) => (
        <ImageItem photo={photo} key={index} />
      ))}
    </div>
  );
}
