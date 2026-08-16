import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import type { FooterSettings } from "@/interfaces/footer.interface";

export function FooterBottom({ settings }: { settings: FooterSettings }) {
  if (!settings.copyright) return null;

  return (
    <div className="border-t border-gray-200">
      <Container className="py-4">
        <Row className="items-center">
          <Column grow className="text-xs text-gray-500">
            {settings.copyright}
          </Column>
        </Row>
      </Container>
    </div>
  );
}
