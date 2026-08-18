export type PostType = "article" | "recruitment";

export interface RecruitmentPostMeta {
  department: string;
  location: string;
  employmentType: string;
  salary?: string;
  deadline?: string;
  openings?: number;
  applyUrl?: string;
}

export interface PostRecord {
  _id: string;
  type: PostType;
  title: string;
  slug: string;
  status: "draft" | "published";
  excerpt?: string;
  categoryIds: string[];
  tagIds: string[];
  authorId: string;
  mediaId?: string | null;
  recruitment?: RecruitmentPostMeta;
  publishedAt: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
