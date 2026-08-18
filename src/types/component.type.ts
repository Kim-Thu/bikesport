import type { ComponentProps as ReactComponentProps } from "react";

export interface ComponentDefinitionMap {
  announcement: typeof import("@/components/announcement/Announcement").Announcement;
  button: typeof import("@/components/button/Button").Button;
  icon: typeof import("@/components/icon/Icon").Icon;
  link: typeof import("@/components/link/CLink").CLink;
  logo: typeof import("@/components/logo/LogoLoader").LogoLoader;
  "search-form": typeof import("@/components/search/SearchForm").SearchForm;
  contact: typeof import("@/components/contact/ContactLoader").ContactLoader;
  account: typeof import("@/components/account/AccountLoader").AccountLoader;
  "mini-cart": typeof import("@/components/cart/MiniCartLoader").MiniCartLoader;
  "nav-menu": typeof import("@/components/navigation/NavMenu").NavMenu;
  "mobile-menu": typeof import("@/components/navigation/MobileMenuLoader").MobileMenuLoader;
  payment: typeof import("@/components/payment/Payment").Payment;
  social: typeof import("@/components/social/SocialLoader").SocialLoader;
}

export type ComponentName = keyof ComponentDefinitionMap;

export type ComponentPropsMap = {
  [Name in ComponentName]: ReactComponentProps<ComponentDefinitionMap[Name]>;
};

export type ComponentProps<Name extends ComponentName = ComponentName> = ComponentPropsMap[Name];