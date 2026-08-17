import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/skeleton/Skeleton";

export function HeaderSkeleton() {
  return (
    <header aria-hidden="true" className="border-b border-gray-100 bg-white">
      <Container>
        <div className="flex items-center gap-4 py-4 lg:gap-9">
          <Skeleton className="h-10 w-36 shrink-0 sm:w-48" />
          <Skeleton className="hidden h-11 min-w-0 flex-1 rounded-full lg:block" />
          <div className="ml-auto flex shrink-0 items-center gap-3">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
        <div className="pb-3 lg:hidden">
          <Skeleton className="h-11 w-full rounded-full" />
        </div>
      </Container>
    </header>
  );
}
