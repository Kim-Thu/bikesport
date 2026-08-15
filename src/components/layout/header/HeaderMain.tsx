import { AccountAction, BrandLogo, CartAction, Hotline, MenuButton } from "./HeaderActions";
import { HeaderSearch } from "./HeaderSearch";

type HeaderMainProps = {
  cartCount?: number;
};

export function HeaderMain({ cartCount = 2 }: HeaderMainProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-2xl px-6">
        <div className="flex min-h-20 items-center gap-9 max-lg:gap-4 max-md:flex-wrap max-md:gap-3 max-md:py-3">
          <div className="flex shrink-0 items-center gap-5 max-md:gap-2">
            <MenuButton />
            <BrandLogo />
          </div>
          <HeaderSearch />
          <div className="flex shrink-0 items-center gap-8 max-lg:gap-4 max-md:ml-auto max-md:gap-3">
            <Hotline />
            <AccountAction />
            <CartAction count={cartCount} />
          </div>
        </div>
      </div>
    </div>
  );
}
