import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/db/schema";

interface Props {
  photo: Photo;
}

export default function ImageItem({ photo }: Props) {
  return (
    <div className="aspect-square relative break-inside-avoid">
      <Link href={`/photos/${photo.id}`}>
        <Image
          src={photo.url}
          alt={photo.name}
          fill
          className="rounded-md cursor-pointer hover:scale-105 ease-out duration-200 object-cover"
        />
      </Link>
    </div>
  );
}
