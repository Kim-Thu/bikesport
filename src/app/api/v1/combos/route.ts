import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { ComboRecord } from "@/interfaces/combo.interface";
import { parseApiBoolean, parseApiLimit } from "@/lib/api-query.utils";
import { getActiveCombos, getFeaturedCombos } from "@/lib/combo.utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = parseApiBoolean(searchParams.get("featured"));
  const limit = parseApiLimit(searchParams.get("limit"));
  const combos = featured
    ? await getFeaturedCombos(limit)
    : await getActiveCombos(limit);
  const body: ApiResponse<ComboRecord[]> = { data: combos };

  return Response.json(body);
}
