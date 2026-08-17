import { MiniCart } from "@/components/cart/MiniCart";
import type { MiniCartProps } from "@/interfaces/cart.interface";
import { getSiteOptions } from "@/lib/options.utils";

type MiniCartLoaderProps = Omit<MiniCartProps, "cart">;

export async function MiniCartLoader(props: MiniCartLoaderProps) {
  const options = await getSiteOptions();
  return <MiniCart {...props} cart={options.cart} />;
}
