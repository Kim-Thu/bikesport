import { Container } from "@/components/layout/Container";
import { SectionSkeleton } from "@/components/skeleton/SectionSkeleton";
import { Skeleton } from "@/components/skeleton/Skeleton";

export default function Loading() {
  return (
    <main aria-busy="true" aria-live="polite">
      <span className="sr-only">Đang tải nội dung...</span>
      <Container>
        <section className="py-4 sm:py-6" aria-hidden="true">
          <Skeleton className="aspect-hero-mobile w-full rounded-xl sm:aspect-hero-tablet lg:aspect-8/3" />
        </section>

        <SectionSkeleton template="category" itemCount={5} />
        <SectionSkeleton template="product" itemCount={5} />
        <SectionSkeleton template="content" itemCount={3} />
      </Container>
    </main>
  );
}
