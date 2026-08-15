import type { ConfiguredComponentProps } from "@/interfaces/configured-component.interface";
import { Account } from "@/components/account/Account";
import { MiniCart } from "@/components/cart/MiniCart";
import { Contact } from "@/components/contact/Contact";
import { Logo } from "@/components/logo/Logo";
import { MenuButton } from "@/components/menu/MenuButton";
import { NavMenu } from "@/components/navigation/NavMenu";
import { Promotion } from "@/components/promotion/Promotion";
import { SearchForm } from "@/components/search/SearchForm";

export function ConfiguredComponent({ item }: ConfiguredComponentProps) {
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
