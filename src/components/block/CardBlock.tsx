import { Card } from "@/components/card/Card";
import type { CardBlockPayload } from "@/interfaces/page-block.interface";
import { getActiveCampaignById } from "@/lib/campaign.utils";
import {
  getActivePromotionById,
  getPromotionDescription,
  getPromotionTitle,
} from "@/lib/promotion.utils";

export function CardBlock({ block }: { block: CardBlockPayload }) {
  if (block.props.source.type === "campaign") {
    const campaign = getActiveCampaignById(block.props.source.campaignId);
    if (!campaign) return null;

    return (
      <Card
        template={block.props.template}
        title={campaign.display.title ?? campaign.name}
        description={campaign.display.subtitle ?? campaign.description ?? undefined}
        href={campaign.display.href ?? `/khuyen-mai/${campaign.slug}`}
        actionLabel={campaign.display.actionLabel ?? "Khám phá"}
        mediaId={campaign.display.mediaId}
      />
    );
  }

  const promotion = getActivePromotionById(block.props.source.promotionId);
  if (!promotion) return null;

  return (
    <Card
      template={block.props.template}
      title={getPromotionTitle(promotion)}
      description={getPromotionDescription(promotion)}
      href={promotion.display?.href ?? `/khuyen-mai/${promotion.slug}`}
      actionLabel={promotion.display?.actionLabel ?? "Xem tất cả"}
    />
  );
}
