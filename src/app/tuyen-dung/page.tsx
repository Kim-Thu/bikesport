import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardGrid } from "@/components/grid/CardGrid";
import { Container } from "@/components/layout/Container";
import { PageSections } from "@/components/page/PageSections";
import { Pagination } from "@/components/pagination/Pagination";
import { LiveSearchForm } from "@/components/search/LiveSearchForm";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { getPublishedPageBySlug } from "@/lib/page.utils";
import {
  mapRecruitmentPostToCard,
  RECRUITMENT_PAGE_SIZE,
  searchRecruitments,
} from "@/lib/recruitment.utils";
import { resolveSeoMetadata } from "@/lib/seo.utils";

export const revalidate = 300;

const OPEN_POSITIONS_ANCHOR = "vi-tri-dang-tuyen";

interface RecruitmentPageProps {
  searchParams: Promise<{
    q?: string | string[];
    page?: string | string[];
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const pageRecord = await getPublishedPageBySlug("tuyen-dung");
  return resolveSeoMetadata({
    path: "/tuyen-dung",
    objectType: "page",
    objectId: pageRecord?._id,
    title: pageRecord?.title ?? "Tuyển dụng",
  });
}

function getSingleSearchParam(value?: string | string[]): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function parsePage(value?: string | string[]): number {
  const parsed = Number.parseInt(getSingleSearchParam(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export default async function RecruitmentPage({ searchParams }: RecruitmentPageProps) {
  const [pageRecord, resolvedSearchParams] = await Promise.all([
    getPublishedPageBySlug("tuyen-dung"),
    searchParams,
  ]);

  if (!pageRecord) notFound();

  const query = getSingleSearchParam(resolvedSearchParams.q).trim();
  const requestedPage = parsePage(resolvedSearchParams.page);
  const result = await searchRecruitments(query, requestedPage);
  const totalPages = Math.max(1, Math.ceil(result.total / RECRUITMENT_PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const normalizedResult = page === requestedPage
    ? result
    : await searchRecruitments(query, page);
  const cards = normalizedResult.items.map(mapRecruitmentPostToCard);

  const openPositionsIndex = pageRecord.payload.sections.findIndex(
    (section) => section.name === "Open positions",
  );
  const beforeSections = openPositionsIndex >= 0
    ? pageRecord.payload.sections.slice(0, openPositionsIndex)
    : pageRecord.payload.sections;
  const afterSections = openPositionsIndex >= 0
    ? pageRecord.payload.sections.slice(openPositionsIndex + 1)
    : [];

  return (
    <main aria-label={pageRecord.title}>
      <PageSections sections={beforeSections} />

      <Section>
        <Container>
          <div id={OPEN_POSITIONS_ANCHOR} className="scroll-mt-24 flex flex-col gap-8">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <SectionHeader title="Vị trí đang tuyển" />

              <div className="w-full md:max-w-2xl">
                <LiveSearchForm
                  key={query}
                  defaultValue={query}
                  placeholder="Tìm theo vị trí, phòng ban, địa điểm..."
                  submitLabel="Tìm vị trí tuyển dụng"
                  anchor={OPEN_POSITIONS_ANCHOR}
                />
              </div>
            </div>

            <CardGrid
              items={cards}
              template="listing"
              gridClassName="grid grid-cols-1 gap-4 lg:grid-cols-3"
            />

            <Pagination
              variant="numbered"
              page={page}
              totalPages={totalPages}
              pathname="/tuyen-dung"
              query={query}
              anchor={OPEN_POSITIONS_ANCHOR}
            />
          </div>
        </Container>
      </Section>

      <PageSections sections={afterSections} />
    </main>
  );
}
