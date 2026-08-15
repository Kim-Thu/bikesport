import { Menu, Phone, ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import { HEADER_CONTACT } from "@/config/header";

type CartActionProps = {
  count?: number;
};

const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export function MenuButton() {
  return (
    <button
      type="button"
      className={`inline-flex h-10 w-9 cursor-pointer items-center justify-center bg-transparent text-gray-900 ${focusClass}`}
      aria-label="Mở menu"
    >
      <Menu aria-hidden="true" size={30} strokeWidth={1.7} />
    </button>
  );
}

export function BrandLogo() {
  return (
    <a href="#home" className={`inline-flex items-center ${focusClass}`} aria-label="BikeSport - Trang chủ">
      <Image src="/bikesport-logo.svg" alt="BikeSport" width={160} height={40} className="h-auto w-40 max-md:w-28" priority />
    </a>
  );
}

export function Hotline() {
  return (
    <a href={HEADER_CONTACT.href} className={`flex items-center gap-2 whitespace-nowrap max-md:hidden ${focusClass}`}>
      <Phone aria-hidden="true" size={27} strokeWidth={1.7} />
      <span className="flex flex-col leading-tight max-lg:hidden">
        <span className="text-xs text-blue-600">{HEADER_CONTACT.label}</span>
        <strong className="text-sm">{HEADER_CONTACT.phone}</strong>
      </span>
    </a>
  );
}

export function AccountAction() {
  return (
    <a
      href="#account"
      className={`flex min-w-16 flex-col items-center gap-1 whitespace-nowrap text-xs font-semibold max-lg:min-w-8 ${focusClass}`}
    >
      <UserRound aria-hidden="true" size={26} strokeWidth={1.6} />
      <span className="max-lg:hidden">Tài khoản</span>
    </a>
  );
}

export function CartAction({ count = 0 }: CartActionProps) {
  return (
    <a
      href="#cart"
      className={`flex min-w-16 flex-col items-center gap-1 whitespace-nowrap text-xs font-semibold max-lg:min-w-8 ${focusClass}`}
      aria-label={`Giỏ hàng, ${count} sản phẩm`}
    >
      <span className="relative inline-flex">
        <ShoppingCart aria-hidden="true" size={28} strokeWidth={1.6} />
        {count > 0 ? (
          <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold leading-none text-white">
            {count > 99 ? "99+" : count}
          </span>
        ) : null}
      </span>
      <span className="max-lg:hidden">Giỏ hàng</span>
    </a>
  );
}
