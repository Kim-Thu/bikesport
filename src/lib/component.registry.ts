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

function assertNever(value: never): never {
  throw new Error(`Unsupported component config: ${JSON.stringify(value)}`);
}

export function renderComponent(item: ComponentItem, index: number) {
  if (item.enabled === false) return null;

  const key = `${item.component}-${index}`;

  switch (item.component) {
    case "announcement":
      return createElement(Announcement, { key, ...(item.props ?? {}) });
    case "button":
      return createElement(Button, { key, ...(item.props ?? {}) });
    case "icon":
      return createElement(Icon, { key, ...(item.props ?? {}) });
    case "link":
      return createElement(CLink, { key, ...(item.props ?? {}) });
    case "logo":
      return createElement(LogoLoader, { key, ...(item.props ?? {}) });
    case "search-form":
      return createElement(SearchForm, { key, ...(item.props ?? {}) });
    case "contact":
      return createElement(ContactLoader, { key, ...(item.props ?? {}) });
    case "account":
      return createElement(AccountLoader, { key, ...(item.props ?? {}) });
    case "mini-cart":
      return createElement(MiniCartLoader, { key, ...(item.props ?? {}) });
    case "nav-menu":
      return createElement(NavMenu, { key, ...(item.props ?? {}) });
    case "mobile-menu":
      return createElement(MobileMenuLoader, { key, ...(item.props ?? {}) });
    case "payment":
      return createElement(Payment, { key, ...(item.props ?? {}) });
    case "social":
      return createElement(SocialLoader, { key, ...(item.props ?? {}) });
    default:
      return assertNever(item);
  }
}
