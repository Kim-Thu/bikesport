import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { Heading } from "@/components/heading/Heading";
import { Container } from "@/components/layout/Container";
import { CLink } from "@/components/link/CLink";
import { Panel } from "@/components/panel/Panel";
import {
  getActivePromotions,
  getPromotionDescription,
  getPromotionProducts,
  getPromotionTitle,
} from "@/lib/promotion.utils";
import { resolveSeoMetadata } from "@/lib/seo.utils";

export const revalidate = 300;
export const dynamicParams = false;

async function getActivePromotionBySlug(slug: string) {
  const promotions = await getActivePromotions();
  return promotions.find((promotion) => promotion.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const promotions = await getActivePromotions();
  return promotions.map((promotion) => ({ slug: promotion.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const promotion = await getActivePromotionBySlug(slug);
  if (!promotion) return {};

  return resolveSeoMetadata({
    path: `/khuyen-mai/${promotion.slug}`,
    objectType: "custom",
    objectId: promotion._id,
    title: getPromotionTitle(promotion),
    description: getPromotionDescription(promotion) ?? promotion.name,
  });
}

export default async function PromotionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const promotion = await getActivePromotionBySlug(slug);
  if (!promotion) notFound();

  const products = await getPromotionProducts(promotion);
  const description = getPromotionDescription(promotion);

  return (
    <main aria-label={`Khuyến mãi ${promotion.name}`}>
      <Container className="space-y-8 py-8">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Khuyến mãi", href: "/khuyen-mai" },
            { label: promotion.name },
          ]}
        />

        <div className="space-y-4">
          <Heading level={1} className="text-2xl font-bold text-gray-950 sm:text-3xl">
            {getPromotionTitle(promotion)}
          </Heading>
          {description ? <p className="text-base text-gray-700">{description}</p> : null}
        </div>

        {products.length ? (
          <Panel className="p-8">
            <div className="space-y-4">
              <Heading level={2} className="text-xl font-bold text-gray-950">
                Sản phẩm áp dụng
              </Heading>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <li key={product._id}>
                    <CLink
                      href={`/san-pham/${product.slug}`}
                      className="font-semibold text-blue-700 underline-offset-4 hover:underline"
                    >
                      {product.name}
                    </CLink>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        ) : null}
      </Container>
    </main>
  );
}
