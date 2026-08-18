import type { ComponentName, ComponentPropsMap } from "@/types/component.type";

export type ComponentItem = {
  [Name in ComponentName]: {
    component: Name;
    enabled?: boolean;
    props?: ComponentPropsMap[Name];
  };
}[ComponentName];