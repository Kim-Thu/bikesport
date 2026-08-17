import { notFound } from "next/navigation";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { PageSections } from "@/components/page/PageSections";
import wpOption from "@/data/wp-option.json";
import wpPages from "@/data/wp-pages.json";
import type { FooterSettings } from "@/interfaces/footer.interface";
import type { HeaderSettings } from "@/interfaces/header.interface";
import type { PageRecord } from "@/interfaces/page.interface";

export const dynamic = "force-dynamic";

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = (wpPages.pages as PageRecord[]).find(
    (item) => item.slug === slug && item.status === "published",
  );

  if (!page) notFound();

  return (
    <>
      <Header settings={wpOption.header as HeaderSettings} />
      <main aria-label={page.title}>
        <PageSections sections={page.payload.sections} />
      </main>
      <Footer settings={wpOption.footer as FooterSettings} />
    </>
  );
}
