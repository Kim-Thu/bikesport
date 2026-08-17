import paymentData from "@/data/wp-payment.json";
import type { PaymentDataSource } from "@/data-access/contracts/payment-data-source.interface";
import type { PaymentMethod } from "@/interfaces/payment.interface";

const enabledMethods = (paymentData.paymentMethods as PaymentMethod[])
  .filter((method) => method.enabled !== false)
  .slice()
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export const jsonPaymentDataSource: PaymentDataSource = {
  async getEnabled() {
    return enabledMethods;
  },
};
