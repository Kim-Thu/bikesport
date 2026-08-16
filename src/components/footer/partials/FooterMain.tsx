import { CompanyInfo } from "@/components/company/CompanyInfo";
import { Heading } from "@/components/heading/Heading";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { Logo } from "@/components/logo/Logo";
import { CMenu } from "@/components/menu/CMenu";
import { Section } from "@/components/section/Section";
import { Social } from "@/components/social/Social";
import type { FooterSettings } from "@/interfaces/footer.interface";
import { getMenuById } from "@/lib/menu.utils";

export function FooterMain({ settings }: { settings: FooterSettings }) {
  const menuIds = settings.menuIds ?? [];

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <Row className="flex-col items-stretch gap-8 md:gap-10 xl:flex-row xl:items-start xl:gap-12">
        <Column className="w-full xl:w-auto xl:basis-112">
          <div className="space-y-4">
            <Logo href="/" />
            {settings.description ? (
              <p className="max-w-sm text-sm leading-6 text-gray-600">{settings.description}</p>
            ) : null}
            <Social />
          </div>
        </Column>

        <Column grow className="w-full">
          <Row className="flex-wrap items-start gap-x-8 gap-y-8 sm:gap-x-10 xl:justify-between">
            {menuIds.map((menuId) => {
              const menu = getMenuById(menuId);
              if (!menu) return null;

              return (
                <Column key={menuId} className="w-full sm:w-auto sm:min-w-48 sm:flex-1 xl:min-w-0">
                  <Section>
                    <Heading level={4} className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900">
                      {menu.name}
                    </Heading>
                    <CMenu
                      menuId={menuId}
                      listClassName="space-y-3 text-sm text-gray-600"
                      linkClassName="transition hover:text-blue-600 focus:text-blue-600"
                    />
                  </Section>
                </Column>
              );
            })}
          </Row>
        </Column>
      </Row>

      <div className="mt-8 border-t border-gray-100 pt-6 sm:mt-10 sm:pt-8">
        <CompanyInfo />
      </div>
    </Container>
  );
}
