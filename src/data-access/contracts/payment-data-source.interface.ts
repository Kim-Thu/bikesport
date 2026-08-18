import type { PaymentMethod } from "@/interfaces/payment.interface";

export interface PaymentDataSource {
  getEnabled(): Promise<PaymentMethod[]>;
}
