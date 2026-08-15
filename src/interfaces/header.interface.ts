import type { LayoutRow } from "@/interfaces/layout.interface";
import type { HeaderSlotName, HeaderTemplateName } from "@/types/header.type";

export interface HeaderSlot {
  slot: HeaderSlotName;
  enabled?: boolean;
  rows?: LayoutRow[];
}

export interface HeaderSettings {
  _id: string;
  name: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  template: HeaderTemplateName;
  payload: HeaderSlot[];
}

export interface HeaderProps {
  settings: HeaderSettings;
}

export interface HeaderTemplateProps {
  template: HeaderTemplateName;
  settings: HeaderSettings;
}

export interface HeaderTemplateViewProps {
  settings: HeaderSettings;
}

export interface HeaderPartialProps {
  region?: HeaderSlot;
}
