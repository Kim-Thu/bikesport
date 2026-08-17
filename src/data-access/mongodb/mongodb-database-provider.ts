import "server-only";
import type {
  MongoDatabaseLike,
  MongoDatabaseProvider,
} from "@/data-access/mongodb/mongodb-driver.interface";

let databaseProvider: MongoDatabaseProvider | null = null;

export function registerMongoDatabaseProvider(provider: MongoDatabaseProvider) {
  databaseProvider = provider;
}

export async function getMongoDatabase(): Promise<MongoDatabaseLike> {
  if (!databaseProvider) {
    throw new Error(
      "MongoDB database provider is not registered. Configure the MongoDB driver connection before using DATA_SOURCE=mongodb.",
    );
  }

  return databaseProvider();
}
