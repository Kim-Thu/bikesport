import type { CardTemplate } from "@/interfaces/card.interface";
import type { SectionHeaderTemplate } from "@/interfaces/section-header.interface";
import type { TabsGridTemplate } from "@/variants/tabs-grid.variant";
import type { TabsTemplate } from "@/variants/tabs.variant";

export type PageBlockStatus = "active" | "inactive";
export type PageBlockComponent =
  | "ads"
  | "card"
  | "product-slider"
  | "tabs-slider"
  | "tabs-grid"
  | "card-grid"
  | "icon-list"
  | "media-cta"
  | "media"
  | "inline-form";

interface PageBlockBase {
  _id: string;
  status: PageBlockStatus;
  component: PageBlockComponent;
}

export type ProductSource =
  | { type: "promotion"; promotionId: string; limit?: number }
  | { type: "campaign"; campaignId: string; categoryId?: string; limit?: number }
  | { type: "category"; categoryId: string; limit?: number }
  | { type: "brand"; brandId: string; limit?: number };

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
  props: {
    title?: string;
    href?: string;
    actionLabel?: string;
    headerTemplate?: SectionHeaderTemplate;
    countdownAt?: string;
    template: CardTemplate;
    ariaLabel?: string;
    trackClassName?: string;
    slideClassName?: string;
    source: ProductSource;
  };
}

export interface TabsSliderBlockPayload extends PageBlockBase {
  component: "tabs-slider";
  props: {
    title: string;
    href?: string;
    actionLabel?: string;
    template: CardTemplate;
    tabTemplate?: TabsTemplate;
    trackClassName?: string;
    slideClassName?: string;
    source:
      | { type: "best-seller"; limit?: number; tabs: Array<{ label: string; categoryId: string }> }
      | { type: "combo"; tabs: Array<{ label: string; comboId: string }> }
      | { type: "brand"; limit?: number; tabs: Array<{ label: string; brandId: string }> };
  };
}

export interface TabsGridBlockPayload extends PageBlockBase {
  component: "tabs-grid";
  props: {
    title: string;
    titleMediaId?: string | null;
    titleAlt?: string;
    href?: string;
    actionLabel?: string;
    template: CardTemplate;
    headingTemplate?: SectionHeaderTemplate;
    tabsTemplate?: TabsTemplate;
    layoutTemplate?: TabsGridTemplate;
    backgroundMediaId?: string | null;
    gridClassName?: string;
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
  props: {
    title: string;
    href?: string;
    actionLabel?: string;
    template: CardTemplate;
    gridClassName?: string;
    source:
      | { type: "event"; limit?: number }
      | { type: "post"; limit?: number }
      | { type: "store"; limit?: number }
      | { type: "combo"; featured?: boolean; limit?: number };
  };
}

export interface IconListBlockPayload extends PageBlockBase {
  component: "icon-list";
  props: {
    items: Array<{ icon?: string; mediaId?: string; title: string; description?: string }>;
  };
}

export interface MediaCtaBlockPayload extends PageBlockBase {
  component: "media-cta";
  props: {
    eyebrow?: string;
    title: string;
    description?: string;
    href: string;
    actionLabel?: string;
    mediaId?: string | null;
  };
}

export interface MediaBlockPayload extends PageBlockBase {
  component: "media";
  props: {
    mediaId?: string | null;
    alt: string;
    href?: string;
    aspect?: "portrait" | "square" | "landscape" | "video";
  };
}

export interface InlineFormBlockPayload extends PageBlockBase {
  component: "inline-form";
  props: {
    title: string;
    description?: string;
    placeholder?: string;
    actionLabel?: string;
    inputType?: "email" | "text";
  };
}

export type PageBlockPayload =
  | AdsBlockPayload
  | CardBlockPayload
  | ProductSliderBlockPayload
  | TabsSliderBlockPayload
  | TabsGridBlockPayload
  | CardGridBlockPayload
  | IconListBlockPayload
  | MediaCtaBlockPayload
  | MediaBlockPayload
  | InlineFormBlockPayload;
