import { createElement, type ElementType } from "react";
import { Account } from "@/components/account/Account";
import { Announcement } from "@/components/announcement/Announcement";
import { Button } from "@/components/button/Button";
import { MiniCart } from "@/components/cart/MiniCart";
import { Contact } from "@/components/contact/Contact";
import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { Logo } from "@/components/logo/Logo";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { NavMenu } from "@/components/navigation/NavMenu";
import { Payment } from "@/components/payment/Payment";
import { SearchForm } from "@/components/search/SearchForm";
import { Social } from "@/components/social/Social";
import type { ComponentItem } from "@/interfaces/component.interface";

export const COMPONENT_REGISTRY: Record<string, ElementType> = {
  announcement: Announcement,
  button: Button,
  icon: Icon,
  link: CLink,
  logo: Logo,
  "search-form": SearchForm,
  contact: Contact,
  account: Account,
  "mini-cart": MiniCart,
  "nav-menu": NavMenu,
  "mobile-menu": MobileMenu,
  payment: Payment,
  social: Social,
};

export function renderComponent(item: ComponentItem, index: number) {
  if (item.enabled === false) return null;

  const Component = COMPONENT_REGISTRY[item.component];
  if (!Component) return null;

  return createElement(Component, {
    key: `${item.component}-${index}`,
    ...(item.props ?? {}),
  });
}
