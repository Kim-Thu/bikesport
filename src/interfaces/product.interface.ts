export interface ProductAttributeValue {
  attributeId: string;
  optionIds: string[];
}

export interface ProductRecord {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  status: "draft" | "published";
  brandId?: string | null;
  categoryIds: string[];
  tagIds: string[];
  mediaIds: string[];
  price: number;
  salePrice?: number | null;
  stock: number;
  featured?: boolean;
  bestSeller?: boolean;
  attributeValues: ProductAttributeValue[];
  createdAt: string;
  updatedAt: string;
}
