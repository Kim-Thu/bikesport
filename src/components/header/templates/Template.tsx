import type { HeaderSettings } from "../interfaces/header.interface";
import { DefaultHeaderTemplate } from "./DefaultHeaderTemplate";

interface TemplateProps {
  template: string;
  settings: HeaderSettings;
}

const templates = {
  default: DefaultHeaderTemplate,
} as const;

export function Template({ template, settings }: TemplateProps) {
  const HeaderTemplate = templates[template as keyof typeof templates];

  if (!HeaderTemplate) return null;

  return <HeaderTemplate settings={settings} />;
}
