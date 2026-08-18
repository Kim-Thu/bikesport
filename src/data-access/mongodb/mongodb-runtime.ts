import "server-only";
import {
  MongoClient,
  type AggregationCursor,
  type Collection,
  type Db,
  type Document,
  type Filter,
  type FindCursor,
  type Sort,
} from "mongodb";
import type { MongoDataSourceConfig } from "@/data-access/data-source.config";
import type {
  MongoCollectionLike,
  MongoConnectionFactory,
  MongoCursorLike,
  MongoDatabaseLike,
} from "@/data-access/mongodb/mongodb-driver.interface";

type NativeCursor = FindCursor<Document> | AggregationCursor<Document>;

class MongoCursorAdapter<T> implements MongoCursorLike<T> {
  constructor(private readonly cursor: NativeCursor) {}

  sort(sort: Record<string, 1 | -1>): MongoCursorLike<T> {
    this.cursor.sort(sort as Sort);
    return this;
  }

  limit(limit: number): MongoCursorLike<T> {
    this.cursor.limit(limit);
    return this;
  }

  async toArray(): Promise<T[]> {
    return (await this.cursor.toArray()) as T[];
  }
}

class MongoCollectionAdapter<T> implements MongoCollectionLike<T> {
  constructor(private readonly collection: Collection<Document>) {}

  async findOne(filter: Record<string, unknown>): Promise<T | null> {
    return (await this.collection.findOne(filter as Filter<Document>)) as T | null;
  }

  find(filter: Record<string, unknown> = {}): MongoCursorLike<T> {
    return new MongoCursorAdapter<T>(this.collection.find(filter as Filter<Document>));
  }

  aggregate<TResult>(pipeline: Record<string, unknown>[]): MongoCursorLike<TResult> {
    return new MongoCursorAdapter<TResult>(this.collection.aggregate(pipeline as Document[]));
  }
}

class MongoDatabaseAdapter implements MongoDatabaseLike {
  constructor(private readonly database: Db) {}

  collection<T>(name: string): MongoCollectionLike<T> {
    return new MongoCollectionAdapter<T>(this.database.collection<Document>(name));
  }
}

let clientState: { uri: string; promise: Promise<MongoClient> } | null = null;

function getMongoClient(uri: string): Promise<MongoClient> {
  if (!clientState || clientState.uri !== uri) {
    const client = new MongoClient(uri);
    clientState = {
      uri,
      promise: client.connect().catch((error) => {
        clientState = null;
        throw error;
      }),
    };
  }

  return clientState.promise;
}

export const createMongoRuntimeDatabase: MongoConnectionFactory = async (
  config: MongoDataSourceConfig,
): Promise<MongoDatabaseLike> => {
  const client = await getMongoClient(config.uri);
  return new MongoDatabaseAdapter(client.db(config.databaseName));
};
