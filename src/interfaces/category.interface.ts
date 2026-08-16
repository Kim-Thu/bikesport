export type CategoryType = "product" | "post";
export type CategoryStatus = "active" | "inactive";

export interface CategoryRecord {
  _id: string;
  type: CategoryType;
  name: string;
  slug: string;
  description?: string | null;
  parentId?: string | null;
  mediaId?: string | null;
  featured?: boolean;
  order?: number;
  status: CategoryStatus;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
