import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { PageRecord } from "@/interfaces/page.interface";
import { getPublishedPages } from "@/lib/page.utils";

const PUBLIC_READ_CACHE_CONTROL = "public, s-maxage=300, stale-while-revalidate=3600";

export async function GET() {
  const pages = await getPublishedPages();
  const body: ApiResponse<PageRecord[]> = { data: pages };

  return Response.json(body, {
    headers: {
      "Cache-Control": PUBLIC_READ_CACHE_CONTROL,
    },
  });
}
