export interface PostRecord {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  excerpt?: string;
  categoryIds: string[];
  tagIds: string[];
  mediaId?: string | null;
  publishedAt: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
