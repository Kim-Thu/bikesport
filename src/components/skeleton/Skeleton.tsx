import type { SkeletonProps } from "@/interfaces/skeleton.interface";
import { cn } from "@/lib/classname.utils";

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-gray-100 motion-reduce:animate-none", className)}
    />
  );
}
