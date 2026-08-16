import type { CardTemplate } from "@/interfaces/card.interface";
import type { CategoryType } from "@/interfaces/category.interface";
import type { PageBlockPayload } from "@/interfaces/page-block.interface";

export type PageStatus = "draft" | "published";
export type PageSectionStatus = "active" | "inactive";
export type PageSectionComponent = "banner" | "stack" | "card-grid" | "lead-slider" | "content-aside";

export interface PageBoxIconProps {
  icon?: string;
  mediaId?: string;
  title: string;
  description?: string;
  iconClassName?: string;
}

export interface PageColumnPayload {
  _id: string;
  component: "box-icon";
  props: PageBoxIconProps;
}

interface PageSectionBase {
  _id: string;
  name: string;
  order: number;
  status: PageSectionStatus;
  component: PageSectionComponent;
}

export interface BannerSectionPayload extends PageSectionBase {
  component: "banner";
  props: { bannerId: string };
}

export interface StackSectionPayload extends PageSectionBase {
  component: "stack";
  props: {
    variant: "surface" | "primary";
    sectionClassName?: string;
    rowClassName?: string;
  };
  columns: PageColumnPayload[];
}

export interface CardGridSectionPayload extends PageSectionBase {
  component: "card-grid";
  props: {
    title: string;
    href?: string;
    actionLabel?: string;
    template: CardTemplate;
    gridClassName?: string;
    sectionClassName?: string;
    source: {
      type: "category";
      categoryType: CategoryType;
      limit?: number;
    };
  };
}

export interface LeadSliderSectionPayload extends PageSectionBase {
  component: "lead-slider";
  props: {
    leadTemplate: CardTemplate;
    productTemplate: CardTemplate;
    slideClassName?: string;
    limit?: number;
    sectionClassName?: string;
    source: {
      type: "promotion";
      promotionId: string;
    };
  };
}

export interface ContentAsideSectionPayload extends PageSectionBase {
  component: "content-aside";
  props: {
    sectionClassName?: string;
    gridClassName?: string;
    contentClassName?: string;
    asideClassName?: string;
  };
  content: PageBlockPayload[];
  aside: PageBlockPayload[];
}

export type PageSectionPayload =
  | BannerSectionPayload
  | StackSectionPayload
  | CardGridSectionPayload
  | LeadSliderSectionPayload
  | ContentAsideSectionPayload;

export interface PagePayload {
  sections: PageSectionPayload[];
}

export interface PageRecord {
  _id: string;
  title: string;
  slug: string;
  path: string;
  status: PageStatus;
  payload: PagePayload;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
