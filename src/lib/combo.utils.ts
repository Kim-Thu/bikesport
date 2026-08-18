import { dataSources } from "@/data-access/data-sources";
import type { ComboRecord } from "@/interfaces/combo.interface";
import { CACHE_TAG, cachedDomain } from "@/lib/cache.utils";
import { getPublishedProductsByIds, getProductPrimaryMediaId } from "@/lib/product.utils";

export async function getComboById(comboId: string): Promise<ComboRecord | null> {
  return cachedDomain(
    "combo",
    ["id", comboId],
    () => dataSources.combo.getById(comboId),
    [CACHE_TAG.entity("combo", comboId)],
  );
}

export async function getActiveCombos(limit?: number): Promise<ComboRecord[]> {
  return cachedDomain(
    "combo",
    ["active", String(limit ?? "all")],
    () => dataSources.combo.getActive(limit),
  );
}

export async function getFeaturedCombos(limit?: number): Promise<ComboRecord[]> {
  return cachedDomain(
    "combo",
    ["featured", String(limit ?? "all")],
    () => dataSources.combo.getFeatured(limit),
  );
}

export async function getComboProducts(combo: ComboRecord) {
  const productIds = combo.items.map((item) => item.productId);
  const products = await getPublishedProductsByIds(productIds);
  const productsById = new Map(products.map((product) => [product._id, product]));

  return combo.items
    .map((item) => {
      const product = productsById.get(item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

export async function getComboPrimaryMediaId(combo: ComboRecord) {
  if (combo.mediaId) return combo.mediaId;

  const firstProduct = (await getComboProducts(combo))[0]?.product;
  return firstProduct ? getProductPrimaryMediaId(firstProduct) : undefined;
}

export function getComboDiscountPercentage(combo: ComboRecord) {
  if (combo.comboPrice >= combo.price) return null;
  return Math.round(((combo.price - combo.comboPrice) / combo.price) * 100);
}
