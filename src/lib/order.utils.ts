import wpOrders from "@/data/wp-orders.json";
import type { OrderData } from "@/interfaces/order.interface";

export interface ProductSalesStats {
  quantity: number;
  lastPurchasedAt: string;
}

export function getProductSalesStatsBySku(): Map<string, ProductSalesStats> {
  const sales = new Map<string, ProductSalesStats>();

  for (const order of (wpOrders as OrderData).orders) {
    if (order.status !== "completed") continue;

    for (const item of order.items) {
      const current = sales.get(item.sku);
      const lastPurchasedAt =
        !current || new Date(order.createdAt).getTime() > new Date(current.lastPurchasedAt).getTime()
          ? order.createdAt
          : current.lastPurchasedAt;

      sales.set(item.sku, {
        quantity: (current?.quantity ?? 0) + item.quantity,
        lastPurchasedAt,
      });
    }
  }

  return sales;
}
