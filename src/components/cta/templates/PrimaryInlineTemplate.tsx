import { ActionLink } from "@/components/link/ActionLink";
import { MediaImage } from "@/components/media/MediaImage";
import { Panel } from "@/components/panel/Panel";
import type { MediaCtaProps } from "@/interfaces/media-cta.interface";
import { MEDIA_CTA_CLASS } from "@/variants/media-cta.variant";

export function PrimaryInlineTemplate({
  eyebrow,
  title,
  description,
  href,
  actionLabel = "Xem thêm",
  mediaId,
}: MediaCtaProps) {
  const styles = MEDIA_CTA_CLASS["primary-inline"];

  return (
    <Panel className={styles.panel}>
      <MediaImage mediaId={mediaId} alt="" className={styles.media} />
      <div className={styles.content}>
        <div className={styles.text}>
          {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
          <div className={styles.title}>{title}</div>
          {description ? <div className={styles.description}>{description}</div> : null}
        </div>
        <ActionLink href={href} tone="outline" size="md" className={styles.action} showArrow>
          {actionLabel}
        </ActionLink>
      </div>
    </Panel>
  );
}
