import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { PageSummary } from "@/interfaces/page.interface";
import { getPublishedPageSummaries } from "@/lib/page.utils";

const PUBLIC_READ_CACHE_CONTROL = "public, s-maxage=300, stale-while-revalidate=3600";

export async function GET() {
  const pages = await getPublishedPageSummaries();
  const body: ApiResponse<PageSummary[]> = { data: pages };

  return Response.json(body, {
    headers: {
      "Cache-Control": PUBLIC_READ_CACHE_CONTROL,
    },
  });
}
