import Link from "next/link";
import { UserRound } from "lucide-react";
import type { AccountProps } from "@/interfaces/account.interface";

export function Account({ label = "Tài khoản", href = "/account" }: AccountProps) {
  return (
    <Link href={href} className="flex min-w-16 flex-col items-center gap-1 whitespace-nowrap text-xs font-semibold max-lg:min-w-8">
      <UserRound aria-hidden="true" size={26} strokeWidth={1.6} />
      {label ? <span className="max-lg:hidden">{label}</span> : null}
    </Link>
  );
}
