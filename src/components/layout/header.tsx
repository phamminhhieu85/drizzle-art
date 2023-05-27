import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Search, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-5 min-h-[80px] gap-2">
      <h2 className="font-semibold sm:text-2xl shrink-0 text-xl">
        <Link href="/">Drizzle Art</Link>
      </h2>

      <div className="flex gap-2 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2">
              Search
              <Search size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Search photo</DialogTitle>
              <DialogDescription>
                Search for 4 milions images on Drizzle Art
              </DialogDescription>
            </DialogHeader>
            <Input />
          </DialogContent>
        </Dialog>
        <SignedOut>
          <Link href="/sign-in">
            <Button>Sign in</Button>
          </Link>
        </SignedOut>
        <Link href="/upload">
          <Button className="flex gap-2">
            <Upload size={18} />
            Upload
          </Button>
        </Link>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
