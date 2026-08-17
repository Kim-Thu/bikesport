export type ProductSource =
  | { type: "promotion"; promotionId: string; limit?: number }
  | { type: "campaign"; campaignId: string; categoryId?: string; limit?: number }
  | { type: "category"; categoryId: string; limit?: number }
  | { type: "brand"; brandId: string; limit?: number };

export type ProductCollectionSource =
  | ProductSource
  | { type: "combo"; comboId: string }
  | { type: "best-seller"; categoryId: string; limit?: number };
