import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { PostRecord } from "@/interfaces/post.interface";
import { parseApiLimit } from "@/lib/api-query.utils";
import { getLatestPosts } from "@/lib/post.utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const posts = await getLatestPosts(parseApiLimit(searchParams.get("limit")));
  const body: ApiResponse<PostRecord[]> = { data: posts };

  return Response.json(body);
}
