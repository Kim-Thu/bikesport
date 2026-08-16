import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { Payment } from "@/components/payment/Payment";
import type { FooterSettings } from "@/interfaces/footer.interface";

export function FooterBottom({ settings }: { settings: FooterSettings }) {
  if (!settings.copyright) return null;

  return (
    <div className="border-t border-gray-200">
      <Container className="py-4">
        <Row className="flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Column grow className="text-xs text-gray-500">
            {settings.copyright}
          </Column>

          <Column className="w-full sm:w-auto">
            <Payment className="sm:justify-end" />
          </Column>
        </Row>
      </Container>
    </div>
  );
}
