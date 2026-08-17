import storeData from "@/data/wp-stores.json";
import type {
  StoreData,
  StoreLocationRecord,
  StoreRecord,
  StoreRegionRecord,
} from "@/interfaces/store.interface";

const data = storeData as StoreData;

export function getStoreRegions() {
  return data.regions
    .filter((region) => region.status === "active")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getStoreRegionById(regionId: string): StoreRegionRecord | null {
  return data.regions.find((region) => region._id === regionId) ?? null;
}

export function getStoreLocations(type?: StoreLocationRecord["type"]) {
  return data.locations
    .filter((location) => location.status === "active" && (!type || location.type === type))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getStoreLocationById(locationId: string): StoreLocationRecord | null {
  return data.locations.find((location) => location._id === locationId) ?? null;
}

export function getStoreLocationChildren(parentId: string) {
  return getStoreLocations().filter((location) => location.parentId === parentId);
}

export function getStoreLocationAncestors(locationId: string): StoreLocationRecord[] {
  const location = getStoreLocationById(locationId);
  if (!location?.parentId) return [];

  const parent = getStoreLocationById(location.parentId);
  return parent ? [parent, ...getStoreLocationAncestors(parent._id)] : [];
}

export function getStoreLocationTreeIds(locationId: string): string[] {
  const children = getStoreLocationChildren(locationId);
  return [locationId, ...children.flatMap((child) => getStoreLocationTreeIds(child._id))];
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

export function getActiveStores(limit?: number) {
  const stores = data.stores
    .filter((store) => store.status === "active")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return typeof limit === "number" ? stores.slice(0, limit) : stores;
}

export function getFeaturedStores(limit?: number) {
  const stores = getActiveStores().filter((store) => store.featured === true);
  return typeof limit === "number" ? stores.slice(0, limit) : stores;
}

export function getStoresByRegion(regionId: string, limit?: number): StoreRecord[] {
  const stores = getActiveStores().filter((store) => store.regionId === regionId);
  return typeof limit === "number" ? stores.slice(0, limit) : stores;
}

export function getStoresByLocation(locationId: string, limit?: number): StoreRecord[] {
  const locationIds = new Set(getStoreLocationTreeIds(locationId));
  const stores = getActiveStores().filter((store) => locationIds.has(store.locationId));
  return typeof limit === "number" ? stores.slice(0, limit) : stores;
}
