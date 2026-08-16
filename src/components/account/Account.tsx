import Link from "next/link";
import { Icon } from "@/components/icon/Icon";
import wpOption from "@/data/wp-option.json";

export function Account() {
  const { label, href } = wpOption.account;

  return (
    <Link href={href} className="flex min-w-8 flex-col items-center gap-1 whitespace-nowrap text-xs font-semibold lg:min-w-16">
      <Icon name="account" size={26} strokeWidth={1.6} />
      {label ? <span className="hidden lg:block">{label}</span> : null}
    </Link>
  );
}
