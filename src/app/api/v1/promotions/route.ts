import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { PromotionRecord } from "@/interfaces/promotion.interface";
import { getActivePromotions } from "@/lib/promotion.utils";

export async function GET() {
  const promotions = await getActivePromotions();
  const body: ApiResponse<PromotionRecord[]> = { data: promotions };

  return Response.json(body);
}
