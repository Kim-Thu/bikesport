import { Banner } from "@/components/banner/Banner";
import type { PageSectionPayload } from "@/interfaces/page.interface";

export function BannerSection({ section }: { section: PageSectionPayload }) {
  if (section.component !== "banner") return null;

  return <Banner bannerId={section.props.bannerId} />;
}
