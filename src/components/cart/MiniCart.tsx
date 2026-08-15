import { ShoppingCart } from "lucide-react";
import type { MiniCartProps } from "@/interfaces/cart.interface";

export function MiniCart({ label = "Giỏ hàng", href = "#cart", count = 0 }: MiniCartProps) {
  return (
    <a href={href} className="flex min-w-16 flex-col items-center gap-1 whitespace-nowrap text-xs font-semibold max-lg:min-w-8" aria-label={`${label}, ${count} sản phẩm`}>
      <span className="relative inline-flex">
        <ShoppingCart aria-hidden="true" size={28} strokeWidth={1.6} />
        {count > 0 ? <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold leading-none text-white">{count > 99 ? "99+" : count}</span> : null}
      </span>
      {label ? <span className="max-lg:hidden">{label}</span> : null}
    </a>
  );
}
