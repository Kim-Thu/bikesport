import { CompanyInfo } from "@/components/company/CompanyInfo";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { Logo } from "@/components/logo/Logo";
import { CMenu } from "@/components/menu/CMenu";
import type { FooterSettings } from "@/interfaces/footer.interface";

export function FooterMain({ settings }: { settings: FooterSettings }) {
  const menuIds = settings.menuIds ?? [];

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <Row className="flex-col items-stretch gap-8 md:gap-10 xl:flex-row xl:items-start xl:gap-12">
        <Column className="w-full space-y-5 xl:w-auto xl:basis-96">
          <Logo href="/" />
          <CompanyInfo />
        </Column>

        <Column grow className="w-full">
          <Row className="flex-wrap items-start gap-x-8 gap-y-8 sm:gap-x-10 xl:justify-between">
            {menuIds.map((menuId) => (
              <Column key={menuId} className="w-full sm:w-auto sm:min-w-48 sm:flex-1 xl:min-w-0">
                <CMenu
                  menuId={menuId}
                  headingLevel={2}
                  headingClassName="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900"
                  listClassName="space-y-3 text-sm text-gray-600"
                  linkClassName="transition hover:text-blue-600 focus:text-blue-600"
                />
              </Column>
            ))}
          </Row>
        </Column>
      </Row>
    </Container>
  );
}
