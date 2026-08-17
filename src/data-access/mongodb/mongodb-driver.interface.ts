export interface MongoCursorLike<T> {
  sort(sort: Record<string, 1 | -1>): MongoCursorLike<T>;
  limit(limit: number): MongoCursorLike<T>;
  toArray(): Promise<T[]>;
}

export interface MongoCollectionLike<T> {
  findOne(filter: Record<string, unknown>): Promise<T | null>;
  find(filter?: Record<string, unknown>): MongoCursorLike<T>;
}

export interface MongoDatabaseLike {
  collection<T>(name: string): MongoCollectionLike<T>;
}

export type MongoDatabaseProvider = () => Promise<MongoDatabaseLike>;
