import { dataSources } from "@/data-access/data-sources";
import type { PaymentMethod } from "@/interfaces/payment.interface";

export async function getEnabledPaymentMethods(): Promise<PaymentMethod[]> {
  return dataSources.payment.getEnabled();
}
