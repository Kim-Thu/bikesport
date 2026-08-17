import type { ProductCollectionItem } from "@/interfaces/product-collection-item.interface";
import type { ProductSliderBlockPayload } from "@/interfaces/page-block.interface";
import type { SectionHeaderTemplate } from "@/interfaces/section-header.interface";
import type { TabsSliderGroup } from "@/interfaces/tabs-slider.interface";
import {
  getProductCollectionItems,
  getPromotionSessionCollectionGroups,
} from "@/lib/product-collection-source.utils";
import type { ActionLinkTone } from "@/variants/action-link.variant";
import type { ProductSliderLayoutTemplate } from "@/variants/product-slider.variant";

interface ProductSliderViewModel {
  kind: "slider";
  items: ProductCollectionItem[];
  headingTemplate?: SectionHeaderTemplate;
  layoutTemplate: ProductSliderLayoutTemplate;
  actionTone: ActionLinkTone;
}

interface ProductTabsViewModel {
  kind: "tabs";
  title: string;
  groups: TabsSliderGroup[];
  headingTemplate: "flash-sale";
  tabTemplate: "flash-sale";
  layoutTemplate: "featured-showcase";
  actionTone: "danger";
}

export type ProductSliderBlockViewModel = ProductSliderViewModel | ProductTabsViewModel;

const FLASH_SALE_PRESENTATION = {
  headingTemplate: "flash-sale",
  tabTemplate: "flash-sale",
  layoutTemplate: "featured-showcase",
  actionTone: "danger",
} as const;

export async function resolveProductSliderBlock(
  block: ProductSliderBlockPayload,
): Promise<ProductSliderBlockViewModel> {
  const headingTemplate = block.props.headingTemplate ?? block.props.headerTemplate;
  const isFlashSale = headingTemplate === "flash-sale";

  if (isFlashSale && block.props.source.type === "promotion") {
    const groups = await getPromotionSessionCollectionGroups(
      block.props.source.promotionId,
      block.props.source.limit,
    );

    if (groups.some((group) => group.items.length)) {
      return {
        kind: "tabs",
        title: block.props.title ?? block.props.ariaLabel ?? "Danh sách sản phẩm",
        groups,
        ...FLASH_SALE_PRESENTATION,
      };
    }
  }

  return {
    kind: "slider",
    items: await getProductCollectionItems(block.props.source),
    headingTemplate,
    layoutTemplate: block.props.layoutTemplate ?? (isFlashSale ? "featured-showcase" : "default"),
    actionTone: isFlashSale ? "danger" : "primary",
  };
}
