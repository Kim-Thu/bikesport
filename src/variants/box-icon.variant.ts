export const PAGE_BOX_ICON_TONE_CLASS = {
  primary: "text-blue-700",
  inverse: "text-white",
} as const;

export type PageBoxIconTone = keyof typeof PAGE_BOX_ICON_TONE_CLASS;

export const PAGE_BOX_ICON_TITLE_SIZE_CLASS = {
  metric: "text-2xl sm:text-3xl",
} as const;

export type PageBoxIconTitleSize = keyof typeof PAGE_BOX_ICON_TITLE_SIZE_CLASS;

export const PAGE_BOX_ICON_DESCRIPTION_SIZE_CLASS = {
  sm: "text-sm",
} as const;

export type PageBoxIconDescriptionSize = keyof typeof PAGE_BOX_ICON_DESCRIPTION_SIZE_CLASS;

export const PAGE_BOX_ICON_LAYOUT_CLASS = {
  inline: {
    root: "items-stretch justify-center gap-8",
    icon: "h-auto w-9 self-stretch",
    content: "flex-none self-center",
    title: "",
    description: "",
  },
  centered: {
    root: "flex-col items-center gap-4 text-center",
    icon: "h-10 w-10",
    content: "items-center",
    title: "normal-case",
    description: "max-w-xs",
  },
} as const;

export type PageBoxIconLayoutPreset = keyof typeof PAGE_BOX_ICON_LAYOUT_CLASS;
