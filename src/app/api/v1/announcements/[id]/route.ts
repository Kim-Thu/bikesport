import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { AnnouncementRecord } from "@/interfaces/announcement.interface";
import { getActiveAnnouncementById } from "@/lib/announcement.utils";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const announcement = await getActiveAnnouncementById(id);

  if (!announcement) {
    const body: ApiResponse<AnnouncementRecord> = {
      error: {
        code: "ANNOUNCEMENT_NOT_FOUND",
        message: "Announcement not found",
      },
    };
    return Response.json(body, { status: 404 });
  }

  const body: ApiResponse<AnnouncementRecord> = { data: announcement };
  return Response.json(body);
}
