import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import type { HeaderTemplateProps } from "@/interfaces/header.interface";
import { DefaultHeaderTemplate } from "./DefaultHeaderTemplate";

const templates = {
  default: DefaultHeaderTemplate,
} as const;

export function Template({ template, settings }: HeaderTemplateProps) {
  const HeaderTemplate = templates[template as keyof typeof templates];

  if (!HeaderTemplate) return null;

  return (
    <header id="home" className="w-full border-b border-gray-200 bg-white">
      <Container className="max-w-none px-0">
        <Row className="flex-col items-stretch">
          <Column className="w-full">
            <HeaderTemplate settings={settings} />
          </Column>
        </Row>
      </Container>
    </header>
  );
}
