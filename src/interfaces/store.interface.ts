export interface StoreCategoryRecord {
  _id: string;
  name: string;
  slug: string;
  type: "region" | "province";
  parentId: string | null;
  status: "active" | "inactive";
  order?: number;
}

export interface StoreRecord {
  _id: string;
  name: string;
  slug: string;
  status: "active" | "inactive";
  featured?: boolean;
  categoryIds: string[];
  address: string;
  phone?: string;
  openingHours?: string;
  mediaId?: string | null;
  latitude?: number;
  longitude?: number;
  order?: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreData {
  categories: StoreCategoryRecord[];
  stores: StoreRecord[];
}
