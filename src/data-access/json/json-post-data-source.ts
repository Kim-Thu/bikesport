import postData from "@/data/wp-posts.json";
import type { PostDataSource } from "@/data-access/contracts/post-data-source.interface";
import type { PostRecord } from "@/interfaces/post.interface";

const publishedPosts = (postData.posts as PostRecord[])
  .filter((post) => post.status === "published")
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export const jsonPostDataSource: PostDataSource = {
  async getLatestPublished(limit) {
    return typeof limit === "number" ? publishedPosts.slice(0, limit) : publishedPosts;
  },
};
