import { PageSections } from "@/components/page/PageSections";
import { getPublishedPageByPath } from "@/lib/page.utils";

export const revalidate = 300;

export default async function Home() {
  const homePage = await getPublishedPageByPath("/");

  return (
    <main aria-label="Nội dung trang chủ">
      {homePage ? <PageSections sections={homePage.payload.sections} /> : null}
    </main>
  );
}
