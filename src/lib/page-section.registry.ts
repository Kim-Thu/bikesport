import { BannerSection } from "@/components/section/BannerSection";
import { CardGridSection } from "@/components/section/CardGridSection";
import { LayoutSection } from "@/components/section/LayoutSection";
import { StackSection } from "@/components/section/StackSection";
import type { PageSectionComponent } from "@/interfaces/page.interface";

export const PAGE_SECTION_COMPONENTS = {
  banner: BannerSection,
  stack: StackSection,
  "card-grid": CardGridSection,
  layout: LayoutSection,
} satisfies Record<PageSectionComponent, unknown>;
