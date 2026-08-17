import "server-only";
import type { DataSources } from "@/data-access/contracts/data-sources.interface";
import { jsonPageDataSource } from "@/data-access/json/json-page-data-source";

const jsonDataSources: DataSources = {
  page: jsonPageDataSource,
};

function createDataSources(): DataSources {
  const provider = process.env.DATA_SOURCE?.trim().toLowerCase() || "json";

  if (provider === "json") {
    return jsonDataSources;
  }

  if (provider === "mongodb") {
    throw new Error(
      "DATA_SOURCE=mongodb is configured, but the MongoDB adapter has not been wired yet.",
    );
  }

  throw new Error(`Unsupported DATA_SOURCE: ${provider}`);
}

export const dataSources = createDataSources();
