import type { CardTemplate } from "@/interfaces/card.interface";
import type { IconListProps } from "@/interfaces/icon-list.interface";
import type { MediaCtaProps } from "@/interfaces/media-cta.interface";
import type { ProductSource } from "@/interfaces/product-source.interface";
import type { SectionHeaderProps, SectionHeaderTemplate } from "@/interfaces/section-header.interface";
import type { SectionHeadingConfig } from "@/interfaces/section-heading.interface";
import type { ActionLinkTone } from "@/variants/action-link.variant";
import type { ProductSliderLayoutTemplate } from "@/variants/product-slider.variant";
import type { TabsGridTemplate } from "@/variants/tabs-grid.variant";
import type { TabsSliderTemplate } from "@/variants/tabs-slider.variant";
import type { TabsTemplate } from "@/variants/tabs.variant";

export type { ProductSource } from "@/interfaces/product-source.interface";

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
  | "inline-form"
  | "section-header"
  | "content"
  | "timeline";

interface PageBlockBase {
  _id: string;
  status: PageBlockStatus;
  component: PageBlockComponent;
}

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
    trackClassName?: string;
    slideClassName?: string;
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
    containerClassName?: string;
    trackClassName?: string;
    slideClassName?: string;
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
  props: SectionHeadingConfig & {
    title: string;
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
  props: IconListProps;
}

export interface MediaCtaBlockPayload extends PageBlockBase {
  component: "media-cta";
  props: MediaCtaProps;
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

export interface SectionHeaderBlockPayload extends PageBlockBase {
  component: "section-header";
  props: SectionHeaderProps;
}

export interface ContentBlockPayload extends PageBlockBase {
  component: "content";
  props: {
    eyebrow?: string;
    title?: string;
    paragraphs?: string[];
    align?: "left" | "center" | "right";
    className?: string;
  };
}

export interface TimelineBlockPayload extends PageBlockBase {
  component: "timeline";
  props: {
    className?: string;
    items: Array<{
      label: string;
      title: string;
      description?: string;
      mediaId?: string | null;
      mediaAlt?: string;
    }>;
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
  | InlineFormBlockPayload
  | SectionHeaderBlockPayload
  | ContentBlockPayload
  | TimelineBlockPayload;
