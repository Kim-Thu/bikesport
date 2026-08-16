import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { Payment } from "@/components/payment/Payment";
import wpOption from "@/data/wp-option.json";

export function FooterBottom() {
  const currentYear = new Date().getFullYear();
  const siteTitle = wpOption.site.siteTitle;

  return (
    <div className="border-t border-gray-200">
      <Container className="py-4">
        <Row className="flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Column grow className="text-xs text-gray-500">
            © {currentYear} {siteTitle}. All rights reserved.
          </Column>

          <Column className="w-full sm:w-auto">
            <Payment className="sm:justify-end" />
          </Column>
        </Row>
      </Container>
    </div>
  );
}
