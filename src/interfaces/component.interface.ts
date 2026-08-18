import type { ComponentName, ComponentPropsMap } from "@/types/component.type";

type ComponentItemBase<Name extends ComponentName> = {
  component: Name;
  enabled?: boolean;
};

type ComponentItemFor<Name extends ComponentName> = Record<never, never> extends ComponentPropsMap[Name]
  ? ComponentItemBase<Name> & { props?: ComponentPropsMap[Name] }
  : ComponentItemBase<Name> & { props: ComponentPropsMap[Name] };

export type ComponentItem = {
  [Name in ComponentName]: ComponentItemFor<Name>;
}[ComponentName];
