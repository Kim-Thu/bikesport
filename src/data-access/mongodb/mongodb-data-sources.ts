import type { DataSources } from "@/data-access/contracts/data-sources.interface";
import { getMongoDatabase } from "@/data-access/mongodb/mongodb-database-provider";
import { createMongoBrandDataSource } from "@/data-access/mongodb/mongodb-brand-data-source";
import { createMongoCategoryDataSource } from "@/data-access/mongodb/mongodb-category-data-source";
import { createMongoMenuDataSource } from "@/data-access/mongodb/mongodb-menu-data-source";
import { createMongoPageDataSource } from "@/data-access/mongodb/mongodb-page-data-source";
import { createMongoProductDataSource } from "@/data-access/mongodb/mongodb-product-data-source";
import { createMongoPromotionDataSource } from "@/data-access/mongodb/mongodb-promotion-data-source";

export const mongodbDataSources: DataSources = {
  page: createMongoPageDataSource(getMongoDatabase),
  category: createMongoCategoryDataSource(getMongoDatabase),
  brand: createMongoBrandDataSource(getMongoDatabase),
  product: createMongoProductDataSource(getMongoDatabase),
  promotion: createMongoPromotionDataSource(getMongoDatabase),
  menu: createMongoMenuDataSource(getMongoDatabase),
};
