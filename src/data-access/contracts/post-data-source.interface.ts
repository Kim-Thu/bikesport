import type { PostRecord } from "@/interfaces/post.interface";

export interface PostDataSource {
  getLatestPublished(limit?: number): Promise<PostRecord[]>;
}
