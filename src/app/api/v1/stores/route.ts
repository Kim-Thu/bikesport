import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { StoreRecord } from "@/interfaces/store.interface";
import {
  getActiveStores,
  getFeaturedStores,
  getStoresByLocation,
  getStoresByRegion,
} from "@/lib/store.utils";

function parseLimit(value: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return undefined;
  return Math.min(parsed, 100);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseLimit(searchParams.get("limit"));
  const regionId = searchParams.get("regionId");
  const locationId = searchParams.get("locationId");
  const featured = searchParams.get("featured") === "true";

  let stores: StoreRecord[];
  if (locationId) {
    stores = await getStoresByLocation(locationId, limit);
  } else if (regionId) {
    stores = await getStoresByRegion(regionId, limit);
  } else if (featured) {
    stores = await getFeaturedStores(limit);
  } else {
    stores = await getActiveStores(limit);
  }

  const body: ApiResponse<StoreRecord[]> = { data: stores };
  return Response.json(body);
}
