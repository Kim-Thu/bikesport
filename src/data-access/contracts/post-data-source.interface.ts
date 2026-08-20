import type {
  PostRecord,
  PostSearchQuery,
  PostSearchResult,
  PostType,
} from "@/interfaces/post.interface";

export interface PostDataSource {
  getLatestPublished(limit?: number): Promise<PostRecord[]>;
  getLatestPublishedByType(type: PostType, limit?: number): Promise<PostRecord[]>;
  getPublishedBySlugAndType(slug: string, type: PostType): Promise<PostRecord | null>;
  searchPublished(query: PostSearchQuery): Promise<PostSearchResult>;
}
