import fs from "node:fs/promises";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;
if (!uri || !dbName) throw new Error("MONGODB_URI and MONGODB_DB_NAME are required");

const payload = JSON.parse(await fs.readFile(new URL("../src/data/wp-pages.json", import.meta.url), "utf8"));
const pages = Array.isArray(payload.pages) ? payload.pages : [];
if (!pages.length) throw new Error("No page fixtures found in src/data/wp-pages.json");

const client = new MongoClient(uri);
try {
  await client.connect();
  const collection = client.db(dbName).collection("pages");
  await collection.deleteMany({});
  await collection.insertMany(pages);
  console.log(`Seeded ${pages.length} pages into ${dbName}.pages for parity verification.`);
} finally {
  await client.close();
}
