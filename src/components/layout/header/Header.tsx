import { HeaderMain } from "./HeaderMain";
import { HeaderNavigation } from "./HeaderNavigation";
import { PromotionBar } from "./PromotionBar";

type HeaderProps = {
  cartCount?: number;
};

export function Header({ cartCount = 2 }: HeaderProps) {
  return (
    <header id="home" className="w-full border-b border-gray-200 bg-white">
      <PromotionBar />
      <HeaderMain cartCount={cartCount} />
      <HeaderNavigation />
    </header>
  );
}
