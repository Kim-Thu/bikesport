export type PageStatus = "draft" | "published";
export type PageSectionStatus = "active" | "inactive";
export type PageSectionComponent = "banner" | "stack";

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
  props: {
    bannerId: string;
  };
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

export type PageSectionPayload = BannerSectionPayload | StackSectionPayload;

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
