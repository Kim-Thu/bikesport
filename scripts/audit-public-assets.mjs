import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "src", "data");
const SOURCE_DIR = path.join(ROOT, "src");
const PUBLIC_PREFIXES = ["/uploads/", "/icons/", "/bikesport-logo.svg"];
const missing = new Map();
const missingMediaIds = new Map();

const mediaData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "wp-media.json"), "utf8"));
const mediaIds = new Set((mediaData.media ?? []).map((item) => item?._id).filter(Boolean));

function isPublicAsset(value) {
  return PUBLIC_PREFIXES.some((prefix) => value.startsWith(prefix));
}

function verifyAsset(value, source) {
  if (!isPublicAsset(value)) return;
  const cleanPath = value.split(/[?#]/, 1)[0];
  const filePath = path.join(ROOT, "public", cleanPath.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    const sources = missing.get(cleanPath) ?? [];
    sources.push(source);
    missing.set(cleanPath, sources);
  }
}

function verifyMediaId(value, source, key) {
  if (typeof value !== "string" || !value.trim() || mediaIds.has(value)) return;
  const sources = missingMediaIds.get(value) ?? [];
  sources.push(`${source}:${key}`);
  missingMediaIds.set(value, sources);
}

function walkJson(value, source, key = "") {
  if (typeof value === "string") {
    verifyAsset(value, source);
    if (/mediaId$/i.test(key)) verifyMediaId(value, source, key);
    return;
  }

  if (Array.isArray(value)) {
    if (/mediaIds$/i.test(key)) {
      value.forEach((item) => verifyMediaId(item, source, key));
    }
    value.forEach((item) => walkJson(item, source, key));
    return;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([childKey, item]) => walkJson(item, source, childKey));
  }
}

for (const fileName of fs.readdirSync(DATA_DIR).filter((name) => name.endsWith(".json"))) {
  const filePath = path.join(DATA_DIR, fileName);
  walkJson(JSON.parse(fs.readFileSync(filePath, "utf8")), `src/data/${fileName}`);
}

function walkSource(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walkSource(fullPath);
      continue;
    }
    if (!/\.(?:ts|tsx|js|jsx|css)$/.test(entry.name)) continue;

    const relativePath = path.relative(ROOT, fullPath);
    const content = fs.readFileSync(fullPath, "utf8");
    for (const match of content.matchAll(/["'`](\/(?:uploads|icons)\/[^"'`?#\s]+|\/bikesport-logo\.svg)/g)) {
      verifyAsset(match[1], relativePath);
    }
  }
}

walkSource(SOURCE_DIR);

if (missing.size || missingMediaIds.size) {
  console.error("Public asset audit failed:");
  for (const [asset, sources] of missing) {
    console.error(`- missing file ${asset} referenced by ${[...new Set(sources)].join(", ")}`);
  }
  for (const [mediaId, sources] of missingMediaIds) {
    console.error(`- missing mediaId ${mediaId} referenced by ${[...new Set(sources)].join(", ")}`);
  }
  process.exit(1);
}

console.log(`Public asset audit passed: local files resolve and ${mediaIds.size} media records cover all mediaId references.`);
