import fs from "node:fs/promises";

const [jsonPath, mongoPath] = process.argv.slice(2);
if (!jsonPath || !mongoPath) {
  throw new Error("Usage: node scripts/verify-page-datasource-parity.mjs <json-response> <mongo-response>");
}

const jsonResponse = JSON.parse(await fs.readFile(jsonPath, "utf8"));
const mongoResponse = JSON.parse(await fs.readFile(mongoPath, "utf8"));

function normalize(response) {
  if (!Array.isArray(response?.data)) throw new Error("Expected response.data to be an array");
  return response.data
    .map((page) => ({
      _id: String(page._id),
      title: page.title,
      slug: page.slug,
      path: page.path,
      status: page.status,
      updatedAt: page.updatedAt,
    }))
    .sort((a, b) => a._id.localeCompare(b._id));
}

const jsonPages = normalize(jsonResponse);
const mongoPages = normalize(mongoResponse);

if (JSON.stringify(jsonPages) !== JSON.stringify(mongoPages)) {
  console.error("JSON/Mongo page summary parity failed.");
  console.error("JSON:", JSON.stringify(jsonPages, null, 2));
  console.error("Mongo:", JSON.stringify(mongoPages, null, 2));
  process.exit(1);
}

console.log(`JSON/Mongo page summary parity passed for ${jsonPages.length} published pages.`);
