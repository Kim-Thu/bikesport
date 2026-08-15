import type { HeaderProps } from "./interfaces/header.interface";
import { Template } from "./templates/Template";

export function Header({ settings }: HeaderProps) {
  if (!settings?.template || !settings.payload?.length) return null;

  return (
    <header id="home" className="w-full border-b border-gray-200 bg-white">
      <Template template={settings.template} settings={settings} />
    </header>
  );
}
