import "server-only";
import type { DataSources } from "@/data-access/contracts/data-sources.interface";
import { getDataSourceProvider } from "@/data-access/data-source.config";
import { jsonAdsDataSource } from "@/data-access/json/json-ads-data-source";
import { jsonAnnouncementDataSource } from "@/data-access/json/json-announcement-data-source";
import { jsonBannerDataSource } from "@/data-access/json/json-banner-data-source";
import { jsonBrandDataSource } from "@/data-access/json/json-brand-data-source";
import { jsonCampaignDataSource } from "@/data-access/json/json-campaign-data-source";
import { jsonCategoryDataSource } from "@/data-access/json/json-category-data-source";
import { jsonComboDataSource } from "@/data-access/json/json-combo-data-source";
import { jsonEventDataSource } from "@/data-access/json/json-event-data-source";
import { jsonMenuDataSource } from "@/data-access/json/json-menu-data-source";
import { jsonPageDataSource } from "@/data-access/json/json-page-data-source";
import { jsonPaymentDataSource } from "@/data-access/json/json-payment-data-source";
import { jsonPostDataSource } from "@/data-access/json/json-post-data-source";
import { jsonProductDataSource } from "@/data-access/json/json-product-data-source";
import { jsonPromotionDataSource } from "@/data-access/json/json-promotion-data-source";
import { jsonStoreDataSource } from "@/data-access/json/json-store-data-source";
import { jsonUserDataSource } from "@/data-access/json/json-user-data-source";
import { mongodbDataSources } from "@/data-access/mongodb/mongodb-data-sources";

const jsonDataSources: DataSources = {
  page: jsonPageDataSource,
  category: jsonCategoryDataSource,
  brand: jsonBrandDataSource,
  product: jsonProductDataSource,
  promotion: jsonPromotionDataSource,
  menu: jsonMenuDataSource,
  post: jsonPostDataSource,
  event: jsonEventDataSource,
  user: jsonUserDataSource,
  store: jsonStoreDataSource,
  banner: jsonBannerDataSource,
  ads: jsonAdsDataSource,
  combo: jsonComboDataSource,
  campaign: jsonCampaignDataSource,
  announcement: jsonAnnouncementDataSource,
  payment: jsonPaymentDataSource,
};

function createDataSources(): DataSources {
  const provider = getDataSourceProvider();

  return provider === "mongodb" ? mongodbDataSources : jsonDataSources;
}

export const dataSources = createDataSources();
