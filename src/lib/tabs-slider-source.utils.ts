import type { TabsSliderBlockPayload } from "@/interfaces/page-block.interface";
import type { TabsSliderGroup } from "@/interfaces/tabs-slider.interface";
import { getActiveBrands } from "@/lib/brand.utils";
import {
  getProductCollectionItems,
  getPromotionSessionCollectionGroups,
} from "@/lib/product-collection-source.utils";

export type TabsSliderSource = TabsSliderBlockPayload["props"]["source"];

function resolveComboGroups(source: Extract<TabsSliderSource, { type: "combo" }>): TabsSliderGroup[] {
  return source.tabs.map((tab) => ({
    label: tab.label,
    value: tab.comboId,
    items: getProductCollectionItems({ type: "combo", comboId: tab.comboId }),
  }));
}

function resolveBrandGroups(source: Extract<TabsSliderSource, { type: "brand" }>): TabsSliderGroup[] {
  const brands = new Map(getActiveBrands().map((brand) => [brand._id, brand]));

  return source.tabs.map((tab) => ({
    label: tab.label,
    value: tab.brandId,
    mediaId: brands.get(tab.brandId)?.logoMediaId ?? null,
    items: getProductCollectionItems({ type: "brand", brandId: tab.brandId, limit: source.limit }),
  }));
}

function resolveBestSellerGroups(
  source: Extract<TabsSliderSource, { type: "best-seller" }>,
): TabsSliderGroup[] {
  return source.tabs.map((tab) => ({
    label: tab.label,
    value: tab.categoryId,
    items: getProductCollectionItems({
      type: "best-seller",
      categoryId: tab.categoryId,
      limit: source.limit,
    }),
  }));
}

export function getTabsSliderGroups(source: TabsSliderSource): TabsSliderGroup[] {
  switch (source.type) {
    case "combo":
      return resolveComboGroups(source);
    case "brand":
      return resolveBrandGroups(source);
    case "flash-sale":
      return getPromotionSessionCollectionGroups(source.promotionId, source.limit);
    case "best-seller":
      return resolveBestSellerGroups(source);
  }
}
