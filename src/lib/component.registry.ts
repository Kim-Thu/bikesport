import { createElement, type ElementType } from "react";
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
import type { ComponentName } from "@/types/component.type";

export const COMPONENT_REGISTRY: Record<ComponentName, ElementType> = {
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
};

export function renderComponent(item: ComponentItem, index: number) {
  if (item.enabled === false) return null;

  const Component = COMPONENT_REGISTRY[item.component];

  return createElement(Component, {
    key: `${item.component}-${index}`,
    ...(item.props ?? {}),
  });
}
