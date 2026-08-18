export type MetaObjectType = "page" | "post" | "banner" | "product";
export type MetaCategoryStatus = "active" | "disabled";

export interface MetaCategoryRecord {
  _id: string;
  type: MetaObjectType;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  status: MetaCategoryStatus;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface MetaData {
  categories: MetaCategoryRecord[];
}
