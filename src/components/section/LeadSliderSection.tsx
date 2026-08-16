import { Card } from "@/components/card/Card";
import { Container } from "@/components/layout/Container";
import { ProductSlider, type ProductSliderItem } from "@/components/product/ProductSlider";
import { Section } from "@/components/section/Section";
import type { LeadSliderSectionPayload } from "@/interfaces/page.interface";
import { getProductPrimaryMediaId } from "@/lib/product.utils";
import {
  getActivePromotionById,
  getPromotionDescription,
  getPromotionProductPricing,
  getPromotionProducts,
  getPromotionTitle,
} from "@/lib/promotion.utils";

export function LeadSliderSection({ section }: { section: LeadSliderSectionPayload }) {
  const promotion = getActivePromotionById(section.props.source.promotionId);
  if (!promotion) return null;

  const products = getPromotionProducts(promotion, section.props.limit);
  if (!products.length) return null;

  const items: ProductSliderItem[] = products.map((product) => {
    const pricing = getPromotionProductPricing(product, promotion);

    return {
      _key: product.sku,
      title: product.name,
      href: `/san-pham/${product.slug}`,
      mediaId: getProductPrimaryMediaId(product),
      price: product.price,
      salePrice: pricing.salePrice,
      discountPercentage: pricing.discountPercentage,
    };
  });

  return (
    <Section className={section.props.sectionClassName}>
      <Container>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,5fr)]">
          <Card
            template={section.props.leadTemplate}
            title={getPromotionTitle(promotion)}
            description={getPromotionDescription(promotion)}
            href={promotion.display?.href ?? `/khuyen-mai/${promotion.slug}`}
            actionLabel={promotion.display?.actionLabel ?? "Xem tất cả"}
          />
          <ProductSlider
            items={items}
            template={section.props.productTemplate}
            ariaLabel={`Sản phẩm ${promotion.name}`}
            slideClassName={section.props.slideClassName}
          />
        </div>
      </Container>
    </Section>
  );
}
