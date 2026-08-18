import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "src", "data");
const SOURCE_DIR = path.join(ROOT, "src");
const PUBLIC_PREFIXES = ["/uploads/", "/icons/", "/bikesport-logo.svg"];
const missing = new Map();

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

function walkJson(value, source) {
  if (typeof value === "string") {
    verifyAsset(value, source);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => walkJson(item, source));
    return;
  }
  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => walkJson(item, source));
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

if (missing.size) {
  console.error("Public asset audit failed:");
  for (const [asset, sources] of missing) {
    console.error(`- ${asset} referenced by ${[...new Set(sources)].join(", ")}`);
  }
  process.exit(1);
}

console.log("Public asset audit passed: all local public asset references resolve to files.");
