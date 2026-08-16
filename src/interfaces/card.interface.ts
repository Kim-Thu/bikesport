export type CardTemplate = "category" | "product" | "promotion" | "event";

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
  actionLabel?: string;
  startAt?: string;
  location?: string;
  attendees?: number;
}
