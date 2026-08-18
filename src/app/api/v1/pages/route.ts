import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { PageRecord } from "@/interfaces/page.interface";
import { getPublishedPages } from "@/lib/page.utils";

export async function GET() {
  const pages = await getPublishedPages();
  const body: ApiResponse<PageRecord[]> = { data: pages };

  return Response.json(body);
}
