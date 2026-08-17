import { notFound } from "next/navigation";
import { PageSections } from "@/components/page/PageSections";
import wpPages from "@/data/wp-pages.json";
import type { PageRecord } from "@/interfaces/page.interface";

export const dynamic = "force-dynamic";

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = (wpPages.pages as PageRecord[]).find(
    (item) => item.slug === slug && item.status === "published",
  );

  if (!page) notFound();

  return (
    <main aria-label={page.title}>
      <PageSections sections={page.payload.sections} />
    </main>
  );
}
