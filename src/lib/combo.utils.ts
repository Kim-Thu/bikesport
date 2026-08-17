import comboData from "@/data/wp-combo.json";
import type { ComboRecord } from "@/interfaces/combo.interface";
import { getPublishedProducts, getProductPrimaryMediaId } from "@/lib/product.utils";

export function getActiveCombos(limit?: number) {
  const combos = (comboData.combos as ComboRecord[])
    .filter((combo) => combo.status === "active")
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return typeof limit === "number" ? combos.slice(0, limit) : combos;
}

export function getFeaturedCombos(limit?: number) {
  const combos = getActiveCombos().filter((combo) => combo.featured);
  return typeof limit === "number" ? combos.slice(0, limit) : combos;
}

export function getComboProducts(combo: ComboRecord) {
  const productsById = new Map(getPublishedProducts().map((product) => [product._id, product]));

  return combo.items
    .map((item) => {
      const product = productsById.get(item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

export function getComboPrimaryMediaId(combo: ComboRecord) {
  if (combo.mediaId) return combo.mediaId;

  const firstProduct = getComboProducts(combo)[0]?.product;
  return firstProduct ? getProductPrimaryMediaId(firstProduct) : undefined;
}

export function getComboDiscountPercentage(combo: ComboRecord) {
  if (combo.comboPrice >= combo.price) return null;
  return Math.round(((combo.price - combo.comboPrice) / combo.price) * 100);
}
