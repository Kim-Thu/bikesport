import type { CardTemplate } from "@/interfaces/card.interface";
import type { PageBoxIconProps } from "@/interfaces/page.interface";

export type PageBlockStatus = "active" | "inactive";
export type PageBlockComponent = "tabs-slider" | "card-grid" | "icon-list" | "media-cta" | "inline-form";

interface PageBlockBase {
  _id: string;
  status: PageBlockStatus;
  component: PageBlockComponent;
}

export interface TabsSliderBlockPayload extends PageBlockBase {
  component: "tabs-slider";
  props: {
    title: string;
    href?: string;
    actionLabel?: string;
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
    source: {
      type: "event";
      limit?: number;
    };
  };
}

export interface IconListBlockPayload extends PageBlockBase {
  component: "icon-list";
  props: {
    items: PageBoxIconProps[];
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
  | TabsSliderBlockPayload
  | CardGridBlockPayload
  | IconListBlockPayload
  | MediaCtaBlockPayload
  | InlineFormBlockPayload;
