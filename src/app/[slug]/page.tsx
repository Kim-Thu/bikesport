import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageSections } from "@/components/page/PageSections";
import {
  getPublishedPageBySlug,
  getPublishedPageSlugs,
} from "@/lib/page.utils";
import { resolveSeoMetadata } from "@/lib/seo.utils";

export const revalidate = 300;
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPublishedPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug);
  if (!page) return {};

  return resolveSeoMetadata({
    path: `/${slug}`,
    objectType: "page",
    objectId: page._id,
    title: page.title,
  });
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug);

  if (!page) notFound();

  return (
    <main aria-label={page.title}>
      <PageSections sections={page.payload.sections} />
    </main>
  );
}
