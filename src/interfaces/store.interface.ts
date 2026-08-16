export interface StoreRecord {
  _id: string;
  name: string;
  slug: string;
  status: "active" | "inactive";
  featured?: boolean;
  address: string;
  phone?: string;
  openingHours?: string;
  mediaId?: string | null;
  order?: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreData {
  stores: StoreRecord[];
}
