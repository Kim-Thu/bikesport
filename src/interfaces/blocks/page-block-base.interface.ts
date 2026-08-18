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

export interface PageBlockBase {
  _id: string;
  status: PageBlockStatus;
  component: PageBlockComponent;
}
