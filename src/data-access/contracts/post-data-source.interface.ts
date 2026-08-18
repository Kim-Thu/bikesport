import type { PostRecord, PostType } from "@/interfaces/post.interface";

export interface PostDataSource {
  getLatestPublished(limit?: number): Promise<PostRecord[]>;
  getLatestPublishedByType(type: PostType, limit?: number): Promise<PostRecord[]>;
}
