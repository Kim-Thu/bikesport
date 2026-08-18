import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB_NAME;

if (!uri || !databaseName) {
  throw new Error("MONGODB_URI and MONGODB_DB_NAME are required to apply MongoDB indexes.");
}

const indexManifest = {
  pages: [
    { key: { status: 1, path: 1 }, name: "pages_status_path" },
    { key: { status: 1, slug: 1 }, name: "pages_status_slug" },
  ],
  products: [
    { key: { status: 1, featured: 1 }, name: "products_status_featured" },
    { key: { status: 1, brandId: 1 }, name: "products_status_brand" },
    { key: { status: 1, categoryIds: 1 }, name: "products_status_categories" },
    { key: { status: 1, sku: 1 }, name: "products_status_sku" },
  ],
  orders: [
    { key: { status: 1, createdAt: -1 }, name: "orders_status_created_at" },
    { key: { status: 1, "items.sku": 1 }, name: "orders_status_item_sku" },
    { key: { orderNumber: 1 }, name: "orders_order_number" },
  ],
};

const client = new MongoClient(uri);

try {
  await client.connect();
  const database = client.db(databaseName);

  for (const [collectionName, indexes] of Object.entries(indexManifest)) {
    await database.collection(collectionName).createIndexes(indexes);
    console.log(`Applied ${indexes.length} indexes to ${collectionName}.`);
  }
} finally {
  await client.close();
}
