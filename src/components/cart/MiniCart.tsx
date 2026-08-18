import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { MiniCartProps } from "@/interfaces/cart.interface";

export function MiniCart({ count = 0, cart }: MiniCartProps) {
  const { label, href } = cart;

  return (
    <CLink href={href} className="flex min-w-8 flex-col items-center gap-1 whitespace-nowrap text-xs font-semibold lg:min-w-16" aria-label={`${label}, ${count} sản phẩm`}>
      <span className="relative inline-flex">
        <Icon name="cart" size={28} strokeWidth={1.6} />
        {count > 0 ? <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold leading-none text-white">{count > 99 ? "99+" : count}</span> : null}
      </span>
      {label ? <span className="hidden lg:block">{label}</span> : null}
    </CLink>
  );
}
