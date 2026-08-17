import type { MediaCtaProps } from "@/interfaces/media-cta.interface";
import type { PageBlockBase } from "@/interfaces/blocks/page-block-base.interface";

export interface MediaCtaBlockPayload extends PageBlockBase {
  component: "media-cta";
  props: MediaCtaProps;
}

export interface MediaBlockPayload extends PageBlockBase {
  component: "media";
  props: {
    mediaId?: string | null;
    alt: string;
    href?: string;
    aspect?: "portrait" | "square" | "landscape" | "video";
  };
}
