export type TabsTemplate = "default" | "image" | "featured" | "flash-sale";

export const TABS_LAYOUT_CLASS: Record<TabsTemplate, string> = {
  default: "items-center gap-4",
  image: "items-center gap-4",
  featured: "items-center gap-2",
  "flash-sale": "mx-auto w-fit max-w-full items-stretch gap-1 rounded-xl border border-red-100 bg-white p-1",
};
