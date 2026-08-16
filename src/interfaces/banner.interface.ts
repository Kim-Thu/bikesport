export type BannerStatus = "draft" | "scheduled" | "active" | "expired" | "disabled";
export type BannerActionVariant = "primary" | "outline";
export type BannerCardSize = "default" | "lg";

export interface BannerFeature {
  iconMediaId?: string;
  title: string;
  description?: string;
}

export interface BannerAction {
  label: string;
  href: string;
  variant?: BannerActionVariant;
}

export interface BannerPromotionCard {
  label: string;
  description?: string;
  promotionId: string;
  icon?: string;
  size?: BannerCardSize;
}

export interface BannerRecord {
  _id: string;
  name: string;
  status: BannerStatus;
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  backgroundMediaId?: string;
  features?: BannerFeature[];
  actions?: BannerAction[];
  promotionCards?: BannerPromotionCard[];
  startAt?: string;
  endAt?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface BannerData {
  banners: BannerRecord[];
}

export interface BannerProps {
  bannerId: string;
}
