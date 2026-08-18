export const LAYOUT_ROW_CLASS = {
  centered: "justify-center",
  "responsive-wrap-spaced": "flex-wrap gap-4 py-3 md:flex-nowrap md:gap-4 md:py-4 lg:gap-9",
  "responsive-compact": "gap-2 py-2 lg:gap-4 lg:py-0",
} as const;

export type LayoutRowPreset = keyof typeof LAYOUT_ROW_CLASS;

export const LAYOUT_COLUMN_CLASS = {
  "centered-spaced": "flex items-center justify-center gap-4",
  "shrink-spaced": "flex shrink-0 items-center gap-4",
  "desktop-grow": "hidden min-w-0 flex-1 items-center gap-4 lg:flex",
  "trailing-actions": "ml-auto flex shrink-0 items-center gap-4",
  "responsive-nav": "flex min-w-0 items-center gap-2 lg:gap-4",
} as const;

export type LayoutColumnPreset = keyof typeof LAYOUT_COLUMN_CLASS;

export function resolveLayoutRow(preset?: LayoutRowPreset) {
  return preset ? LAYOUT_ROW_CLASS[preset] : undefined;
}

export function resolveLayoutColumn(preset?: LayoutColumnPreset) {
  return preset ? LAYOUT_COLUMN_CLASS[preset] : undefined;
}
