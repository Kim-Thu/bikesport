import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { CategoryRecord, CategoryType } from "@/interfaces/category.interface";
import {
  getCategoriesByType,
  getFeaturedCategoriesByType,
} from "@/lib/category.utils";

const CATEGORY_TYPES = new Set<CategoryType>(["product", "post"]);

function parseLimit(value: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return undefined;
  return Math.min(parsed, 100);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const typeParam = searchParams.get("type") ?? "product";

  if (!CATEGORY_TYPES.has(typeParam as CategoryType)) {
    return Response.json(
      { error: { code: "INVALID_CATEGORY_TYPE", message: "Unsupported category type." } },
      { status: 400 },
    );
  }

  const type = typeParam as CategoryType;
  const featured = searchParams.get("featured") === "true";
  const limit = parseLimit(searchParams.get("limit"));
  const categories = featured
    ? await getFeaturedCategoriesByType(type, limit)
    : await getCategoriesByType(type);
  const data = limit && !featured ? categories.slice(0, limit) : categories;
  const body: ApiResponse<CategoryRecord[]> = { data };

  return Response.json(body);
}
