import { readFile, writeFile } from "node:fs/promises";

const filePath = new URL("../src/data/wp-pages.json", import.meta.url);
const document = JSON.parse(await readFile(filePath, "utf8"));

const exactMigrations = {
  sectionClassName: new Map([
    ["pt-0 pb-4 sm:pt-0 sm:pb-6", ["spacing", "flush-top"]],
    ["pb-4 sm:pb-6", ["spacing", "compact"]],
    ["pb-6 sm:pb-8", ["spacing", "comfortable"]],
  ]),
  rowClassName: new Map([
    ["flex-wrap items-stretch", ["rowLayout", "wrap-stretch"]],
  ]),
  gridClassName: new Map([
    ["grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", ["gridLayout", "two-three-four"]],
    ["xl:grid-cols-4", ["gridLayout", "four-xl"]],
  ]),
  trackClassName: new Map([
    ["-ml-4", ["track", "standard"]],
  ]),
  slideClassName: new Map([
    ["basis-48 pl-4 sm:basis-52 lg:basis-1/5", ["slide", "compact"]],
    ["basis-48 pl-4 sm:basis-52 lg:basis-1/4", ["slide", "compact-four"]],
  ]),
  iconClassName: new Map([
    ["text-blue-600", ["iconTone", "primary"]],
    ["text-white", ["iconTone", "inverse"]],
  ]),
  titleClassName: new Map([
    ["text-2xl", ["titleSize", "metric"]],
  ]),
  descriptionClassName: new Map([
    ["text-sm", ["descriptionSize", "sm"]],
  ]),
};

const genericClassMigrations = new Map([
  ["w-full", ["layout", "full"]],
  ["w-full space-y-8", ["layout", "full-spaced"]],
  ["w-full lg:w-1/6", ["layout", "sidebar-sixth"]],
  ["w-full space-y-8 lg:w-1/4", ["layout", "sidebar-quarter"]],
  ["w-full lg:w-1/2", ["layout", "half"]],
  ["w-full space-y-6 rounded-xl bg-blue-50 p-6 lg:w-1/2", ["layout", "half-panel"]],
  ["flex-col items-stretch gap-4 lg:flex-row", ["layout", "stack-responsive"]],
  ["flex-col items-start gap-4 lg:flex-row", ["layout", "stack-responsive-start"]],
  ["flex-col items-stretch gap-6 lg:flex-row", ["layout", "stack-responsive-wide"]],
]);

const unresolved = [];
let migrated = 0;

function visit(value, path = "$") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => visit(item, `${path}[${index}]`));
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const key of Object.keys(value)) {
    const childPath = `${path}.${key}`;
    const rawValue = value[key];

    if (typeof rawValue === "string") {
      const migration = key === "className"
        ? genericClassMigrations.get(rawValue)
        : exactMigrations[key]?.get(rawValue);

      if (migration) {
        const [semanticKey, semanticValue] = migration;
        if (value[semanticKey] !== undefined && value[semanticKey] !== semanticValue) {
          throw new Error(`${childPath}: ${semanticKey} already exists with a different value`);
        }
        value[semanticKey] = semanticValue;
        delete value[key];
        migrated += 1;
        continue;
      }
    }

    if (/className$/i.test(key)) {
      unresolved.push(`${childPath} = ${JSON.stringify(rawValue)}`);
      continue;
    }

    visit(rawValue, childPath);
  }
}

visit(document);

if (unresolved.length) {
  console.error("Unresolved raw class config in wp-pages.json:");
  for (const item of unresolved) console.error(`- ${item}`);
  process.exitCode = 1;
} else {
  await writeFile(filePath, `${JSON.stringify(document, null, 2)}\n`, "utf8");
  console.log(`Migrated ${migrated} raw class config values to semantic presets.`);
}
