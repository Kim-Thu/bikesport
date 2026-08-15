import type { PromotionVariant } from "@/variants/promotion.variant";

export interface PromotionProps {
  type?: PromotionVariant;
  content?: string;
  src?: string;
  alt?: string;
  href?: string;
  ctaLabel?: string;
}
