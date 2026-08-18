import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { EventRecord } from "@/interfaces/event.interface";
import { parseApiLimit } from "@/lib/api-query.utils";
import { getFeaturedEvents } from "@/lib/event.utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const events = await getFeaturedEvents(parseApiLimit(searchParams.get("limit")));
  const body: ApiResponse<EventRecord[]> = { data: events };

  return Response.json(body);
}
