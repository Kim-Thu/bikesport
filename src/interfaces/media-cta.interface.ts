export type MediaCtaVariant = "surface" | "primary-inline";

export interface MediaCtaProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href: string;
  actionLabel?: string;
  mediaId?: string | null;
  variant?: MediaCtaVariant;
}
