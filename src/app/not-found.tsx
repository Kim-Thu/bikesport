import { CardGrid } from "@/components/grid/CardGrid";
import { ActionLink } from "@/components/link/ActionLink";
import { Container } from "@/components/layout/Container";
import { MediaImage } from "@/components/media/MediaImage";
import { getCardGridItems } from "@/lib/card-grid-source.utils";

const NOT_FOUND_MEDIA_ID: string | null = null;

export default async function NotFound() {
  const suggestions = await getCardGridItems({ type: "category", categoryType: "product", limit: 5 });

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

        <section aria-label="Bạn có thể quan tâm" className="mt-12 sm:mt-14">
          <CardGrid
            items={suggestions}
            template="media-footer"
            title="Bạn có thể quan tâm"
            headingTemplate="featured"
            defaultGridClassName="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-flow-col lg:grid-cols-none lg:auto-cols-fr"
          />
        </section>
      </Container>
    </main>
  );
}
