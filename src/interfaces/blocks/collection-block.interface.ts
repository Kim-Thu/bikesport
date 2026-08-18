import type { CardTemplate } from "@/interfaces/card.interface";
import type { CategoryType } from "@/interfaces/category.interface";
import type { PostType } from "@/interfaces/post.interface";
import type { ProductSource } from "@/interfaces/product-source.interface";
import type { SectionHeaderTemplate } from "@/interfaces/section-header.interface";
import type { SectionHeadingConfig } from "@/interfaces/section-heading.interface";
import type { PageBlockBase } from "@/interfaces/blocks/page-block-base.interface";
import type { ActionLinkTone } from "@/variants/action-link.variant";
import type {
  PageGridLayoutPreset,
  PageSliderSlidePreset,
  PageSliderTrackPreset,
} from "@/variants/page-layout.variant";
import type { ProductSliderLayoutTemplate } from "@/variants/product-slider.variant";
import type { TabsGridTemplate } from "@/variants/tabs-grid.variant";
import type { TabsSliderTemplate } from "@/variants/tabs-slider.variant";
import type { TabsTemplate } from "@/variants/tabs.variant";

export interface AdsBlockPayload extends PageBlockBase {
  component: "ads";
  props: { source: { type: "ads"; placement: string } };
}

export interface CardBlockPayload extends PageBlockBase {
  component: "card";
  props: {
    template: CardTemplate;
    source:
      | { type: "promotion"; promotionId: string }
      | { type: "campaign"; campaignId: string };
  };
}

export interface ProductSliderBlockPayload extends PageBlockBase {
  component: "product-slider";
  props: SectionHeadingConfig & {
    /** @deprecated Use headingTemplate. Kept for existing JSON compatibility. */
    headerTemplate?: SectionHeaderTemplate;
    layoutTemplate?: ProductSliderLayoutTemplate;
    countdownAt?: string;
    template: CardTemplate;
    ariaLabel?: string;
    trackLayout?: PageSliderTrackPreset;
    slideLayout?: PageSliderSlidePreset;
    source: ProductSource;
  };
}

export interface TabsSliderBlockPayload extends PageBlockBase {
  component: "tabs-slider";
  props: SectionHeadingConfig & {
    title: string;
    template: CardTemplate;
    tabTemplate?: TabsTemplate;
    layoutTemplate?: TabsSliderTemplate;
    actionTone?: ActionLinkTone;
    backgroundMediaId?: string | null;
    trackLayout?: PageSliderTrackPreset;
    slideLayout?: PageSliderSlidePreset;
    source:
      | { type: "best-seller"; limit?: number; tabs: Array<{ label: string; categoryId: string }> }
      | { type: "combo"; tabs: Array<{ label: string; comboId: string }> }
      | { type: "brand"; limit?: number; tabs: Array<{ label: string; brandId: string }> }
      | { type: "flash-sale"; promotionId: string; limit?: number };
  };
}

export interface TabsGridBlockPayload extends PageBlockBase {
  component: "tabs-grid";
  props: SectionHeadingConfig & {
    title: string;
    template: CardTemplate;
    tabsTemplate?: TabsTemplate;
    layoutTemplate?: TabsGridTemplate;
    backgroundMediaId?: string | null;
    gridLayout?: PageGridLayoutPreset;
    mobilePageSize?: number;
    tabs: Array<{
      label: string;
      value: string;
      source: ProductSource;
    }>;
  };
}

export interface CardGridBlockPayload extends PageBlockBase {
  component: "card-grid";
  props: SectionHeadingConfig & {
    title: string;
    template: CardTemplate;
    gridLayout?: PageGridLayoutPreset;
    source:
      | { type: "category"; categoryType: CategoryType; limit?: number }
      | { type: "event"; limit?: number }
      | { type: "post"; postType?: PostType; limit?: number }
      | { type: "store"; limit?: number }
      | { type: "combo"; featured?: boolean; limit?: number };
  };
}
