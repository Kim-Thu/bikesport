import type { FooterProps } from "@/interfaces/footer.interface";
import { DefaultTemplate } from "./templates/DefaultTemplate";

const templates = {
  default: DefaultTemplate,
} as const;

export function Footer({ settings }: FooterProps) {
  if (!settings?.template) return null;

  const Template = templates[settings.template as keyof typeof templates];
  if (!Template) return null;

  return <Template settings={settings} />;
}
