import { Card } from "@/components/card/Card";
import type { CardBlockPayload } from "@/interfaces/page-block.interface";
import {
  getActivePromotionById,
  getPromotionDescription,
  getPromotionTitle,
} from "@/lib/promotion.utils";

export function CardBlock({ block }: { block: CardBlockPayload }) {
  if (block.props.source.type !== "promotion") return null;

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
