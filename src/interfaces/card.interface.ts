export type CardTemplate = "media-footer" | "media-action" | "media-meta" | "accent" | "overlay";

export interface CardProps {
  title: string;
  href: string;
  mediaId?: string | null;
  template?: CardTemplate;
  className?: string;
  description?: string;
  price?: number;
  salePrice?: number | null;
  discountPercentage?: number | null;
  rating?: number;
  reviewCount?: number;
  actionLabel?: string;
  startAt?: string;
  publishedAt?: string;
  location?: string;
  attendees?: number;
}
