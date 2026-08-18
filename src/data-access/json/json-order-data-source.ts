import wpOrders from "@/data/wp-orders.json";
import type {
  OrderDataSource,
  ProductSalesStatsRecord,
} from "@/data-access/contracts/order-data-source.interface";
import type { OrderRecord } from "@/interfaces/order.interface";

const orders = wpOrders.orders as OrderRecord[];
const orderById = new Map(orders.map((order) => [order._id, order]));
const orderByNumber = new Map(orders.map((order) => [order.orderNumber, order]));
const ordersByCreatedAtDesc = [...orders].sort((a, b) =>
  b.createdAt.localeCompare(a.createdAt),
);

function getCompletedProductSalesStats(
  skus?: string[],
  limit?: number,
): ProductSalesStatsRecord[] {
  const skuFilter = skus?.length ? new Set(skus) : null;
  const sales = new Map<string, ProductSalesStatsRecord>();

  for (const order of orders) {
    if (order.status !== "completed") continue;

    for (const item of order.items) {
      if (skuFilter && !skuFilter.has(item.sku)) continue;

      const current = sales.get(item.sku);
      sales.set(item.sku, {
        sku: item.sku,
        quantity: (current?.quantity ?? 0) + item.quantity,
        lastPurchasedAt:
          !current || order.createdAt > current.lastPurchasedAt
            ? order.createdAt
            : current.lastPurchasedAt,
      });
    }
  }

  const ranked = [...sales.values()].sort((a, b) => {
    const quantityDifference = b.quantity - a.quantity;
    if (quantityDifference !== 0) return quantityDifference;
    return b.lastPurchasedAt.localeCompare(a.lastPurchasedAt);
  });

  return typeof limit === "number" ? ranked.slice(0, Math.max(0, limit)) : ranked;
}

export const jsonOrderDataSource: OrderDataSource = {
  async getById(id) {
    return orderById.get(id) ?? null;
  },
  async getByOrderNumber(orderNumber) {
    return orderByNumber.get(orderNumber) ?? null;
  },
  async getByStatus(status) {
    return ordersByCreatedAtDesc.filter((order) => order.status === status);
  },
  async getRecent(limit = 20) {
    return ordersByCreatedAtDesc.slice(0, Math.max(0, limit));
  },
  async getCompletedProductSalesStats(skus, limit) {
    return getCompletedProductSalesStats(skus, limit);
  },
};
