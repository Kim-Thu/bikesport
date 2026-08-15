export type HeaderTemplateName = "default";

export type HeaderSlotName = "top" | "main" | "bottom" | string;

export type HeaderComponentName =
  | "promotion"
  | "menu-button"
  | "logo"
  | "search-form"
  | "contact"
  | "account"
  | "mini-cart"
  | "nav-menu"
  | string;

export type HeaderComponentProps = Record<string, unknown>;
