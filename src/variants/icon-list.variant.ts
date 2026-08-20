export const ICON_LIST_CLASS = {
  grid: {
    root: "grid gap-4 sm:grid-cols-2",
    item: "min-w-0",
  },
  list: {
    root: "divide-y divide-gray-100 p-4",
    item: "py-2 first:pt-0 last:pb-0",
  },
  compact: {
    root: "flex flex-col gap-4",
    item: "min-w-0",
  },
} as const;

export type IconListLayout = keyof typeof ICON_LIST_CLASS;
