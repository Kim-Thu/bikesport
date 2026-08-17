import { PageSections } from "@/components/page/PageSections";
import { getPublishedPageByPath } from "@/lib/page.utils";

export const revalidate = 300;

export default function Home() {
  const homePage = getPublishedPageByPath("/");

  return (
    <main aria-label="Nội dung trang chủ">
      {homePage ? <PageSections sections={homePage.payload.sections} /> : null}
    </main>
  );
}
