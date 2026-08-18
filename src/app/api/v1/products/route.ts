import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { ProductRecord } from "@/interfaces/product.interface";
import { getPublishedProducts } from "@/lib/product.utils";

const MAX_LIMIT = 100;

function parseLimit(request: Request): number | undefined {
  const rawLimit = new URL(request.url).searchParams.get("limit");
  if (!rawLimit) return undefined;

  const limit = Number.parseInt(rawLimit, 10);
  if (!Number.isFinite(limit) || limit <= 0) return undefined;

  return Math.min(limit, MAX_LIMIT);
}

export async function GET(request: Request) {
  const products = await getPublishedProducts(parseLimit(request));
  const body: ApiResponse<ProductRecord[]> = { data: products };

  return Response.json(body);
}
