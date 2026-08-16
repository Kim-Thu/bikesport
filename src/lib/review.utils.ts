import wpReviews from "@/data/wp-reviews.json";
import type { ReviewData } from "@/interfaces/review.interface";

export interface ProductReviewStats {
  reviewCount: number;
  positiveReviewCount: number;
  averageRating: number;
}

export function getProductReviewStatsBySku(): Map<string, ProductReviewStats> {
  const totals = new Map<string, { count: number; positive: number; sum: number }>();

  for (const review of (wpReviews as ReviewData).reviews) {
    if (review.status !== "approved") continue;

    const current = totals.get(review.sku) ?? { count: 0, positive: 0, sum: 0 };
    current.count += 1;
    current.sum += review.rating;
    if (review.rating >= 4) current.positive += 1;
    totals.set(review.sku, current);
  }

  return new Map(
    [...totals.entries()].map(([sku, stats]) => [
      sku,
      {
        reviewCount: stats.count,
        positiveReviewCount: stats.positive,
        averageRating: stats.count ? stats.sum / stats.count : 0,
      },
    ]),
  );
}
