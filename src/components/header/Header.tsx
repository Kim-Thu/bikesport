import type { HeaderProps } from "@/interfaces/header.interface";
import { DefaultTemplate } from "./templates/DefaultTemplate";

const templates = {
  default: DefaultTemplate,
} as const;

export function Header({ settings }: HeaderProps) {
  if (!settings?.template || !settings.payload?.length) return null;

  const Template = templates[settings.template as keyof typeof templates];

  if (!Template) return null;

  return <Template settings={settings} />;
}
