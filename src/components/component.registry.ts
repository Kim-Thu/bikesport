import type { ElementType } from "react";
import { Account } from "@/components/account/Account";
import { MiniCart } from "@/components/cart/MiniCart";
import { Contact } from "@/components/contact/Contact";
import { Logo } from "@/components/logo/Logo";
import { MenuButton } from "@/components/menu/MenuButton";
import { NavMenu } from "@/components/navigation/NavMenu";
import { Promotion } from "@/components/promotion/Promotion";
import { SearchForm } from "@/components/search/SearchForm";
import type { ComponentName } from "@/types/component.type";

export const COMPONENT_REGISTRY: Record<string, ElementType> = {
  promotion: Promotion,
  "menu-button": MenuButton,
  logo: Logo,
  "search-form": SearchForm,
  contact: Contact,
  account: Account,
  "mini-cart": MiniCart,
  "nav-menu": NavMenu,
};

export function getComponent(name: ComponentName) {
  return COMPONENT_REGISTRY[name];
}
