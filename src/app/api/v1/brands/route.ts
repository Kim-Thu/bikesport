import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { BrandRecord } from "@/interfaces/brand.interface";
import { parseApiBoolean, parseApiLimit } from "@/lib/api-query.utils";
import { getActiveBrands, getFeaturedBrands } from "@/lib/brand.utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = parseApiBoolean(searchParams.get("featured"));
  const limit = parseApiLimit(searchParams.get("limit"));
  const brands = featured
    ? await getFeaturedBrands(limit)
    : await getActiveBrands(limit);
  const body: ApiResponse<BrandRecord[]> = { data: brands };

  return Response.json(body);
}
