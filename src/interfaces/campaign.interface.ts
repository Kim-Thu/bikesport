export interface CampaignDisplay {
  title: string;
  subtitle?: string;
  href: string;
  actionLabel?: string;
  mediaId?: string | null;
}

export interface CampaignRecord {
  _id: string;
  name: string;
  slug: string;
  status: "active" | "inactive";
  type: string;
  description?: string | null;
  promotionIds: string[];
  display: CampaignDisplay;
  startAt: string;
  endAt?: string | null;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
