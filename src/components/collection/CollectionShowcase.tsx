import type { ReactNode } from "react";
import { ActionLink, type ActionLinkTone } from "@/components/link/ActionLink";
import { MediaImage } from "@/components/media/MediaImage";
import { cn } from "@/lib/classname.utils";

interface CollectionShowcaseProps {
  header?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  href?: string;
  actionLabel?: string;
  actionTone?: ActionLinkTone;
  backgroundMediaId?: string | null;
  containerClassName?: string;
  headerClassName?: string;
}

export function CollectionShowcase({
  header,
  content,
  footer,
  href,
  actionLabel = "Xem tất cả",
  actionTone = "primary",
  backgroundMediaId,
  containerClassName,
  headerClassName = "mb-5",
}: CollectionShowcaseProps) {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {backgroundMediaId !== undefined ? (
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <MediaImage
            mediaId={backgroundMediaId}
            alt=""
            width={1440}
            height={480}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="relative z-10">
        {header ? <div className={headerClassName}>{header}</div> : null}
        {content}
        {footer}
        {href ? (
          <div className="mt-6 flex justify-center">
            <ActionLink href={href} tone={actionTone}>{actionLabel}</ActionLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}
