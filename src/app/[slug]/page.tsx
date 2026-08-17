import { notFound } from "next/navigation";
import { PageSections } from "@/components/page/PageSections";
import {
  getPublishedPageBySlug,
  getPublishedPageSlugs,
} from "@/lib/page.utils";

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPageSlugs().map((slug) => ({ slug }));
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPublishedPageBySlug(slug);

  if (!page) notFound();

  return (
    <main aria-label={page.title}>
      <PageSections sections={page.payload.sections} />
    </main>
  );
}
