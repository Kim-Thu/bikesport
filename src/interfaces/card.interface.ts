import type { MediaItem } from "@/interfaces/media.interface";

export type CardTemplate =
  | "media-footer"
  | "media-action"
  | "media-meta"
  | "media-details"
  | "flash-sale"
  | "accent"
  | "overlay"
  | "listing";

export interface CardMetaItem {
  icon?: string;
  text: string;
}

export interface CardProps {
  title: string;
  href: string;
  mediaId?: string | null;
  media?: MediaItem | null;
  template?: CardTemplate;
  className?: string;
  description?: string;
  metaItems?: CardMetaItem[];
  price?: number;
  salePrice?: number | null;
  discountPercentage?: number | null;
  stockRemaining?: number;
  stockTotal?: number;
  promotionBadgeMediaId?: string | null;
  promotionBadgeMedia?: MediaItem | null;
  promotionBadgeAlt?: string;
  rating?: number;
  reviewCount?: number;
  actionLabel?: string;
  startAt?: string;
  publishedAt?: string;
  categoryName?: string;
  categoryHref?: string;
  authorName?: string;
  location?: string;
  attendees?: number;
}
