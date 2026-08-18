import fs from "node:fs/promises";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;
if (!uri || !dbName) throw new Error("MONGODB_URI and MONGODB_DB_NAME are required");

async function readData(fileName) {
  return JSON.parse(await fs.readFile(new URL(`../src/data/${fileName}`, import.meta.url), "utf8"));
}

const [pages, products, categories, brands, promotions, banners, stores, posts, events, combos, payments] = await Promise.all([
  readData("wp-pages.json"),
  readData("wp-products.json"),
  readData("wp-category.json"),
  readData("wp-brand.json"),
  readData("wp-promotion.json"),
  readData("wp-banner.json"),
  readData("wp-stores.json"),
  readData("wp-posts.json"),
  readData("wp-event.json"),
  readData("wp-combo.json"),
  readData("wp-payment.json"),
]);

const fixtures = {
  pages: pages.pages,
  products: products.products,
  categories: categories.categories,
  brands: brands.brands,
  promotions: promotions.promotions,
  banners: banners.banners,
  store_regions: stores.regions,
  store_locations: stores.locations,
  stores: stores.stores,
  posts: posts.posts,
  events: events.events,
  combos: combos.combos,
  payments: payments.paymentMethods,
};

for (const [collectionName, records] of Object.entries(fixtures)) {
  if (!Array.isArray(records)) throw new Error(`Fixture for ${collectionName} must be an array`);
}

const client = new MongoClient(uri);
try {
  await client.connect();
  const db = client.db(dbName);

  for (const [collectionName, records] of Object.entries(fixtures)) {
    const collection = db.collection(collectionName);
    await collection.deleteMany({});
    if (records.length) await collection.insertMany(records);
    console.log(`Seeded ${records.length} records into ${dbName}.${collectionName}.`);
  }
} finally {
  await client.close();
}
