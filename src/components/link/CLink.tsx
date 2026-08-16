import Link from "next/link";
import type { CLinkProps } from "@/interfaces/link.interface";
import { getLinkInfo } from "@/lib/link.utils";

export function CLink({ href, children, prefetch, target, rel, ...props }: CLinkProps) {
  const link = getLinkInfo(href);

  if (link.useNativeAnchor) {
    return (
      <a
        href={link.href}
        target={link.isExternal ? "_blank" : target}
        rel={link.isExternal ? "noopener noreferrer" : rel}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={link.href} prefetch={prefetch} target={target} rel={rel} {...props}>
      {children}
    </Link>
  );
}
