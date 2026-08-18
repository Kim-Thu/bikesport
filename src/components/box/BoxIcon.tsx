import { Icon } from "@/components/icon/Icon";
import { Column } from "@/components/layout/Column";
import { Row } from "@/components/layout/Row";
import type { BoxIconProps } from "@/interfaces/box-icon.interface";
import { cn } from "@/lib/classname.utils";

export function BoxIcon({
  icon,
  iconMediaUrl,
  title,
  description,
  className,
  iconClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
}: BoxIconProps) {
  return (
    <Row className={cn("gap-4", className)}>
      <Icon
        name={icon}
        mediaUrl={iconMediaUrl}
        className={cn("h-9 w-9 shrink-0", iconClassName)}
      />

      <Column grow className={contentClassName}>
        <div className={cn("text-sm font-bold uppercase leading-tight", titleClassName)}>{title}</div>
        {description ? (
          <div className={cn("mt-1 text-xs leading-snug opacity-90", descriptionClassName)}>{description}</div>
        ) : null}
      </Column>
    </Row>
  );
}
