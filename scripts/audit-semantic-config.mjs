import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const dataRoot = fileURLToPath(new URL("../src/data/", import.meta.url));
const violations = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }

    if (extname(entry.name) !== ".json") continue;
    const document = JSON.parse(await readFile(path, "utf8"));
    visit(document, relative(dataRoot, path), "$");
  }
}

function visit(value, file, path) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => visit(item, file, `${path}[${index}]`));
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    const childPath = `${path}.${key}`;
    if (/className$/i.test(key)) {
      violations.push(`${file}:${childPath}`);
    }
    visit(child, file, childPath);
  }
}

await walk(dataRoot);

if (violations.length) {
  console.error("Raw class config is forbidden in src/data JSON. Use semantic presets instead:");
  violations.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log("Semantic config audit passed: no raw className keys in src/data JSON.");
