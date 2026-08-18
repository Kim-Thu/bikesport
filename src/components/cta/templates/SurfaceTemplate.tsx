import { ActionLink } from "@/components/link/ActionLink";
import { MediaImage } from "@/components/media/MediaImage";
import { Panel } from "@/components/panel/Panel";
import type { MediaCtaProps } from "@/interfaces/media-cta.interface";
import { MEDIA_CTA_CLASS } from "@/variants/media-cta.variant";

export function SurfaceTemplate({
  eyebrow,
  title,
  description,
  href,
  actionLabel = "Xem thêm",
  mediaId,
}: MediaCtaProps) {
  const styles = MEDIA_CTA_CLASS.surface;

  return (
    <Panel className={styles.panel}>
      <MediaImage mediaId={mediaId} alt="" className={styles.media} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
        <div className={styles.title}>{title}</div>
        {description ? <div className={styles.description}>{description}</div> : null}
        <ActionLink href={href} size="sm" showArrow={false} className={styles.action}>
          {actionLabel}
        </ActionLink>
      </div>
    </Panel>
  );
}
