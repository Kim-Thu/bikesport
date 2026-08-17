import type { ComponentType } from "react";
import { BannerSection } from "@/components/section/BannerSection";
import { CardGridSection } from "@/components/section/CardGridSection";
import { LayoutSection } from "@/components/section/LayoutSection";
import { StackSection } from "@/components/section/StackSection";
import type { PageSectionPayloadMap } from "@/interfaces/page.interface";

export type PageSectionComponentRegistry = {
  [Component in keyof PageSectionPayloadMap]: ComponentType<{
    section: PageSectionPayloadMap[Component];
  }>;
};

export const PAGE_SECTION_COMPONENTS = {
  banner: BannerSection,
  stack: StackSection,
  "card-grid": CardGridSection,
  layout: LayoutSection,
} satisfies PageSectionComponentRegistry;
