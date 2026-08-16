import type { CardTemplate } from "@/interfaces/card.interface";
import type { SectionHeaderTemplate } from "@/interfaces/section-header.interface";

export type PageBlockStatus = "active" | "inactive";
export type PageBlockComponent =
  | "ads"
  | "card"
  | "product-slider"
  | "tabs-slider"
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

export interface AdsBlockPayload extends PageBlockBase {
  component: "ads";
  props: {
    source: {
      type: "ads";
      placement: string;
    };
  };
}

export interface CardBlockPayload extends PageBlockBase {
  component: "card";
  props: {
    template: CardTemplate;
    source: {
      type: "promotion";
      promotionId: string;
    };
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
    source:
      | {
          type: "promotion";
          promotionId: string;
          limit?: number;
        }
      | {
          type: "category";
          categoryId: string;
          limit?: number;
        }
      | {
          type: "brand";
          brandId: string;
          limit?: number;
        };
  };
}

export interface TabsSliderBlockPayload extends PageBlockBase {
  component: "tabs-slider";
  props: {
    title: string;
    href?: string;
    actionLabel?: string;
    template: CardTemplate;
    trackClassName?: string;
    slideClassName?: string;
    source: {
      type: "best-seller";
      limit?: number;
      tabs: Array<{ label: string; categoryId: string }>;
    };
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
      | {
          type: "event";
          limit?: number;
        }
      | {
          type: "post";
          limit?: number;
        }
      | {
          type: "store";
          limit?: number;
        };
  };
}

export interface IconListBlockPayload extends PageBlockBase {
  component: "icon-list";
  props: {
    items: Array<{
      icon?: string;
      mediaId?: string;
      title: string;
      description?: string;
    }>;
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
  | CardGridBlockPayload
  | IconListBlockPayload
  | MediaCtaBlockPayload
  | MediaBlockPayload
  | InlineFormBlockPayload;
