import type { ReactNode } from "react";
import { AccentTemplate } from "@/components/card/templates/AccentTemplate";
import { MediaActionTemplate } from "@/components/card/templates/MediaActionTemplate";
import { MediaFooterTemplate } from "@/components/card/templates/MediaFooterTemplate";
import { OverlayTemplate } from "@/components/card/templates/OverlayTemplate";
import type { CardProps, CardTemplate } from "@/interfaces/card.interface";

const CARD_TEMPLATES: Record<CardTemplate, (props: CardProps) => ReactNode> = {
  "media-footer": MediaFooterTemplate,
  "media-action": MediaActionTemplate,
  accent: AccentTemplate,
  overlay: OverlayTemplate,
};

export function Card({ template = "media-footer", ...props }: CardProps) {
  const Template = CARD_TEMPLATES[template];

  return <Template template={template} {...props} />;
}
