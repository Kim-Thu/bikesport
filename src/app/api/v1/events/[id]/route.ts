import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { EventRecord } from "@/interfaces/event.interface";
import { getEventById } from "@/lib/event.utils";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    const body: ApiResponse<EventRecord> = {
      error: { code: "EVENT_NOT_FOUND", message: "Event not found" },
    };
    return Response.json(body, { status: 404 });
  }

  const body: ApiResponse<EventRecord> = { data: event };
  return Response.json(body);
}
