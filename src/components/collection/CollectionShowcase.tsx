import type { ReactNode } from "react";
import { ActionLink } from "@/components/link/ActionLink";
import { MediaImageView } from "@/components/media/MediaImageView";
import type { MediaItem } from "@/interfaces/media.interface";
import { cn } from "@/lib/classname.utils";
import type { ActionLinkTone } from "@/variants/action-link.variant";

interface CollectionShowcaseProps {
  header?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  href?: string;
  actionLabel?: string;
  actionTone?: ActionLinkTone;
  backgroundMedia?: MediaItem | null;
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
  backgroundMedia,
  containerClassName,
  headerClassName = "mb-4",
}: CollectionShowcaseProps) {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {backgroundMedia ? (
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <MediaImageView
            media={backgroundMedia}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="relative z-10">
        {header ? <div className={headerClassName}>{header}</div> : null}
        {content}
        {footer}
        {href ? (
          <div className="mt-8 flex justify-center">
            <ActionLink href={href} tone={actionTone}>{actionLabel}</ActionLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}
