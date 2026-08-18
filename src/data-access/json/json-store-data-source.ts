import storeData from "@/data/wp-stores.json";
import type { StoreDataSource } from "@/data-access/contracts/store-data-source.interface";
import type {
  StoreData,
  StoreLocationRecord,
  StoreRecord,
  StoreRegionRecord,
} from "@/interfaces/store.interface";

const data = storeData as StoreData;

const activeRegions = data.regions
  .filter((region) => region.status === "active")
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
const activeRegionById = new Map<string, StoreRegionRecord>(
  activeRegions.map((region) => [region._id, region]),
);

const activeLocations = data.locations
  .filter((location) => location.status === "active")
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
const activeLocationById = new Map<string, StoreLocationRecord>(
  activeLocations.map((location) => [location._id, location]),
);
const activeLocationChildrenByParentId = new Map<string, StoreLocationRecord[]>();
for (const location of activeLocations) {
  if (!location.parentId) continue;
  const children = activeLocationChildrenByParentId.get(location.parentId) ?? [];
  children.push(location);
  activeLocationChildrenByParentId.set(location.parentId, children);
}

const activeStores = data.stores
  .filter((store) => store.status === "active")
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
const featuredStores = activeStores.filter((store) => store.featured === true);

function withLimit<T>(items: T[], limit?: number): T[] {
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export const jsonStoreDataSource: StoreDataSource = {
  async getActiveRegions() {
    return activeRegions;
  },
  async getActiveRegionById(regionId) {
    return activeRegionById.get(regionId) ?? null;
  },
  async getActiveLocations(type) {
    return type ? activeLocations.filter((location) => location.type === type) : activeLocations;
  },
  async getActiveLocationById(locationId) {
    return activeLocationById.get(locationId) ?? null;
  },
  async getActiveLocationChildren(parentId) {
    return activeLocationChildrenByParentId.get(parentId) ?? [];
  },
  async getActiveStores(limit) {
    return withLimit(activeStores, limit);
  },
  async getFeaturedStores(limit) {
    return withLimit(featuredStores, limit);
  },
  async getActiveStoresByRegion(regionId, limit) {
    return withLimit(activeStores.filter((store) => store.regionId === regionId), limit);
  },
  async getActiveStoresByLocationIds(locationIds, limit) {
    const ids = new Set(locationIds);
    return withLimit(activeStores.filter((store: StoreRecord) => ids.has(store.locationId)), limit);
  },
};
