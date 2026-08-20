export const PAGE_SECTION_SPACING_CLASS = {
  "flush-top": "pt-0 pb-4 sm:pt-0 sm:pb-8",
  compact: "pb-4 sm:pb-8",
  comfortable: "pb-8",
} as const;

export type PageSectionSpacingPreset = keyof typeof PAGE_SECTION_SPACING_CLASS;

export const PAGE_SECTION_SURFACE_CLASS = {
  panel: "rounded-xl border border-gray-200 bg-white p-4",
} as const;

export type PageSectionSurfacePreset = keyof typeof PAGE_SECTION_SURFACE_CLASS;

export const PAGE_ROW_LAYOUT_CLASS = {
  "stack-responsive": "flex-col items-stretch gap-4 lg:flex-row",
  "stack-responsive-start": "flex-col items-start gap-4 lg:flex-row",
  "stack-responsive-wide": "flex-col items-stretch gap-8 lg:flex-row",
  "split-equal": "flex-col items-stretch gap-4 lg:flex-row",
  "wrap-stretch": "flex-wrap items-stretch",
} as const;

export type PageRowLayoutPreset = keyof typeof PAGE_ROW_LAYOUT_CLASS;

export const PAGE_COLUMN_LAYOUT_CLASS = {
  full: "w-full",
  "full-spaced": "w-full space-y-8",
  "sidebar-sixth": "w-full lg:w-1/6",
  "sidebar-quarter": "w-full space-y-8 lg:w-1/4",
  half: "w-full lg:w-1/2",
  "half-panel": "w-full space-y-8 rounded-xl bg-blue-50 p-8 lg:w-1/2",
  "half-panel-soft": "w-full space-y-8 rounded-lg bg-blue-50 p-8 lg:w-1/2",
  "half-media": "flex w-full items-center overflow-hidden rounded-lg lg:w-1/2",
} as const;

export type PageColumnLayoutPreset = keyof typeof PAGE_COLUMN_LAYOUT_CLASS;

export const PAGE_GRID_LAYOUT_CLASS = {
  "one-two": "grid-cols-1 lg:grid-cols-2",
  "one-two-three": "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  "two-three-four": "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  "four-xl": "xl:grid-cols-4",
} as const;

export type PageGridLayoutPreset = keyof typeof PAGE_GRID_LAYOUT_CLASS;

export const PAGE_SLIDER_TRACK_CLASS = {
  standard: "-ml-4",
} as const;

export type PageSliderTrackPreset = keyof typeof PAGE_SLIDER_TRACK_CLASS;

export const PAGE_SLIDER_SLIDE_CLASS = {
  compact: "basis-48 pl-4 sm:basis-52 lg:basis-1/5",
  "compact-four": "basis-48 pl-4 sm:basis-52 lg:basis-1/4",
  "responsive-three": "basis-full pl-4 md:basis-1/2 lg:basis-1/3",
} as const;

export type PageSliderSlidePreset = keyof typeof PAGE_SLIDER_SLIDE_CLASS;

export function resolvePageSectionSpacing(preset?: PageSectionSpacingPreset) {
  return preset ? PAGE_SECTION_SPACING_CLASS[preset] : undefined;
}

export function resolvePageSectionSurface(preset?: PageSectionSurfacePreset) {
  return preset ? PAGE_SECTION_SURFACE_CLASS[preset] : undefined;
}

export function resolvePageRowLayout(preset?: PageRowLayoutPreset) {
  return preset ? PAGE_ROW_LAYOUT_CLASS[preset] : undefined;
}

export function resolvePageColumnLayout(preset?: PageColumnLayoutPreset) {
  return preset ? PAGE_COLUMN_LAYOUT_CLASS[preset] : undefined;
}

export function resolvePageGridLayout(preset?: PageGridLayoutPreset) {
  return preset ? PAGE_GRID_LAYOUT_CLASS[preset] : undefined;
}

export function resolvePageSliderTrack(preset?: PageSliderTrackPreset) {
  return preset ? PAGE_SLIDER_TRACK_CLASS[preset] : undefined;
}

export function resolvePageSliderSlide(preset?: PageSliderSlidePreset) {
  return preset ? PAGE_SLIDER_SLIDE_CLASS[preset] : undefined;
}
