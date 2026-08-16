import type { FooterTemplateProps } from "@/interfaces/footer.interface";
import { FooterBottom } from "../partials/FooterBottom";
import { FooterMain } from "../partials/FooterMain";

export function DefaultTemplate({ settings }: FooterTemplateProps) {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <FooterMain settings={settings} />
      <FooterBottom settings={settings} />
    </footer>
  );
}
