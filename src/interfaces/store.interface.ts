export type StoreLocationType = "province" | "district" | "ward";

export interface StoreRegionRecord {
  _id: string;
  name: string;
  slug: string;
  status: "active" | "inactive";
  order?: number;
}

export interface StoreLocationRecord {
  _id: string;
  name: string;
  slug: string;
  type: StoreLocationType;
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
  regionId: string;
  locationId: string;
  addressLine: string;
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
  regions: StoreRegionRecord[];
  locations: StoreLocationRecord[];
  stores: StoreRecord[];
}
