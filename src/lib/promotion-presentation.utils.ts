import type { PromotionBenefit } from "@/interfaces/promotion.interface";

export function formatPromotionMoney(value: number): string {
  return `${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(value)}đ`;
}

export function getPromotionBenefitLabel(benefit?: PromotionBenefit): string | undefined {
  if (!benefit) return undefined;

  switch (benefit.type) {
    case "percentage_discount":
      return `-${benefit.percentage}%`;
    case "fixed_discount":
      return `-${formatPromotionMoney(benefit.amount)}`;
    case "voucher":
      return benefit.valueType === "percentage"
        ? `-${benefit.value}%`
        : `-${formatPromotionMoney(benefit.value)}`;
    case "buy_x_get_y":
      return `Mua ${benefit.buyQuantity} tặng ${benefit.getQuantity}`;
    case "gift":
      return `Tặng ${benefit.quantity} sản phẩm`;
    case "free_shipping":
      return "Miễn phí giao hàng";
  }
}
