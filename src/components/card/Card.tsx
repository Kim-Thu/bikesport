import type { ReactNode } from "react";
import { AccentTemplate } from "@/components/card/templates/AccentTemplate";
import { FlashSaleTemplate } from "@/components/card/templates/FlashSaleTemplate";
import { ListingTemplate } from "@/components/card/templates/ListingTemplate";
import { MediaActionTemplate } from "@/components/card/templates/MediaActionTemplate";
import { MediaDetailsTemplate } from "@/components/card/templates/MediaDetailsTemplate";
import { MediaFooterTemplate } from "@/components/card/templates/MediaFooterTemplate";
import { MediaMetaTemplate } from "@/components/card/templates/MediaMetaTemplate";
import { OverlayTemplate } from "@/components/card/templates/OverlayTemplate";
import type { CardProps, CardTemplate } from "@/interfaces/card.interface";

const CARD_TEMPLATES: Record<CardTemplate, (props: CardProps) => ReactNode> = {
  "media-footer": MediaFooterTemplate,
  "media-action": MediaActionTemplate,
  "media-meta": MediaMetaTemplate,
  "media-details": MediaDetailsTemplate,
  "flash-sale": FlashSaleTemplate,
  accent: AccentTemplate,
  overlay: OverlayTemplate,
  listing: ListingTemplate,
};

export function Card({ template = "media-footer", ...props }: CardProps) {
  const Template = CARD_TEMPLATES[template];

  return <Template template={template} {...props} />;
}
