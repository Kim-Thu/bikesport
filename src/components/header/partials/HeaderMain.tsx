import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { renderComponent } from "@/lib/component.registry";
import type { HeaderPartialProps } from "@/interfaces/header.interface";

export function HeaderMain({ region }: HeaderPartialProps) {
  if (!region || region.enabled === false || !region.rows?.length) return null;

  return (
    <div className="bg-white">
      <Container>
        {region.rows.map((row, rowIndex) => (
          <Row key={row.id || rowIndex} className="min-h-20 gap-9 max-lg:gap-4 max-md:flex-wrap max-md:gap-3 max-md:py-3">
            {row.columns?.map((column, columnIndex) => {
              const columnClass = columnIndex === 1
                ? "hidden items-center gap-4 lg:flex lg:w-1/2 lg:flex-none xl:w-2/5"
                : "flex items-center gap-4";

              return (
                <Column key={column.id || columnIndex} grow={column.grow} className={columnClass}>
                  {column.items?.map(renderComponent)}
                </Column>
              );
            })}
          </Row>
        ))}
      </Container>
    </div>
  );
}
