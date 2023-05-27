import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {new Array(10).fill(null).map((_, index) => (
        <div key={index} className="aspect-square relative">
          <Skeleton key={index} className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}
