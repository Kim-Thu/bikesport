import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { PageSections } from "@/components/page/PageSections";
import wpOption from "@/data/wp-option.json";
import wpPages from "@/data/wp-pages.json";
import type { FooterSettings } from "@/interfaces/footer.interface";
import type { HeaderSettings } from "@/interfaces/header.interface";
import type { PageRecord } from "@/interfaces/page.interface";

export const dynamic = "force-dynamic";

export default function Home() {
  const homePage = (wpPages.pages as PageRecord[]).find(
    (page) => page.path === "/" && page.status === "published",
  );

  return (
    <>
      <Header settings={wpOption.header as HeaderSettings} />
      <main aria-label="Nội dung trang chủ">
        {homePage ? <PageSections sections={homePage.payload.sections} /> : null}
      </main>
      <Footer settings={wpOption.footer as FooterSettings} />
    </>
  );
}
