import { dataSources } from "@/data-access/data-sources";
import type { ProductReviewStatsRecord } from "@/data-access/contracts/review-data-source.interface";

export interface ProductReviewStats {
  reviewCount: number;
  positiveReviewCount: number;
  averageRating: number;
}

export async function getProductReviewStatsBySku(
  skus?: string[],
): Promise<ReadonlyMap<string, ProductReviewStats>> {
  const rows: ProductReviewStatsRecord[] = await dataSources.review.getApprovedProductReviewStats(skus);

  return new Map(
    rows.map((row) => [
      row.sku,
      {
        reviewCount: row.reviewCount,
        positiveReviewCount: row.positiveReviewCount,
        averageRating: row.averageRating,
      },
    ]),
  );
}
