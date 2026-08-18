export const ANNOUNCEMENT_VARIANT = {
  TEXT: "text",
  IMAGE: "image",
} as const;

export type AnnouncementVariant = (typeof ANNOUNCEMENT_VARIANT)[keyof typeof ANNOUNCEMENT_VARIANT];
