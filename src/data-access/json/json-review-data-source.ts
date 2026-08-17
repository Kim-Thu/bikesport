import wpReviews from "@/data/wp-reviews.json";
import type {
  ProductReviewStatsRecord,
  ReviewDataSource,
} from "@/data-access/contracts/review-data-source.interface";
import type { ReviewData } from "@/interfaces/review.interface";

const reviews = (wpReviews as ReviewData).reviews;

function getApprovedProductReviewStats(skus?: string[]): ProductReviewStatsRecord[] {
  const skuFilter = skus?.length ? new Set(skus) : null;
  const totals = new Map<string, { count: number; positive: number; sum: number }>();

  for (const review of reviews) {
    if (review.status !== "approved") continue;
    if (skuFilter && !skuFilter.has(review.sku)) continue;

    const current = totals.get(review.sku) ?? { count: 0, positive: 0, sum: 0 };
    current.count += 1;
    current.sum += review.rating;
    if (review.rating >= 4) current.positive += 1;
    totals.set(review.sku, current);
  }

  return [...totals.entries()].map(([sku, stats]) => ({
    sku,
    reviewCount: stats.count,
    positiveReviewCount: stats.positive,
    averageRating: stats.count ? stats.sum / stats.count : 0,
  }));
}

export const jsonReviewDataSource: ReviewDataSource = {
  async getApprovedProductReviewStats(skus) {
    return getApprovedProductReviewStats(skus);
  },
};
