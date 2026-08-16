import { BannerSection } from "@/components/page/sections/BannerSection";
import { StackSection } from "@/components/page/sections/StackSection";
import type { PageSectionComponent } from "@/interfaces/page.interface";

export const PAGE_SECTION_COMPONENTS = {
  banner: BannerSection,
  stack: StackSection,
} satisfies Record<PageSectionComponent, typeof BannerSection>;
