import { dataSources } from "@/data-access/data-sources";
import type { ProductSalesStatsRecord } from "@/data-access/contracts/order-data-source.interface";

export interface ProductSalesStats {
  quantity: number;
  lastPurchasedAt: string;
}

export async function getRankedProductSalesStats(
  skus?: string[],
  limit?: number,
): Promise<ProductSalesStatsRecord[]> {
  return dataSources.order.getCompletedProductSalesStats(skus, limit);
}

export async function getProductSalesStatsBySku(
  skus?: string[],
): Promise<ReadonlyMap<string, ProductSalesStats>> {
  const rows = await getRankedProductSalesStats(skus);

  return new Map(
    rows.map((row) => [
      row.sku,
      {
        quantity: row.quantity,
        lastPurchasedAt: row.lastPurchasedAt,
      },
    ]),
  );
}
