import wpOrders from "@/data/wp-orders.json";
import type { OrderData } from "@/interfaces/order.interface";

export function getProductSalesBySku(): Map<string, number> {
  const sales = new Map<string, number>();

  for (const order of (wpOrders as OrderData).orders) {
    if (order.status !== "completed") continue;

    for (const item of order.items) {
      sales.set(item.sku, (sales.get(item.sku) ?? 0) + item.quantity);
    }
  }

  return sales;
}
