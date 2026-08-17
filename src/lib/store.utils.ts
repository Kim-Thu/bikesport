import storeData from "@/data/wp-stores.json";
import type { StoreCategoryRecord, StoreData, StoreRecord } from "@/interfaces/store.interface";

const data = storeData as StoreData;

export function getStoreCategories(type?: StoreCategoryRecord["type"]) {
  return data.categories
    .filter((category) => category.status === "active" && (!type || category.type === type))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getStoreCategoryById(categoryId: string) {
  return data.categories.find((category) => category._id === categoryId) ?? null;
}

export function getStoreCategoryChildren(parentId: string) {
  return getStoreCategories().filter((category) => category.parentId === parentId);
}

export function getStoreCategoryTreeIds(categoryId: string): string[] {
  const children = getStoreCategoryChildren(categoryId);
  return [categoryId, ...children.flatMap((child) => getStoreCategoryTreeIds(child._id))];
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

export function getStoresByCategory(categoryId: string, limit?: number): StoreRecord[] {
  const categoryIds = new Set(getStoreCategoryTreeIds(categoryId));
  const stores = getActiveStores().filter((store) =>
    store.categoryIds.some((id) => categoryIds.has(id)),
  );

  return typeof limit === "number" ? stores.slice(0, limit) : stores;
}
