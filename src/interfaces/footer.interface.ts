import type { FooterTemplateName } from "@/types/footer.type";

export interface FooterSettings {
  name: string;
  template: FooterTemplateName;
  description?: string;
  menuIds?: string[];
  copyright?: string;
}

export interface FooterProps {
  settings: FooterSettings;
}

export interface FooterTemplateProps {
  settings: FooterSettings;
}
