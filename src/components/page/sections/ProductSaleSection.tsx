import { Card } from "@/components/card/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/section/Section";
import type { PageSectionPayload } from "@/interfaces/page.interface";
import { getFeaturedProducts, getProductDiscountPercentage, getProductPrimaryMediaId } from "@/lib/product.utils";

export function ProductSaleSection({ section }: { section: PageSectionPayload }) {
  if (section.component !== "product-sale") return null;

  const products = getFeaturedProducts(section.props.limit);

  return (
    <Section className={section.props.sectionClassName}>
      <Container>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,5fr)]">
          <Card
            template="promotion"
            title={section.props.title}
            description={section.props.description}
            href={section.props.href}
            actionLabel={section.props.actionLabel}
          />

          <div className="overflow-x-auto">
            <div className="grid min-w-max grid-flow-col auto-cols-48 gap-3 sm:auto-cols-52 lg:min-w-0 lg:grid-flow-row lg:grid-cols-5 lg:auto-cols-auto">
              {products.map((product) => (
                <Card
                  key={product._id}
                  template="product"
                  title={product.name}
                  href={`/san-pham/${product.slug}`}
                  mediaId={getProductPrimaryMediaId(product)}
                  price={product.price}
                  salePrice={product.salePrice}
                  discountPercentage={getProductDiscountPercentage(product)}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
