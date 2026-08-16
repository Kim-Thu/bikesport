import { BannerSection } from "@/components/page/sections/BannerSection";
import { CardGridSection } from "@/components/page/sections/CardGridSection";
import { ContentAsideSection } from "@/components/page/sections/ContentAsideSection";
import { LeadSliderSection } from "@/components/page/sections/LeadSliderSection";
import { StackSection } from "@/components/page/sections/StackSection";
import type { PageSectionComponent } from "@/interfaces/page.interface";

export const PAGE_SECTION_COMPONENTS = {
  banner: BannerSection,
  stack: StackSection,
  "card-grid": CardGridSection,
  "lead-slider": LeadSliderSection,
  "content-aside": ContentAsideSection,
} satisfies Record<PageSectionComponent, unknown>;
