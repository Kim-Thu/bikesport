export type CardTemplate = "category" | "product" | "promotion";

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
}
