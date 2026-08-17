import "server-only";
import type { StorefrontDataSource } from "@/data-access/contracts/storefront-data-source.interface";
import type { DataSourceKind } from "@/data-access/data-source.type";
import { jsonStorefrontDataSource } from "@/data-access/json/json-storefront-data-source";

function getConfiguredDataSourceKind(): DataSourceKind {
  const value = process.env.DATA_SOURCE?.trim().toLowerCase();
  return value === "mongodb" ? "mongodb" : "json";
}

export function getStorefrontDataSource(): StorefrontDataSource {
  const kind = getConfiguredDataSourceKind();

  if (kind === "json") {
    return jsonStorefrontDataSource;
  }

  throw new Error(
    "MongoDB data source is selected but its adapter is not installed yet. Keep DATA_SOURCE=json until the MongoDB adapter is configured.",
  );
}
