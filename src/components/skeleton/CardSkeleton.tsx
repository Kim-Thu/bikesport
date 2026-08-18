import { Skeleton } from "@/components/skeleton/Skeleton";
import type { CardSkeletonProps } from "@/interfaces/skeleton.interface";
import { cn } from "@/lib/classname.utils";

export function CardSkeleton({ template = "product", className }: CardSkeletonProps) {
  if (template === "category") {
    return (
      <div className={cn("overflow-hidden rounded-lg border border-gray-100 bg-white", className)}>
        <Skeleton className="aspect-card-media w-full rounded-none" />
        <div className="flex items-center justify-between gap-4 border-t border-gray-100 p-4">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
        </div>
      </div>
    );
  }

  if (template === "content") {
    return (
      <div className={cn("overflow-hidden rounded-lg border border-gray-100 bg-white", className)}>
        <Skeleton className="aspect-video w-full rounded-none" />
        <div className="space-y-3 p-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-lg border border-gray-100 bg-white", className)}>
      <Skeleton className="aspect-card-media w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}
