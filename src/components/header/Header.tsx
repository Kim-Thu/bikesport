import type { HeaderProps } from "@/interfaces/header.interface";
import { Template } from "./templates/Template";

export function Header({ settings }: HeaderProps) {
  if (!settings?.template || !settings.payload?.length) return null;

  return <Template template={settings.template} settings={settings} />;
}
