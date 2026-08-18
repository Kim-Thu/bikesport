export const PAGE_BOX_ICON_TONE_CLASS = {
  primary: "text-blue-600",
  inverse: "text-white",
} as const;

export type PageBoxIconTone = keyof typeof PAGE_BOX_ICON_TONE_CLASS;

export const PAGE_BOX_ICON_TITLE_SIZE_CLASS = {
  metric: "text-2xl",
} as const;

export type PageBoxIconTitleSize = keyof typeof PAGE_BOX_ICON_TITLE_SIZE_CLASS;

export const PAGE_BOX_ICON_DESCRIPTION_SIZE_CLASS = {
  sm: "text-sm",
} as const;

export type PageBoxIconDescriptionSize = keyof typeof PAGE_BOX_ICON_DESCRIPTION_SIZE_CLASS;
