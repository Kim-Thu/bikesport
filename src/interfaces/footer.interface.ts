import type { FooterTemplateName } from "@/types/footer.type";

export interface FooterAsset {
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  enabled?: boolean;
}

export interface FooterSettings {
  name: string;
  template: FooterTemplateName;
  description?: string;
  menuIds?: string[];
  assets?: FooterAsset[];
  copyright?: string;
}

export interface FooterProps {
  settings: FooterSettings;
}

export interface FooterTemplateProps {
  settings: FooterSettings;
}
