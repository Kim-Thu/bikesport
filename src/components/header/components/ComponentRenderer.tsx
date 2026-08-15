import type { HeaderItem } from "../interfaces/header.interface";
import { Account } from "./Account";
import { Contact } from "./Contact";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { MiniCart } from "./MiniCart";
import { NavMenu } from "./NavMenu";
import { Promotion } from "./Promotion";
import { SearchForm } from "./SearchForm";

interface ComponentRendererProps {
  item: HeaderItem;
}

export function ComponentRenderer({ item }: ComponentRendererProps) {
  if (item.enabled === false) return null;

  const props = item.props ?? {};

  switch (item.component) {
    case "promotion":
      return <Promotion {...(props as Parameters<typeof Promotion>[0])} />;
    case "menu-button":
      return <MenuButton />;
    case "logo":
      return <Logo {...(props as Parameters<typeof Logo>[0])} />;
    case "search-form":
      return <SearchForm {...(props as Parameters<typeof SearchForm>[0])} />;
    case "contact":
      return <Contact {...(props as Parameters<typeof Contact>[0])} />;
    case "account":
      return <Account {...(props as Parameters<typeof Account>[0])} />;
    case "mini-cart":
      return <MiniCart {...(props as Parameters<typeof MiniCart>[0])} />;
    case "nav-menu":
      return <NavMenu {...(props as Parameters<typeof NavMenu>[0])} />;
    default:
      return null;
  }
}
