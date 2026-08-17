import type { ProductCollectionItem } from "@/interfaces/product-collection-item.interface";
import type { ProductSource } from "@/interfaces/product-source.interface";
import { getProductCollectionItems } from "@/lib/product-collection-source.utils";

export function getProductSliderItems(source: ProductSource): ProductCollectionItem[] {
  return getProductCollectionItems(source);
}
