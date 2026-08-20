import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const SOURCE_ROOT = "src";
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);
const TAILWIND_SHADOW_PATTERN = /(?:^|[\s"'`])(?:[\w-]+:)*shadow(?:-[^\s"'`]+)?(?=$|[\s"'`])/g;
const TAILWIND_ARBITRARY_PATTERN = /(?:^|[\s"'`])(?:[\w-]+:)*!?[a-z][\w-]*-\[[^\]]+\](?=$|[\s"'`])/g;
const CSS_BOX_SHADOW_PATTERN = /\bbox-shadow\s*:/g;
const REACT_INLINE_STYLE_PATTERN = /\bstyle\s*=\s*\{\{/g;
const STYLE_TAG_PATTERN = /<style(?:\s|>)/g;

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

const rules = [
  ["Tailwind shadow utility", TAILWIND_SHADOW_PATTERN],
  ["Tailwind arbitrary value", TAILWIND_ARBITRARY_PATTERN],
  ["CSS box-shadow", CSS_BOX_SHADOW_PATTERN],
  ["React inline style", REACT_INLINE_STYLE_PATTERN],
  ["Embedded style tag", STYLE_TAG_PATTERN],
];
const findings = [];
const files = await collectFiles(SOURCE_ROOT);

for (const file of files) {
  const content = await readFile(file, "utf8");

  for (const [rule, pattern] of rules) {
    for (const match of findMatches(content, pattern)) {
      findings.push({ file, ...match, rule });
    }
  }
}

if (findings.length) {
  console.error("Design audit failed: storefront source violates one or more guarded design rules.\n");
  for (const finding of findings) {
    console.error(`${relative(process.cwd(), finding.file)}:${finding.line} [${finding.rule}] ${finding.text}`);
  }
  process.exit(1);
}

console.log("Design audit passed: no shadows, arbitrary Tailwind values, React inline styles, or embedded style tags found in src/.");
