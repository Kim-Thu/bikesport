import { jsonPageDataSource } from "@/data-access/json/json-page-data-source";

export const dataSources = {
  page: jsonPageDataSource,
} as const;
