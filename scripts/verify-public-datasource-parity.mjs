import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const [jsonDirectory, mongoDirectory] = process.argv.slice(2);
if (!jsonDirectory || !mongoDirectory) {
  throw new Error("Usage: node scripts/verify-public-datasource-parity.mjs <json-dir> <mongo-dir>");
}

const snapshots = [
  "pages",
  "products",
  "categories",
  "brands",
  "promotions",
  "banners",
  "stores",
  "posts",
  "events",
  "combos",
  "payment-methods",
];

function compareIdentity(left, right) {
  const leftKey = left?._id ?? left?.slug ?? left?.sku ?? left?.name ?? "";
  const rightKey = right?._id ?? right?.slug ?? right?.sku ?? right?.name ?? "";
  return String(leftKey).localeCompare(String(rightKey));
}

function canonicalize(value) {
  if (Array.isArray(value)) {
    const normalized = value.map(canonicalize);
    const sortable = normalized.length > 0 && normalized.every(
      (item) => item && typeof item === "object" && !Array.isArray(item) && ("_id" in item || "slug" in item || "sku" in item || "name" in item),
    );
    return sortable ? normalized.toSorted(compareIdentity) : normalized;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, canonicalize(item)]),
    );
  }

  return value;
}

for (const name of snapshots) {
  const [jsonText, mongoText] = await Promise.all([
    fs.readFile(path.join(jsonDirectory, `${name}.json`), "utf8"),
    fs.readFile(path.join(mongoDirectory, `${name}.json`), "utf8"),
  ]);
  const jsonBody = JSON.parse(jsonText);
  const mongoBody = JSON.parse(mongoText);
  const jsonData = canonicalize(jsonBody?.data);
  const mongoData = canonicalize(mongoBody?.data);

  if (JSON.stringify(jsonData) !== JSON.stringify(mongoData)) {
    console.error(`JSON/Mongo public API parity failed for /api/v1/${name}`);
    console.error("JSON data:", JSON.stringify(jsonData, null, 2));
    console.error("Mongo data:", JSON.stringify(mongoData, null, 2));
    process.exit(1);
  }

  const count = Array.isArray(jsonData) ? jsonData.length : 1;
  console.log(`Parity passed for /api/v1/${name} (${count} response item${count === 1 ? "" : "s"}).`);
}

console.log(`JSON/Mongo public API parity passed for ${snapshots.length} endpoints.`);
