import storeData from "@/data/wp-stores.json";
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
const regionById = new Map(data.regions.map((region) => [region._id, region]));

const activeLocations = data.locations
  .filter((location) => location.status === "active")
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
const locationById = new Map(data.locations.map((location) => [location._id, location]));
const activeLocationsByType = new Map<StoreLocationRecord["type"], StoreLocationRecord[]>();
const childrenByParentId = new Map<string, StoreLocationRecord[]>();

for (const location of activeLocations) {
  const typeItems = activeLocationsByType.get(location.type) ?? [];
  typeItems.push(location);
  activeLocationsByType.set(location.type, typeItems);

  if (location.parentId) {
    const children = childrenByParentId.get(location.parentId) ?? [];
    children.push(location);
    childrenByParentId.set(location.parentId, children);
  }
}

const activeStores = data.stores
  .filter((store) => store.status === "active")
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
const featuredStores = activeStores.filter((store) => store.featured === true);
const storesByRegionId = new Map<string, StoreRecord[]>();

for (const store of activeStores) {
  const stores = storesByRegionId.get(store.regionId) ?? [];
  stores.push(store);
  storesByRegionId.set(store.regionId, stores);
}

export function getStoreRegions(): StoreRegionRecord[] {
  return activeRegions;
}

export function getStoreRegionById(regionId: string): StoreRegionRecord | null {
  return regionById.get(regionId) ?? null;
}

export function getStoreLocations(type?: StoreLocationRecord["type"]): StoreLocationRecord[] {
  return type ? activeLocationsByType.get(type) ?? [] : activeLocations;
}

export function getStoreLocationById(locationId: string): StoreLocationRecord | null {
  return locationById.get(locationId) ?? null;
}

export function getStoreLocationChildren(parentId: string): StoreLocationRecord[] {
  return childrenByParentId.get(parentId) ?? [];
}

export function getStoreLocationAncestors(locationId: string): StoreLocationRecord[] {
  const ancestors: StoreLocationRecord[] = [];
  const seen = new Set<string>([locationId]);
  let current = getStoreLocationById(locationId);

  while (current?.parentId && !seen.has(current.parentId)) {
    seen.add(current.parentId);
    const parent = getStoreLocationById(current.parentId);
    if (!parent) break;
    ancestors.push(parent);
    current = parent;
  }

  return ancestors;
}

export function getStoreLocationTreeIds(locationId: string): string[] {
  const ids: string[] = [];
  const queue = [locationId];
  const seen = new Set<string>();

  while (queue.length) {
    const currentId = queue.shift();
    if (!currentId || seen.has(currentId)) continue;
    seen.add(currentId);
    ids.push(currentId);
    queue.push(...getStoreLocationChildren(currentId).map((location) => location._id));
  }

  return ids;
}

export function getStoreLocationPath(locationId: string): StoreLocationRecord[] {
  const current = getStoreLocationById(locationId);
  if (!current) return [];
  return [...getStoreLocationAncestors(locationId).reverse(), current];
}

export function formatStoreAddress(store: StoreRecord) {
  const locationNames = getStoreLocationPath(store.locationId).map((location) => location.name);
  return [store.addressLine, ...locationNames].filter(Boolean).join(", ");
}

export function getActiveStores(limit?: number): StoreRecord[] {
  return typeof limit === "number" ? activeStores.slice(0, limit) : activeStores;
}

export function getFeaturedStores(limit?: number): StoreRecord[] {
  return typeof limit === "number" ? featuredStores.slice(0, limit) : featuredStores;
}

export function getStoresByRegion(regionId: string, limit?: number): StoreRecord[] {
  const stores = storesByRegionId.get(regionId) ?? [];
  return typeof limit === "number" ? stores.slice(0, limit) : stores;
}

export function getStoresByLocation(locationId: string, limit?: number): StoreRecord[] {
  const locationIds = new Set(getStoreLocationTreeIds(locationId));
  const stores = activeStores.filter((store) => locationIds.has(store.locationId));
  return typeof limit === "number" ? stores.slice(0, limit) : stores;
}
