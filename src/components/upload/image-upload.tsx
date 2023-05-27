import { useCallback, useState } from "react";
import Image from "next/image";
import { Dices, ImagePlus, Loader2 } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { PhotoFormValues } from "./photo-form";

interface Props {
  url: string;
  setUrl: (url: string) => void;
  setValue: UseFormSetValue<PhotoFormValues>;
}

export default function PhotoUpload({ setUrl, url, setValue }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateRandom = useCallback(() => {
    const random = Math.floor(Math.random() * 100);
    setUrl(`https://picsum.photos/id/${random}/1000`);
    setValue("url", `https://picsum.photos/id/${random}/1000`);
    setIsLoading(true);
  }, [setUrl, setIsLoading, setValue]);

  return (
    <div className="space-y-5 w-full">
      <div className="aspect-square border-2 rounded-md relative border-dashed p-1">
        <div className="h-full relative">
          <Image
            src={url}
            sizes="1000px"
            alt="test"
            fill
            className="rounded-md cursor-pointer"
            onLoadingComplete={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center mx-auto max-w-sm">
        <Button
          className="space-x-2"
          onClick={handleGenerateRandom}
          type="button"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <Dices />}
          <p>Random</p>
        </Button>
        <p>Or</p>
        <Button className="space-x-2">
          <ImagePlus />
          <p>Upload</p>
        </Button>
      </div>
    </div>
  );
}
