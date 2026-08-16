export type CardTemplate =
  | "media-footer"
  | "media-action"
  | "media-meta"
  | "media-details"
  | "accent"
  | "overlay";

export interface CardMetaItem {
  icon?: string;
  text: string;
}

export interface CardProps {
  title: string;
  href: string;
  mediaId?: string | null;
  template?: CardTemplate;
  className?: string;
  description?: string;
  metaItems?: CardMetaItem[];
  price?: number;
  salePrice?: number | null;
  discountPercentage?: number | null;
  rating?: number;
  reviewCount?: number;
  actionLabel?: string;
  startAt?: string;
  publishedAt?: string;
  categoryName?: string;
  authorName?: string;
  location?: string;
  attendees?: number;
}
