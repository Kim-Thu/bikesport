import type {
  ProductReviewStatsRecord,
  ReviewDataSource,
} from "@/data-access/contracts/review-data-source.interface";
import { MONGODB_COLLECTIONS } from "@/data-access/mongodb/mongodb-collection";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";
import type { ReviewRecord } from "@/interfaces/review.interface";

interface ProductReviewAggregationResult {
  _id: string;
  reviewCount: number;
  positiveReviewCount: number;
  averageRating: number;
}

export function createMongoReviewDataSource(
  getDatabase: MongoDatabaseProvider,
): ReviewDataSource {
  return {
    async getApprovedProductReviewStats(skus) {
      const database = await getDatabase();
      const match: Record<string, unknown> = { status: "approved" };

      if (skus?.length) {
        match.sku = { $in: skus };
      }

      const rows = await database
        .collection<ReviewRecord>(MONGODB_COLLECTIONS.reviews)
        .aggregate<ProductReviewAggregationResult>([
          { $match: match },
          {
            $group: {
              _id: "$sku",
              reviewCount: { $sum: 1 },
              positiveReviewCount: {
                $sum: { $cond: [{ $gte: ["$rating", 4] }, 1, 0] },
              },
              averageRating: { $avg: "$rating" },
            },
          },
        ])
        .toArray();

      return rows.map<ProductReviewStatsRecord>((row) => ({
        sku: row._id,
        reviewCount: row.reviewCount,
        positiveReviewCount: row.positiveReviewCount,
        averageRating: row.averageRating,
      }));
    },
  };
}
