export const PANEL_VARIANT_CLASS = {
  default: "rounded-xl border border-gray-200 bg-white p-4",
  "primary-soft": "rounded-xl border border-blue-700 bg-blue-700/5 p-4",
} as const;

export type PanelVariant = keyof typeof PANEL_VARIANT_CLASS;
