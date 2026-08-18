export const BANNER_VARIANTS = ["promo-left", "content-left", "centered", "image-only"] as const;
export type BannerVariant = (typeof BANNER_VARIANTS)[number];

export const BANNER_OVERLAY_VARIANTS = ["blue-left", "blue-center"] as const;
export type BannerOverlayVariant = (typeof BANNER_OVERLAY_VARIANTS)[number];
