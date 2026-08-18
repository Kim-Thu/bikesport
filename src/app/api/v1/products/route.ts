import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { ProductRecord } from "@/interfaces/product.interface";
import { parseApiLimit } from "@/lib/api-query.utils";
import { getPublishedProducts } from "@/lib/product.utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const products = await getPublishedProducts(parseApiLimit(searchParams.get("limit")));
  const body: ApiResponse<ProductRecord[]> = { data: products };

  return Response.json(body);
}
