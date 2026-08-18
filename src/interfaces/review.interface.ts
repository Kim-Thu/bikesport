export type ReviewStatus = "pending" | "approved" | "rejected";

export interface ReviewRecord {
  _id: string;
  sku: string;
  rating: number;
  status: ReviewStatus;
  createdAt: string;
}

export interface ReviewData {
  reviews: ReviewRecord[];
}
