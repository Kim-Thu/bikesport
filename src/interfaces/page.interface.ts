import type { CardTemplate } from "@/interfaces/card.interface";
import type { CategoryType } from "@/interfaces/category.interface";
import type { PageBlockPayload } from "@/interfaces/page-block.interface";
import type { SectionHeadingConfig } from "@/interfaces/section-heading.interface";
import type { SectionTemplate } from "@/interfaces/section.interface";
import type {
  PageBoxIconDescriptionSize,
  PageBoxIconTitleSize,
  PageBoxIconTone,
} from "@/variants/box-icon.variant";
import type {
  PageColumnLayoutPreset,
  PageGridLayoutPreset,
  PageRowLayoutPreset,
  PageSectionSpacingPreset,
} from "@/variants/page-layout.variant";

export type PageStatus = "draft" | "published";
export type PageSectionStatus = "active" | "inactive";
export type PageSectionComponent = "banner" | "stack" | "card-grid" | "layout";

export interface PageBoxIconProps {
  icon?: string;
  mediaId?: string;
  title: string;
  description?: string;
  iconTone?: PageBoxIconTone;
  titleSize?: PageBoxIconTitleSize;
  descriptionSize?: PageBoxIconDescriptionSize;
  /** @deprecated Use iconTone. */
  iconClassName?: string;
  /** @deprecated Use titleSize. */
  titleClassName?: string;
  /** @deprecated Use descriptionSize. */
  descriptionClassName?: string;
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
    spacing?: PageSectionSpacingPreset;
    rowLayout?: PageRowLayoutPreset;
    /** @deprecated Use spacing. */
    sectionClassName?: string;
    /** @deprecated Use rowLayout. */
    rowClassName?: string;
  };
  columns: PageColumnPayload[];
}

export interface CardGridSectionPayload extends PageSectionBase {
  component: "card-grid";
  props: SectionHeadingConfig & {
    title: string;
    template: CardTemplate;
    gridLayout?: PageGridLayoutPreset;
    spacing?: PageSectionSpacingPreset;
    /** @deprecated Use gridLayout. */
    gridClassName?: string;
    /** @deprecated Use spacing. */
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
    layout?: PageColumnLayoutPreset;
    grow?: boolean;
    /** @deprecated Use layout. */
    className?: string;
  };
  blocks: PageBlockPayload[];
}

export interface LayoutRowPayload {
  _id: string;
  props?: {
    layout?: PageRowLayoutPreset;
    /** @deprecated Use layout. */
    className?: string;
  };
  columns: LayoutColumnPayload[];
}

export interface LayoutSectionPayload extends PageSectionBase {
  component: "layout";
  props: {
    sectionTemplate?: SectionTemplate;
    spacing?: PageSectionSpacingPreset;
    /** @deprecated Use spacing. */
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

export type PageSectionPayloadMap = {
  [Component in PageSectionComponent]: Extract<PageSectionPayload, { component: Component }>;
};

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
