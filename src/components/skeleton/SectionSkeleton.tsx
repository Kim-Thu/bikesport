import { CardSkeleton } from "@/components/skeleton/CardSkeleton";
import { Skeleton } from "@/components/skeleton/Skeleton";
import type { SectionSkeletonProps } from "@/interfaces/skeleton.interface";
import { cn } from "@/lib/classname.utils";

const MAX_ITEMS = 6;

export function SectionSkeleton({
  template = "product",
  itemCount = 5,
  className,
}: SectionSkeletonProps) {
  const count = Math.max(1, Math.min(itemCount, MAX_ITEMS));

  return (
    <section className={cn("py-6 sm:py-8", className)} aria-hidden="true">
      <div className="mb-4 flex items-center justify-between gap-4">
        <Skeleton className="h-6 w-44 sm:w-56" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: count }, (_, index) => (
          <CardSkeleton key={index} template={template} />
        ))}
      </div>
    </section>
  );
}
