import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { BannerRecord } from "@/interfaces/banner.interface";
import {
  getActiveBannersByCategory,
  getActiveBannersByGroup,
} from "@/lib/banner.utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupId = searchParams.get("groupId");
  const categoryId = searchParams.get("categoryId");

  if (!groupId && !categoryId) {
    return Response.json(
      {
        error: {
          code: "BANNER_FILTER_REQUIRED",
          message: "groupId or categoryId is required",
        },
      },
      { status: 400 },
    );
  }

  const banners = groupId
    ? await getActiveBannersByGroup(groupId)
    : await getActiveBannersByCategory(categoryId);
  const body: ApiResponse<BannerRecord[]> = { data: banners };

  return Response.json(body);
}
