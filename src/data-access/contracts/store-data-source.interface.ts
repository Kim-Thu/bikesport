import type {
  StoreLocationRecord,
  StoreLocationType,
  StoreRecord,
  StoreRegionRecord,
} from "@/interfaces/store.interface";

export interface StoreDataSource {
  getActiveRegions(): Promise<StoreRegionRecord[]>;
  getActiveRegionById(regionId: string): Promise<StoreRegionRecord | null>;
  getActiveLocations(type?: StoreLocationType): Promise<StoreLocationRecord[]>;
  getActiveLocationById(locationId: string): Promise<StoreLocationRecord | null>;
  getActiveLocationChildren(parentId: string): Promise<StoreLocationRecord[]>;
  getActiveStores(limit?: number): Promise<StoreRecord[]>;
  getFeaturedStores(limit?: number): Promise<StoreRecord[]>;
  getActiveStoresByRegion(regionId: string, limit?: number): Promise<StoreRecord[]>;
  getActiveStoresByLocationIds(locationIds: string[], limit?: number): Promise<StoreRecord[]>;
}
