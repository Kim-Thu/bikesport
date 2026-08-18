import { readFile, writeFile } from "node:fs/promises";

const fileUrl = new URL("../src/data/wp-option.json", import.meta.url);
const document = JSON.parse(await readFile(fileUrl, "utf8"));

const rowLayouts = new Map([
  ["justify-center", "centered"],
  ["flex-wrap gap-3 py-3 md:flex-nowrap md:gap-4 md:py-4 lg:gap-9", "responsive-wrap-spaced"],
  ["gap-2 py-2 lg:gap-4 lg:py-0", "responsive-compact"],
]);

const columnLayouts = new Map([
  ["flex items-center justify-center gap-4", "centered-spaced"],
  ["flex shrink-0 items-center gap-4", "shrink-spaced"],
  ["hidden min-w-0 flex-1 items-center gap-4 lg:flex", "desktop-grow"],
  ["ml-auto flex shrink-0 items-center gap-4", "trailing-actions"],
  ["flex min-w-0 items-center gap-2 lg:gap-4", "responsive-nav"],
]);

let migrated = 0;
const unresolved = [];

for (const [slotIndex, slot] of (document.header?.payload ?? []).entries()) {
  for (const [rowIndex, row] of (slot.rows ?? []).entries()) {
    if (typeof row.className === "string") {
      const layout = rowLayouts.get(row.className);
      if (!layout) unresolved.push(`header.payload[${slotIndex}].rows[${rowIndex}].className=${JSON.stringify(row.className)}`);
      else {
        row.layout = layout;
        delete row.className;
        migrated += 1;
      }
    }

    for (const [columnIndex, column] of (row.columns ?? []).entries()) {
      if (typeof column.className !== "string") continue;
      const layout = columnLayouts.get(column.className);
      if (!layout) unresolved.push(`header.payload[${slotIndex}].rows[${rowIndex}].columns[${columnIndex}].className=${JSON.stringify(column.className)}`);
      else {
        column.layout = layout;
        delete column.className;
        migrated += 1;
      }
    }
  }
}

if (unresolved.length) {
  console.error("Unresolved header class config:");
  unresolved.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

await writeFile(fileUrl, `${JSON.stringify(document, null, 2)}\n`, "utf8");
console.log(`Migrated ${migrated} header layout class values to semantic presets.`);
