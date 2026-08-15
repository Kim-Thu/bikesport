import Link from "next/link";
import { Icon } from "@/components/icon/Icon";
import wpOption from "@/data/wp-option.json";

export function Account() {
  const { label, href } = wpOption.account;

  return (
    <Link href={href} className="flex min-w-16 flex-col items-center gap-1 whitespace-nowrap text-xs font-semibold max-lg:min-w-8">
      <Icon name="account" size={26} strokeWidth={1.6} />
      {label ? <span className="max-lg:hidden">{label}</span> : null}
    </Link>
  );
}
