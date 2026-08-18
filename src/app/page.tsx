import type { Metadata } from "next";
import { PageSections } from "@/components/page/PageSections";
import { getPublishedPageByPath } from "@/lib/page.utils";
import { resolveSeoMetadata } from "@/lib/seo.utils";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getPublishedPageByPath("/");
  return resolveSeoMetadata({
    path: "/",
    objectType: "page",
    objectId: homePage?._id,
    title: homePage?.title,
  });
}

export default async function Home() {
  const homePage = await getPublishedPageByPath("/");

  return (
    <main aria-label="Nội dung trang chủ">
      {homePage ? <PageSections sections={homePage.payload.sections} /> : null}
    </main>
  );
}
