import Image from "next/image";
import { CLink } from "@/components/link/CLink";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { Logo } from "@/components/logo/Logo";
import { CMenu } from "@/components/menu/CMenu";
import { Social } from "@/components/social/Social";
import wpOption from "@/data/wp-option.json";
import type { FooterSettings } from "@/interfaces/footer.interface";

export function FooterMain({ settings }: { settings: FooterSettings }) {
  const hotline = wpOption.contact.hotline;
  const menuIds = settings.menuIds ?? [];
  const assets = (settings.assets ?? []).filter((asset) => asset.enabled !== false);

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <Row className="flex-col items-stretch gap-8 md:gap-10 lg:flex-row lg:items-start lg:gap-12">
        <Column className="w-full space-y-5 lg:w-auto lg:basis-80">
          <Logo href="/" />

          {settings.description ? (
            <p className="max-w-md text-sm leading-6 text-gray-600">{settings.description}</p>
          ) : null}

          {hotline?.value ? (
            <div className="text-sm">
              <span className="text-gray-500">{hotline.label}: </span>
              <CLink
                href={hotline.href || `tel:${hotline.value.replace(/\s+/g, "")}`}
                className="font-semibold text-gray-900"
              >
                {hotline.value}
              </CLink>
            </div>
          ) : null}

          <Social />

          {assets.length ? (
            <Row className="flex-wrap gap-4 pt-2">
              {assets.map((asset) => (
                <Image
                  key={asset.src}
                  src={asset.src}
                  alt={asset.alt}
                  width={asset.width}
                  height={asset.height}
                  className="h-auto max-h-10 w-auto object-contain"
                />
              ))}
            </Row>
          ) : null}
        </Column>

        <Column grow className="w-full">
          <Row className="flex-wrap items-start gap-x-8 gap-y-8 sm:gap-x-10 lg:justify-between">
            {menuIds.map((menuId) => (
              <Column key={menuId} className="w-full sm:w-auto sm:min-w-48 sm:flex-1 lg:min-w-0">
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
