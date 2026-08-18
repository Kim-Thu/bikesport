import type { MongoDataSourceConfig } from "@/data-access/data-source.config";

export interface MongoCursorLike<T> {
  sort(sort: Record<string, 1 | -1>): MongoCursorLike<T>;
  limit(limit: number): MongoCursorLike<T>;
  toArray(): Promise<T[]>;
}

export interface MongoCollectionLike<T> {
  findOne(filter: Record<string, unknown>): Promise<T | null>;
  find(filter?: Record<string, unknown>): MongoCursorLike<T>;
  aggregate<TResult>(pipeline: Record<string, unknown>[]): MongoCursorLike<TResult>;
}

export interface MongoDatabaseLike {
  collection<T>(name: string): MongoCollectionLike<T>;
}

/** Used by Mongo query adapters. They do not know connection configuration. */
export type MongoDatabaseProvider = () => Promise<MongoDatabaseLike>;

/** Future runtime driver boundary. MongoClient/Atlas/local Mongo belongs behind this contract. */
export type MongoConnectionFactory = (
  config: MongoDataSourceConfig,
) => Promise<MongoDatabaseLike>;
