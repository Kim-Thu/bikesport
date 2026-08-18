export type AdsStatus = "active" | "inactive";
export type AdsSchedule =
  | { type: "always" }
  | { type: "fixed"; startAt: string; endAt: string }
  | { type: "promotion"; promotionId: string }
  | { type: "event"; eventId: string };

export interface AdsRecord {
  _id: string;
  name: string;
  placement: string;
  status: AdsStatus;
  priority: number;
  mediaId?: string | null;
  alt: string;
  href?: string;
  schedule: AdsSchedule;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdsData {
  ads: AdsRecord[];
}
