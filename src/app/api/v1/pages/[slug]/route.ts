import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { PageRecord } from "@/interfaces/page.interface";
import { getPublishedPageBySlug } from "@/lib/page.utils";

const PUBLIC_READ_CACHE_CONTROL = "public, s-maxage=300, stale-while-revalidate=3600";
const NOT_FOUND_CACHE_CONTROL = "public, s-maxage=60, stale-while-revalidate=300";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug);

  if (!page) {
    const body: ApiResponse<PageRecord> = {
      error: {
        code: "PAGE_NOT_FOUND",
        message: "Page not found",
      },
    };

    return Response.json(body, {
      status: 404,
      headers: {
        "Cache-Control": NOT_FOUND_CACHE_CONTROL,
      },
    });
  }

  const body: ApiResponse<PageRecord> = { data: page };
  return Response.json(body, {
    headers: {
      "Cache-Control": PUBLIC_READ_CACHE_CONTROL,
    },
  });
}
