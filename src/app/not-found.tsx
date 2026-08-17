import { Card } from "@/components/card/Card";
import { ActionLink } from "@/components/link/ActionLink";
import { Container } from "@/components/layout/Container";
import { MediaImage } from "@/components/media/MediaImage";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { getFeaturedCategoriesByType } from "@/lib/category.utils";

const NOT_FOUND_MEDIA_ID: string | null = null;

export default function NotFound() {
  const suggestions = getFeaturedCategoriesByType("product", 5);

  return (
    <main aria-labelledby="not-found-title" className="py-10 sm:py-14 lg:py-16">
      <Container>
        <section className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="w-full max-w-2xl">
            <MediaImage
              mediaId={NOT_FOUND_MEDIA_ID}
              alt="Minh họa trang không tồn tại"
              width={720}
              height={320}
              className="aspect-video w-full rounded-xl object-cover"
            />
          </div>

          <div className="mt-6 max-w-2xl">
            <h1 id="not-found-title" className="text-2xl font-bold text-gray-950 sm:text-3xl">
              Ôi không! Trang bạn tìm kiếm không tồn tại.
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Có thể liên kết đã bị thay đổi hoặc trang đã được di chuyển. Hãy quay về trang chủ
              hoặc tiếp tục khám phá sản phẩm phù hợp với bạn.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <ActionLink href="/" showArrow={false}>
              Về trang chủ
            </ActionLink>
            <ActionLink href="/san-pham" tone="outline" showArrow={false}>
              Tìm kiếm sản phẩm
            </ActionLink>
          </div>
        </section>

        {suggestions.length ? (
          <section aria-label="Bạn có thể quan tâm" className="mt-12 sm:mt-14">
            <SectionHeader
              title="Bạn có thể quan tâm"
              template="featured"
              className="mb-5"
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {suggestions.map((item) => (
                <Card
                  key={item._id}
                  template="media-footer"
                  title={item.name}
                  href={`/danh-muc/${item.slug}`}
                  mediaId={item.mediaId}
                />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </main>
  );
}
