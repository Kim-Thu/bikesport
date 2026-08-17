import { Container } from "@/components/layout/Container";
import { HeaderSkeleton } from "@/components/skeleton/HeaderSkeleton";
import { SectionSkeleton } from "@/components/skeleton/SectionSkeleton";
import { Skeleton } from "@/components/skeleton/Skeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Đang tải nội dung...</span>
      <HeaderSkeleton />

      <main>
        <Container>
          <section className="py-4 sm:py-6" aria-hidden="true">
            <Skeleton className="aspect-[16/7] w-full rounded-xl sm:aspect-[16/6]" />
          </section>

          <SectionSkeleton template="category" itemCount={5} />
          <SectionSkeleton template="product" itemCount={5} />
          <SectionSkeleton template="content" itemCount={3} />
        </Container>
      </main>
    </div>
  );
}
