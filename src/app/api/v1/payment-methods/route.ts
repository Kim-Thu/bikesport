import type { ApiResponse } from "@/interfaces/api-response.interface";
import type { PaymentMethod } from "@/interfaces/payment.interface";
import { getEnabledPaymentMethods } from "@/lib/payment.utils";

export async function GET() {
  const methods = await getEnabledPaymentMethods();
  const body: ApiResponse<PaymentMethod[]> = { data: methods };

  return Response.json(body);
}
