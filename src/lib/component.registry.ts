import { createElement, type ComponentType } from "react";
import { AccountLoader } from "@/components/account/AccountLoader";
import { Announcement } from "@/components/announcement/Announcement";
import { Button } from "@/components/button/Button";
import { MiniCartLoader } from "@/components/cart/MiniCartLoader";
import { ContactLoader } from "@/components/contact/ContactLoader";
import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { LogoLoader } from "@/components/logo/LogoLoader";
import { MobileMenuLoader } from "@/components/navigation/MobileMenuLoader";
import { NavMenu } from "@/components/navigation/NavMenu";
import { Payment } from "@/components/payment/Payment";
import { SearchForm } from "@/components/search/SearchForm";
import { SocialLoader } from "@/components/social/SocialLoader";
import type { ComponentItem } from "@/interfaces/component.interface";
import type { ComponentName, ComponentPropsMap } from "@/types/component.type";

type ComponentRegistry = {
  [Name in ComponentName]: ComponentType<ComponentPropsMap[Name]>;
};

export const COMPONENT_REGISTRY = {
  announcement: Announcement,
  button: Button,
  icon: Icon,
  link: CLink,
  logo: LogoLoader,
  "search-form": SearchForm,
  contact: ContactLoader,
  account: AccountLoader,
  "mini-cart": MiniCartLoader,
  "nav-menu": NavMenu,
  "mobile-menu": MobileMenuLoader,
  payment: Payment,
  social: SocialLoader,
} satisfies ComponentRegistry;

function getRegisteredComponent<Name extends ComponentName>(name: Name): ComponentRegistry[Name] {
  return COMPONENT_REGISTRY[name];
}

function renderRegisteredComponent<Name extends ComponentName>(
  component: Name,
  props: ComponentPropsMap[Name] | undefined,
  key: string,
) {
  const Component = getRegisteredComponent(component);
  return createElement(Component, { key, ...(props ?? {}) } as ComponentPropsMap[Name]);
}

export function renderComponent(item: ComponentItem, index: number) {
  if (item.enabled === false) return null;

  return renderRegisteredComponent(
    item.component,
    item.props,
    `${item.component}-${index}`,
  );
}
