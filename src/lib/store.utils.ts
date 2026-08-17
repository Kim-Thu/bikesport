import { cache } from "react";
import { dataSources } from "@/data-access/data-sources";
import type {
  StoreLocationRecord,
  StoreRecord,
  StoreRegionRecord,
} from "@/interfaces/store.interface";

interface StoreLocationIndex {
  locationById: Map<string, StoreLocationRecord>;
  childrenByParentId: Map<string, StoreLocationRecord[]>;
}

const getStoreLocationIndex = cache(async (): Promise<StoreLocationIndex> => {
  const locations = await dataSources.store.getActiveLocations();
  const locationById = new Map(locations.map((location) => [location._id, location]));
  const childrenByParentId = new Map<string, StoreLocationRecord[]>();

  for (const location of locations) {
    if (!location.parentId) continue;
    const children = childrenByParentId.get(location.parentId) ?? [];
    children.push(location);
    childrenByParentId.set(location.parentId, children);
  }

  return { locationById, childrenByParentId };
});

export async function getStoreRegions(): Promise<StoreRegionRecord[]> {
  return dataSources.store.getActiveRegions();
}

export async function getStoreRegionById(regionId: string): Promise<StoreRegionRecord | null> {
  return dataSources.store.getActiveRegionById(regionId);
}

export async function getStoreLocations(
  type?: StoreLocationRecord["type"],
): Promise<StoreLocationRecord[]> {
  return dataSources.store.getActiveLocations(type);
}

export async function getStoreLocationById(locationId: string): Promise<StoreLocationRecord | null> {
  const { locationById } = await getStoreLocationIndex();
  return locationById.get(locationId) ?? null;
}

export async function getStoreLocationChildren(parentId: string): Promise<StoreLocationRecord[]> {
  const { childrenByParentId } = await getStoreLocationIndex();
  return childrenByParentId.get(parentId) ?? [];
}

export async function getStoreLocationAncestors(locationId: string): Promise<StoreLocationRecord[]> {
  const { locationById } = await getStoreLocationIndex();
  const ancestors: StoreLocationRecord[] = [];
  const seen = new Set<string>([locationId]);
  let current = locationById.get(locationId);

  while (current?.parentId && !seen.has(current.parentId)) {
    seen.add(current.parentId);
    const parent = locationById.get(current.parentId);
    if (!parent) break;
    ancestors.push(parent);
    current = parent;
  }

  return ancestors;
}

export async function getStoreLocationTreeIds(locationId: string): Promise<string[]> {
  const { childrenByParentId } = await getStoreLocationIndex();
  const ids: string[] = [];
  const queue = [locationId];
  const seen = new Set<string>();

  while (queue.length) {
    const currentId = queue.shift();
    if (!currentId || seen.has(currentId)) continue;
    seen.add(currentId);
    ids.push(currentId);
    queue.push(...(childrenByParentId.get(currentId) ?? []).map((location) => location._id));
  }

  return ids;
}

export async function getStoreLocationPath(locationId: string): Promise<StoreLocationRecord[]> {
  const { locationById } = await getStoreLocationIndex();
  const current = locationById.get(locationId);
  if (!current) return [];

  const ancestors: StoreLocationRecord[] = [];
  const seen = new Set<string>([locationId]);
  let node = current;

  while (node.parentId && !seen.has(node.parentId)) {
    seen.add(node.parentId);
    const parent = locationById.get(node.parentId);
    if (!parent) break;
    ancestors.push(parent);
    node = parent;
  }

  return [...ancestors.reverse(), current];
}

export async function formatStoreAddress(store: StoreRecord): Promise<string> {
  const locationNames = (await getStoreLocationPath(store.locationId)).map((location) => location.name);
  return [store.addressLine, ...locationNames].filter(Boolean).join(", ");
}

export async function getActiveStores(limit?: number): Promise<StoreRecord[]> {
  return dataSources.store.getActiveStores(limit);
}

export async function getFeaturedStores(limit?: number): Promise<StoreRecord[]> {
  return dataSources.store.getFeaturedStores(limit);
}

export async function getStoresByRegion(regionId: string, limit?: number): Promise<StoreRecord[]> {
  return dataSources.store.getActiveStoresByRegion(regionId, limit);
}

export async function getStoresByLocation(locationId: string, limit?: number): Promise<StoreRecord[]> {
  const locationIds = await getStoreLocationTreeIds(locationId);
  return dataSources.store.getActiveStoresByLocationIds(locationIds, limit);
}
