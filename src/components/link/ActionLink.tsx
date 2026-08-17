import type { ReactNode } from "react";
import { Icon } from "@/components/icon/Icon";
import { CLink } from "@/components/link/CLink";
import { cn } from "@/lib/classname.utils";
import type { ActionLinkTone } from "@/variants/action-link.variant";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  tone?: ActionLinkTone;
  className?: string;
  showArrow?: boolean;
}

const TONES: Record<ActionLinkTone, string> = {
  primary: "bg-blue-600 hover:bg-blue-700",
  danger: "bg-red-500 hover:bg-red-600",
};

export function ActionLink({
  href,
  children,
  tone = "primary",
  className,
  showArrow = true,
}: ActionLinkProps) {
  return (
    <CLink
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white",
        TONES[tone],
        className,
      )}
    >
      <span>{children}</span>
      {showArrow ? <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} /> : null}
    </CLink>
  );
}
