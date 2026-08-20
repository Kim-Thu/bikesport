export const BANNER_VARIANTS = ["promo-left", "content-left", "centered", "image-only"] as const;
export type BannerVariant = (typeof BANNER_VARIANTS)[number];

export const BANNER_OVERLAY_VARIANTS = ["blue-left", "blue-center"] as const;
export type BannerOverlayVariant = (typeof BANNER_OVERLAY_VARIANTS)[number];

export const BANNER_SIZE_CLASS = {
  hero: "sm:aspect-hero-tablet lg:aspect-8/3",
  page: "aspect-8/3",
} as const;

export type BannerSize = keyof typeof BANNER_SIZE_CLASS;

export function resolveBannerSizeClass(size: BannerSize = "hero") {
  return BANNER_SIZE_CLASS[size];
}
