import { dataSources } from "@/data-access/data-sources";
import type { PaymentMethod } from "@/interfaces/payment.interface";
import { cachedDomain } from "@/lib/cache.utils";

export async function getEnabledPaymentMethods(): Promise<PaymentMethod[]> {
  return cachedDomain("payment", ["enabled"], () => dataSources.payment.getEnabled());
}
