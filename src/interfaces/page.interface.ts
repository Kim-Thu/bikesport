import type { CardTemplate } from "@/interfaces/card.interface";
import type { CategoryType } from "@/interfaces/category.interface";
import type { PageBlockPayload } from "@/interfaces/page-block.interface";
import type { SectionTemplate } from "@/interfaces/section.interface";

export type PageStatus = "draft" | "published";
export type PageSectionStatus = "active" | "inactive";
export type PageSectionComponent = "banner" | "stack" | "card-grid" | "layout";

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

export interface LayoutColumnPayload {
  _id: string;
  props?: {
    className?: string;
    grow?: boolean;
  };
  blocks: PageBlockPayload[];
}

export interface LayoutRowPayload {
  _id: string;
  props?: {
    className?: string;
  };
  columns: LayoutColumnPayload[];
}

export interface LayoutSectionPayload extends PageSectionBase {
  component: "layout";
  props: {
    sectionTemplate?: SectionTemplate;
    sectionClassName?: string;
    containerClassName?: string;
  };
  rows: LayoutRowPayload[];
}

export type PageSectionPayload =
  | BannerSectionPayload
  | StackSectionPayload
  | CardGridSectionPayload
  | LayoutSectionPayload;

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
