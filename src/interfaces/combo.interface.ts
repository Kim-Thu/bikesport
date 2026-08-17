export type ComboStatus = "draft" | "active" | "inactive";

export interface ComboItem {
  productId: string;
  quantity: number;
}

export interface ComboRecord {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  status: ComboStatus;
  items: ComboItem[];
  price: number;
  comboPrice: number;
  mediaId?: string | null;
  featured?: boolean;
  order?: number;
  campaignId?: string | null;
  promotionId?: string | null;
  createdAt: string;
  updatedAt: string;
}
