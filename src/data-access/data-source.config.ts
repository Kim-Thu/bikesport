import "server-only";

export type DataSourceProvider = "json" | "mongodb";

export interface MongoDataSourceConfig {
  uri: string;
  databaseName: string;
}

function assertSafeMongoUri(uri: string) {
  const normalized = uri.toLowerCase();
  const insecureOptions = [
    "tlsinsecure=true",
    "tlsallowinvalidcertificates=true",
    "tlsallowinvalidhostnames=true",
    "tls=false",
    "ssl=false",
  ];

  if (insecureOptions.some((option) => normalized.includes(option))) {
    throw new Error("MongoDB URI contains an insecure TLS option.");
  }

  if (process.env.NODE_ENV !== "production") return;

  const isLoopback =
    normalized.startsWith("mongodb://127.0.0.1") ||
    normalized.startsWith("mongodb://localhost") ||
    normalized.startsWith("mongodb://[::1]");
  const usesSecureSrv = normalized.startsWith("mongodb+srv://");
  const explicitlyEnablesTls = normalized.includes("tls=true") || normalized.includes("ssl=true");

  if (!isLoopback && !usesSecureSrv && !explicitlyEnablesTls) {
    throw new Error(
      "Production MongoDB connections must use mongodb+srv:// or explicitly enable TLS.",
    );
  }
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

  assertSafeMongoUri(uri);

  return { uri, databaseName };
}
