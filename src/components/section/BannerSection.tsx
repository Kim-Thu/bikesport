import { Banner } from "@/components/banner/Banner";
import type { BannerSectionPayload } from "@/interfaces/page.interface";

export function BannerSection({ section }: { section: BannerSectionPayload }) {
  return <Banner bannerId={section.props.bannerId} />;
}
