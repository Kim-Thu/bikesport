import { notFound } from "next/navigation";
import { CardGrid } from "@/components/grid/CardGrid";
import { Container } from "@/components/layout/Container";
import { PageSections } from "@/components/page/PageSections";
import { PaginationLinks } from "@/components/pagination/PaginationLinks";
import { SearchForm } from "@/components/search/SearchForm";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section-header/SectionHeader";
import { getPublishedPageBySlug } from "@/lib/page.utils";
import {
  mapRecruitmentPostToCard,
  RECRUITMENT_PAGE_SIZE,
  searchRecruitments,
} from "@/lib/recruitment.utils";

export const revalidate = 300;

interface RecruitmentPageProps {
  searchParams: Promise<{
    q?: string | string[];
    page?: string | string[];
  }>;
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
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <SectionHeader title="Vị trí đang tuyển" />

              <div className="w-full md:max-w-2xl">
                <SearchForm
                  action="/tuyen-dung"
                  defaultValue={query}
                  placeholder="Tìm theo vị trí, phòng ban, địa điểm..."
                  submitLabel="Tìm vị trí tuyển dụng"
                />
              </div>
            </div>

            <CardGrid
              items={cards}
              template="listing"
              gridClassName="grid grid-cols-1 gap-4 lg:grid-cols-3"
            />

            <PaginationLinks
              page={page}
              totalPages={totalPages}
              pathname="/tuyen-dung"
              query={query}
            />
          </div>
        </Container>
      </Section>

      <PageSections sections={afterSections} />
    </main>
  );
}
