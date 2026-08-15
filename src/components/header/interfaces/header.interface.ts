import type { HeaderComponentName, HeaderComponentProps, HeaderSlotName, HeaderTemplateName } from "../types/header.type";

export interface HeaderItem {
  component: HeaderComponentName;
  enabled?: boolean;
  props?: HeaderComponentProps;
}

export interface HeaderColumn {
  id?: string;
  grow?: boolean;
  items?: HeaderItem[];
}

export interface HeaderRow {
  id?: string;
  columns?: HeaderColumn[];
}

export interface HeaderSlot {
  slot: HeaderSlotName;
  enabled?: boolean;
  rows?: HeaderRow[];
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
