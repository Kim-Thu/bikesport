import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { BrandRecord } from "@/interfaces/brand.interface";
import { getActiveBrands, getFeaturedBrands } from "@/lib/brand.utils";

function parseLimit(value: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return undefined;
  return Math.min(parsed, 100);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured") === "true";
  const limit = parseLimit(searchParams.get("limit"));
  const brands = featured
    ? await getFeaturedBrands(limit)
    : await getActiveBrands(limit);
  const body: ApiResponse<BrandRecord[]> = { data: brands };

  return Response.json(body);
}
