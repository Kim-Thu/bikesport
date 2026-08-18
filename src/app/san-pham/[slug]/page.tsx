import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { Heading } from "@/components/heading/Heading";
import { Container } from "@/components/layout/Container";
import { MediaImage } from "@/components/media/MediaImage";
import { Panel } from "@/components/panel/Panel";
import { Price } from "@/components/price/Price";
import { getBrandById } from "@/lib/brand.utils";
import {
  getProductPrimaryMediaId,
  getPublishedProductBySlug,
  getPublishedProducts,
} from "@/lib/product.utils";
import { resolveSeoMetadata } from "@/lib/seo.utils";

export const revalidate = 300;
export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getPublishedProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  if (!product) return {};

  return resolveSeoMetadata({
    path: `/san-pham/${product.slug}`,
    objectType: "product",
    objectId: product._id,
    title: product.name,
    description: `${product.name} - mã sản phẩm ${product.sku} tại BikeSport.`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  if (!product) notFound();

  const brand = product.brandId ? await getBrandById(product.brandId) : null;
  const mediaId = getProductPrimaryMediaId(product);

  return (
    <main aria-label={`Sản phẩm ${product.name}`}>
      <Container className="space-y-8 py-8">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Sản phẩm" },
            { label: product.name },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Panel padding="comfortable">
            <div className="flex min-h-64 items-center justify-center">
              <MediaImage
                mediaId={mediaId}
                alt={product.name}
                className="h-auto max-h-128 w-auto max-w-full object-contain"
              />
            </div>
          </Panel>

          <div className="space-y-8">
            <div className="space-y-4">
              {brand ? <p className="text-sm font-semibold uppercase text-gray-600">{brand.name}</p> : null}
              <Heading level={1} className="text-2xl font-bold text-gray-950 sm:text-3xl">
                {product.name}
              </Heading>
              <p className="text-sm text-gray-600">SKU: {product.sku}</p>
            </div>

            <Price price={product.price} salePrice={product.salePrice} />

            <Panel padding="compact">
              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <dt className="text-sm font-medium text-gray-600">Tình trạng</dt>
                  <dd className="font-semibold text-gray-950">
                    {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
                  </dd>
                </div>
                {brand ? (
                  <div className="space-y-2">
                    <dt className="text-sm font-medium text-gray-600">Thương hiệu</dt>
                    <dd className="font-semibold text-gray-950">{brand.name}</dd>
                  </div>
                ) : null}
              </dl>
            </Panel>
          </div>
        </div>
      </Container>
    </main>
  );
}
