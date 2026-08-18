import "server-only";
import { getMongoDataSourceConfig } from "@/data-access/data-source.config";
import type {
  MongoConnectionFactory,
  MongoDatabaseLike,
} from "@/data-access/mongodb/mongodb-driver.interface";
import { createMongoRuntimeDatabase } from "@/data-access/mongodb/mongodb-runtime";

let connectionFactory: MongoConnectionFactory = createMongoRuntimeDatabase;

export function registerMongoConnectionFactory(factory: MongoConnectionFactory) {
  connectionFactory = factory;
}

export async function getMongoDatabase(): Promise<MongoDatabaseLike> {
  const config = getMongoDataSourceConfig();
  return connectionFactory(config);
}

export async function checkMongoRuntime(): Promise<boolean> {
  try {
    await getMongoDatabase();
    return true;
  } catch {
    return false;
  }
}
