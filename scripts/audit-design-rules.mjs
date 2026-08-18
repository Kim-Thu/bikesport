import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const SOURCE_ROOT = "src";
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);
const TAILWIND_SHADOW_PATTERN = /(?:^|[\s"'`])(?:[\w-]+:)*shadow(?:-[^\s"'`]+)?(?=$|[\s"'`])/g;
const CSS_BOX_SHADOW_PATTERN = /\bbox-shadow\s*:/g;

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(path));
      continue;
    }

    if (entry.isFile() && SOURCE_EXTENSIONS.has(extname(entry.name))) {
      files.push(path);
    }
  }

  return files;
}

function findMatches(content, pattern) {
  const matches = [];
  const lines = content.split("\n");

  for (const [index, line] of lines.entries()) {
    pattern.lastIndex = 0;
    if (pattern.test(line)) matches.push({ line: index + 1, text: line.trim() });
  }

  return matches;
}

const findings = [];
const files = await collectFiles(SOURCE_ROOT);

for (const file of files) {
  const content = await readFile(file, "utf8");
  const shadowUtilities = findMatches(content, TAILWIND_SHADOW_PATTERN);
  const boxShadowProperties = findMatches(content, CSS_BOX_SHADOW_PATTERN);

  for (const match of shadowUtilities) {
    findings.push({ file, ...match, rule: "Tailwind shadow utility" });
  }

  for (const match of boxShadowProperties) {
    findings.push({ file, ...match, rule: "CSS box-shadow" });
  }
}

if (findings.length) {
  console.error("Design audit failed: box shadows are not allowed in storefront source.\n");
  for (const finding of findings) {
    console.error(`${relative(process.cwd(), finding.file)}:${finding.line} [${finding.rule}] ${finding.text}`);
  }
  process.exit(1);
}

console.log("Design audit passed: no Tailwind shadow utilities or CSS box-shadow declarations found in src/.");
