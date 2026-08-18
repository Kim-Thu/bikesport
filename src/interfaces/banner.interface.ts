import type { BannerOverlayVariant, BannerVariant } from "@/variants/banner.variant";

export type BannerStatus = "draft" | "scheduled" | "active" | "expired" | "disabled";
export type BannerActionVariant = "primary" | "outline";
export type BannerActionIconPosition = "left" | "right";

export interface BannerFeature {
  iconMediaId?: string;
  title: string;
  description?: string;
}

export interface BannerAction {
  label: string;
  href: string;
  variant?: BannerActionVariant;
  icon?: string;
  iconPosition?: BannerActionIconPosition;
}

export interface BannerPromotionCard {
  label: string;
  description?: string;
  promotionId: string;
  icon?: string;
}

export interface BannerOverlay {
  variant: BannerOverlayVariant;
}

export interface BannerRecord {
  _id: string;
  categoryId: string;
  groupId?: string;
  order?: number;
  name: string;
  status: BannerStatus;
  variant: BannerVariant;
  overlay?: BannerOverlay;
  eyebrow?: string;
  title?: string;
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
