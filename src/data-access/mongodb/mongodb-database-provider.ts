import "server-only";
import { getMongoDataSourceConfig } from "@/data-access/data-source.config";
import type {
  MongoConnectionFactory,
  MongoDatabaseLike,
} from "@/data-access/mongodb/mongodb-driver.interface";

let connectionFactory: MongoConnectionFactory | null = null;

export function registerMongoConnectionFactory(factory: MongoConnectionFactory) {
  connectionFactory = factory;
}

export async function getMongoDatabase(): Promise<MongoDatabaseLike> {
  const config = getMongoDataSourceConfig();

  if (!connectionFactory) {
    throw new Error(
      "MongoDB query adapters are ready, but the runtime MongoDB connection factory is not registered. Keep DATA_SOURCE=json while building the storefront, or register MongoClient later when MongoDB is enabled.",
    );
  }

  return connectionFactory(config);
}
