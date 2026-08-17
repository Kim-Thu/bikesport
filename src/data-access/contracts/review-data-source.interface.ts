export interface ProductReviewStatsRecord {
  sku: string;
  reviewCount: number;
  positiveReviewCount: number;
  averageRating: number;
}

export interface ReviewDataSource {
  getApprovedProductReviewStats(skus?: string[]): Promise<ProductReviewStatsRecord[]>;
}
