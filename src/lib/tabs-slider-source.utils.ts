import type { TabsSliderBlockPayload } from "@/interfaces/page-block.interface";
import type { TabsSliderGroup } from "@/interfaces/tabs-slider.interface";
import { getActiveBrands } from "@/lib/brand.utils";
import {
  getProductCollectionItems,
  getPromotionSessionCollectionGroups,
} from "@/lib/product-collection-source.utils";

export type TabsSliderSource = TabsSliderBlockPayload["props"]["source"];

async function resolveComboGroups(
  source: Extract<TabsSliderSource, { type: "combo" }>,
): Promise<TabsSliderGroup[]> {
  return Promise.all(
    source.tabs.map(async (tab) => ({
      label: tab.label,
      value: tab.comboId,
      items: await getProductCollectionItems({ type: "combo", comboId: tab.comboId }),
    })),
  );
}

async function resolveBrandGroups(
  source: Extract<TabsSliderSource, { type: "brand" }>,
): Promise<TabsSliderGroup[]> {
  const brands = new Map((await getActiveBrands()).map((brand) => [brand._id, brand]));

  return Promise.all(
    source.tabs.map(async (tab) => ({
      label: tab.label,
      value: tab.brandId,
      mediaId: brands.get(tab.brandId)?.logoMediaId ?? null,
      items: await getProductCollectionItems({
        type: "brand",
        brandId: tab.brandId,
        limit: source.limit,
      }),
    })),
  );
}

async function resolveBestSellerGroups(
  source: Extract<TabsSliderSource, { type: "best-seller" }>,
): Promise<TabsSliderGroup[]> {
  return Promise.all(
    source.tabs.map(async (tab) => ({
      label: tab.label,
      value: tab.categoryId,
      items: await getProductCollectionItems({
        type: "best-seller",
        categoryId: tab.categoryId,
        limit: source.limit,
      }),
    })),
  );
}

export async function getTabsSliderGroups(source: TabsSliderSource): Promise<TabsSliderGroup[]> {
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
