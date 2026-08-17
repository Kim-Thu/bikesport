import { PageSections } from "@/components/page/PageSections";
import wpPages from "@/data/wp-pages.json";
import type { PageRecord } from "@/interfaces/page.interface";

export const dynamic = "force-dynamic";

export default function Home() {
  const homePage = (wpPages.pages as PageRecord[]).find(
    (page) => page.path === "/" && page.status === "published",
  );

  return (
    <main aria-label="Nội dung trang chủ">
      {homePage ? <PageSections sections={homePage.payload.sections} /> : null}
    </main>
  );
}
