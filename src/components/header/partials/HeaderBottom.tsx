import { ConfiguredComponent } from "@/components/ConfiguredComponent";
import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import type { HeaderPartialProps } from "@/interfaces/header.interface";

export function HeaderBottom({ region }: HeaderPartialProps) {
  if (!region || region.enabled === false || !region.rows?.length) return null;

  return (
    <div className="bg-white">
      <Container>
        {region.rows.map((row, rowIndex) => (
          <Row key={row.id || rowIndex}>
            {row.columns?.map((column, columnIndex) => (
              <Column key={column.id || columnIndex} grow={column.grow} className="flex items-center gap-4">
                {column.items?.map((item, itemIndex) => (
                  <ConfiguredComponent key={`${item.component}-${itemIndex}`} item={item} />
                ))}
              </Column>
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
}
