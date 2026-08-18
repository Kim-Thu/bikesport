import Link from "next/link";
import type { CLinkProps } from "@/interfaces/link.interface";
import { cn } from "@/lib/classname.utils";
import { getLinkInfo } from "@/lib/link.utils";

export function CLink({ href, children, prefetch, target, rel, className, ...props }: CLinkProps) {
  const link = getLinkInfo(href);
  const linkClassName = cn("cursor-pointer", className);

  if (link.useNativeAnchor) {
    return (
      <a
        href={link.href}
        target={link.isExternal ? "_blank" : target}
        rel={link.isExternal ? "noopener noreferrer" : rel}
        className={linkClassName}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={link.href} prefetch={prefetch} target={target} rel={rel} className={linkClassName} {...props}>
      {children}
    </Link>
  );
}
