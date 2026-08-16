export type BrandStatus = "active" | "inactive";

export interface BrandRecord {
  _id: string;
  name: string;
  slug: string;
  description?: string | null;
  logoMediaId?: string | null;
  featured?: boolean;
  status: BrandStatus;
  order?: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
