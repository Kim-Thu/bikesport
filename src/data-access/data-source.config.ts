import "server-only";

export type DataSourceProvider = "json" | "mongodb";

export interface MongoDataSourceConfig {
  uri: string;
  databaseName: string;
}

export function getDataSourceProvider(): DataSourceProvider {
  const provider = process.env.DATA_SOURCE?.trim().toLowerCase() || "json";

  if (provider === "json" || provider === "mongodb") return provider;

  throw new Error(`Unsupported DATA_SOURCE: ${provider}`);
}

export function getMongoDataSourceConfig(): MongoDataSourceConfig {
  const uri = process.env.MONGODB_URI?.trim();
  const databaseName = process.env.MONGODB_DB_NAME?.trim();

  if (!uri || !databaseName) {
    throw new Error(
      "MongoDB configuration is incomplete. MONGODB_URI and MONGODB_DB_NAME are required only when DATA_SOURCE=mongodb is enabled.",
    );
  }

  return { uri, databaseName };
}
