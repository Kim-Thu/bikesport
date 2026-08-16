import { BannerSection } from "@/components/page/sections/BannerSection";
import { CategoryGridSection } from "@/components/page/sections/CategoryGridSection";
import { ProductSaleSection } from "@/components/page/sections/ProductSaleSection";
import { StackSection } from "@/components/page/sections/StackSection";
import type { PageSectionComponent } from "@/interfaces/page.interface";

export const PAGE_SECTION_COMPONENTS = {
  banner: BannerSection,
  stack: StackSection,
  "category-grid": CategoryGridSection,
  "product-sale": ProductSaleSection,
} satisfies Record<PageSectionComponent, typeof BannerSection>;
