import comboData from "@/data/wp-combo.json";
import type { ComboRecord } from "@/interfaces/combo.interface";
import { getPublishedProductsByIds, getProductPrimaryMediaId } from "@/lib/product.utils";

const activeCombos = (comboData.combos as ComboRecord[])
  .filter((combo) => combo.status === "active")
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
const featuredCombos = activeCombos.filter((combo) => combo.featured);

export function getActiveCombos(limit?: number) {
  return typeof limit === "number" ? activeCombos.slice(0, limit) : activeCombos;
}

export function getFeaturedCombos(limit?: number) {
  return typeof limit === "number" ? featuredCombos.slice(0, limit) : featuredCombos;
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
