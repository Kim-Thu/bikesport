import type { HeaderTemplateProps } from "@/interfaces/header.interface";
import { DefaultHeaderTemplate } from "./DefaultHeaderTemplate";

const templates = {
  default: DefaultHeaderTemplate,
} as const;

export function Template({ template, settings }: HeaderTemplateProps) {
  const HeaderTemplate = templates[template as keyof typeof templates];

  if (!HeaderTemplate) return null;

  return (
    <header id="home" className="w-full border-b border-gray-200 bg-white">
      <HeaderTemplate settings={settings} />
    </header>
  );
}
