import type { DataSources } from "@/data-access/contracts/data-sources.interface";
import { getMongoDatabase } from "@/data-access/mongodb/mongodb-database-provider";
import { createMongoPageDataSource } from "@/data-access/mongodb/mongodb-page-data-source";

export const mongodbDataSources: DataSources = {
  page: createMongoPageDataSource(getMongoDatabase),
};
