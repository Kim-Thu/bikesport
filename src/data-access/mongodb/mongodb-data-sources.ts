import type { DataSources } from "@/data-access/contracts/data-sources.interface";
import { getMongoDatabase } from "@/data-access/mongodb/mongodb-database-provider";
import { createMongoBrandDataSource } from "@/data-access/mongodb/mongodb-brand-data-source";
import { createMongoCategoryDataSource } from "@/data-access/mongodb/mongodb-category-data-source";
import { createMongoEventDataSource } from "@/data-access/mongodb/mongodb-event-data-source";
import { createMongoMenuDataSource } from "@/data-access/mongodb/mongodb-menu-data-source";
import { createMongoPageDataSource } from "@/data-access/mongodb/mongodb-page-data-source";
import { createMongoPostDataSource } from "@/data-access/mongodb/mongodb-post-data-source";
import { createMongoProductDataSource } from "@/data-access/mongodb/mongodb-product-data-source";
import { createMongoPromotionDataSource } from "@/data-access/mongodb/mongodb-promotion-data-source";
import { createMongoUserDataSource } from "@/data-access/mongodb/mongodb-user-data-source";
import type { MongoDatabaseProvider } from "@/data-access/mongodb/mongodb-driver.interface";

export function createMongoDataSources(
  getDatabase: MongoDatabaseProvider = getMongoDatabase,
): DataSources {
  return {
    page: createMongoPageDataSource(getDatabase),
    category: createMongoCategoryDataSource(getDatabase),
    brand: createMongoBrandDataSource(getDatabase),
    product: createMongoProductDataSource(getDatabase),
    promotion: createMongoPromotionDataSource(getDatabase),
    menu: createMongoMenuDataSource(getDatabase),
    post: createMongoPostDataSource(getDatabase),
    event: createMongoEventDataSource(getDatabase),
    user: createMongoUserDataSource(getDatabase),
  };
}

export const mongodbDataSources = createMongoDataSources();
