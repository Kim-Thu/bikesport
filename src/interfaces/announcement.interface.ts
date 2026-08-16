import type { PromotionVariant } from "@/variants/promotion.variant";

export type AnnouncementStatus = "draft" | "scheduled" | "active" | "expired" | "disabled";

export interface AnnouncementRecord {
  _id: string;
  name: string;
  status: AnnouncementStatus;
  type: PromotionVariant;
  content?: string;
  mediaId?: string;
  alt?: string;
  href?: string;
  ctaLabel?: string;
  iconMediaId?: string;
  startAt?: string;
  endAt?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnnouncementData {
  announcements: AnnouncementRecord[];
}

export interface AnnouncementProps {
  announcementId: string;
}
