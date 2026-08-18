import type { OrderRecord, OrderStatus } from "@/interfaces/order.interface";

export interface ProductSalesStatsRecord {
  sku: string;
  quantity: number;
  lastPurchasedAt: string;
}

export interface OrderDataSource {
  getById(id: string): Promise<OrderRecord | null>;
  getByOrderNumber(orderNumber: string): Promise<OrderRecord | null>;
  getByStatus(status: OrderStatus): Promise<OrderRecord[]>;
  getRecent(limit?: number): Promise<OrderRecord[]>;
  getCompletedProductSalesStats(skus?: string[]): Promise<ProductSalesStatsRecord[]>;
}
