import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { ComboRecord } from "@/interfaces/combo.interface";
import { getComboById } from "@/lib/combo.utils";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const combo = await getComboById(id);

  if (!combo) {
    const body: ApiResponse<ComboRecord> = {
      error: { code: "COMBO_NOT_FOUND", message: "Combo not found" },
    };
    return Response.json(body, { status: 404 });
  }

  const body: ApiResponse<ComboRecord> = { data: combo };
  return Response.json(body);
}
