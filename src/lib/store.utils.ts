import storeData from "@/data/wp-store.json";
import type { StoreData } from "@/interfaces/store.interface";

export function getFeaturedStores(limit?: number) {
  const stores = (storeData as StoreData).stores
    .filter((store) => store.status === "active" && store.featured === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return typeof limit === "number" ? stores.slice(0, limit) : stores;
}
