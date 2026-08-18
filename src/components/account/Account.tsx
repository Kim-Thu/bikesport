import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import type { NavigationOption } from "@/interfaces/options.interface";

export function Account({ account }: { account: NavigationOption }) {
  const { label, href } = account;

  return (
    <CLink href={href} className="flex min-w-8 flex-col items-center gap-1 whitespace-nowrap text-xs font-semibold lg:min-w-16">
      <Icon name="account" size={26} strokeWidth={1.6} />
      {label ? <span className="hidden lg:block">{label}</span> : null}
    </CLink>
  );
}
