import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { StoreRecord } from "@/interfaces/store.interface";
import { parseApiBoolean, parseApiLimit } from "@/lib/api-query.utils";
import {
  getActiveStores,
  getFeaturedStores,
  getStoresByLocation,
  getStoresByRegion,
} from "@/lib/store.utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseApiLimit(searchParams.get("limit"));
  const regionId = searchParams.get("regionId");
  const locationId = searchParams.get("locationId");
  const featured = parseApiBoolean(searchParams.get("featured"));

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
