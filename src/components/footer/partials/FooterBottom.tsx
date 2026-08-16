import Image from "next/image";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import type { FooterSettings } from "@/interfaces/footer.interface";

export function FooterBottom({ settings }: { settings: FooterSettings }) {
  const assets = (settings.assets ?? []).filter((asset) => asset.enabled !== false);

  if (!settings.copyright && !assets.length) return null;

  return (
    <div className="border-t border-gray-200">
      <Container className="py-4">
        <Row className="flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Column grow className="text-xs text-gray-500">
            {settings.copyright}
          </Column>

          {assets.length ? (
            <Column className="w-full sm:w-auto">
              <Row className="flex-wrap gap-3 sm:justify-end">
                {assets.map((asset) => (
                  <Image
                    key={asset.src}
                    src={asset.src}
                    alt={asset.alt}
                    width={asset.width}
                    height={asset.height}
                    className="h-auto max-h-8 w-auto object-contain sm:max-h-9"
                  />
                ))}
              </Row>
            </Column>
          ) : null}
        </Row>
      </Container>
    </div>
  );
}
