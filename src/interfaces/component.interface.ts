import type { ComponentName, ComponentProps } from "@/types/component.type";

export interface ComponentItem {
  component: ComponentName;
  enabled?: boolean;
  props?: ComponentProps;
}
