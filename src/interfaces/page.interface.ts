import type { CategoryType } from "@/interfaces/category.interface";

export type PageStatus = "draft" | "published";
export type PageSectionStatus = "active" | "inactive";
export type PageSectionComponent = "banner" | "stack" | "category-grid" | "product-sale";

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

export interface BannerSectionPayload {
  _id: string;
  name: string;
  order: number;
  status: PageSectionStatus;
  component: "banner";
  props: { bannerId: string };
}

export interface StackSectionPayload {
  _id: string;
  name: string;
  order: number;
  status: PageSectionStatus;
  component: "stack";
  props: {
    variant: "surface" | "primary";
    sectionClassName?: string;
    rowClassName?: string;
  };
  columns: PageColumnPayload[];
}

export interface CategoryGridSectionPayload {
  _id: string;
  name: string;
  order: number;
  status: PageSectionStatus;
  component: "category-grid";
  props: {
    title: string;
    href?: string;
    actionLabel?: string;
    type: CategoryType;
    limit?: number;
    sectionClassName?: string;
  };
}

export interface ProductSaleSectionPayload {
  _id: string;
  name: string;
  order: number;
  status: PageSectionStatus;
  component: "product-sale";
  props: {
    promotionId: string;
    limit?: number;
    sectionClassName?: string;
  };
}

export type PageSectionPayload =
  | BannerSectionPayload
  | StackSectionPayload
  | CategoryGridSectionPayload
  | ProductSaleSectionPayload;

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
