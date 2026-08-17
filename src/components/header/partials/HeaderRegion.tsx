import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import type { HeaderPartialProps } from "@/interfaces/header.interface";
import { cn } from "@/lib/classname.utils";
import { renderComponent } from "@/lib/component.registry";

interface HeaderRegionProps extends HeaderPartialProps {
  className?: string;
}

export function HeaderRegion({ region, className }: HeaderRegionProps) {
  if (!region || region.enabled === false || !region.rows?.length) return null;

  return (
    <div className={cn(className)}>
      <Container>
        {region.rows.map((row, rowIndex) => (
          <Row key={row.id || rowIndex} className={row.className}>
            {row.columns?.map((column, columnIndex) => (
              <Column
                key={column.id || columnIndex}
                grow={column.grow}
                className={column.className}
              >
                {column.items?.map(renderComponent)}
              </Column>
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
}
