import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { renderComponent } from "@/lib/component.registry";
import type { HeaderPartialProps } from "@/interfaces/header.interface";

export function HeaderBottom({ region }: HeaderPartialProps) {
  if (!region || region.enabled === false || !region.rows?.length) return null;

  return (
    <div className="bg-white">
      <Container>
        {region.rows.map((row, rowIndex) => (
          <Row key={row.id || rowIndex} className="gap-2 max-lg:py-2 lg:gap-4">
            {row.columns?.map((column, columnIndex) => (
              <Column key={column.id || columnIndex} grow={column.grow} className="flex min-w-0 items-center gap-2 lg:gap-4">
                {column.items?.map(renderComponent)}
              </Column>
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
}
