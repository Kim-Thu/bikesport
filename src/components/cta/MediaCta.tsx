import type { ComponentType } from "react";
import { PrimaryInlineTemplate } from "@/components/cta/templates/PrimaryInlineTemplate";
import { SurfaceTemplate } from "@/components/cta/templates/SurfaceTemplate";
import type { MediaCtaProps, MediaCtaVariant } from "@/interfaces/media-cta.interface";

const MEDIA_CTA_TEMPLATES: Record<MediaCtaVariant, ComponentType<MediaCtaProps>> = {
  surface: SurfaceTemplate,
  "primary-inline": PrimaryInlineTemplate,
};

export function MediaCta({ variant = "surface", ...props }: MediaCtaProps) {
  const Template = MEDIA_CTA_TEMPLATES[variant];
  return <Template variant={variant} {...props} />;
}
