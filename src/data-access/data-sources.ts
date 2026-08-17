import "server-only";
import type { DataSources } from "@/data-access/contracts/data-sources.interface";
import { jsonBrandDataSource } from "@/data-access/json/json-brand-data-source";
import { jsonCategoryDataSource } from "@/data-access/json/json-category-data-source";
import { jsonEventDataSource } from "@/data-access/json/json-event-data-source";
import { jsonMenuDataSource } from "@/data-access/json/json-menu-data-source";
import { jsonPageDataSource } from "@/data-access/json/json-page-data-source";
import { jsonPostDataSource } from "@/data-access/json/json-post-data-source";
import { jsonProductDataSource } from "@/data-access/json/json-product-data-source";
import { jsonPromotionDataSource } from "@/data-access/json/json-promotion-data-source";
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
};

function createDataSources(): DataSources {
  const provider = process.env.DATA_SOURCE?.trim().toLowerCase() || "json";

  if (provider === "json") return jsonDataSources;
  if (provider === "mongodb") return mongodbDataSources;

  throw new Error(`Unsupported DATA_SOURCE: ${provider}`);
}

export const dataSources = createDataSources();
