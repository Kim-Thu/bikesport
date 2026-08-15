import { Column } from "@/components/layout/Column";
import { Container } from "@/components/layout/Container";
import { Row } from "@/components/layout/Row";
import { ComponentRenderer } from "@/components/ComponentRenderer";
import type { RegionRendererProps } from "@/interfaces/region-renderer.interface";

export function RegionRenderer({ region, rowClassName = "gap-4" }: RegionRendererProps) {
  if (region.enabled === false || !region.rows?.length) return null;

  return (
    <Container>
      {region.rows.map((row, rowIndex) => (
        <Row key={row.id || rowIndex} className={rowClassName}>
          {row.columns?.map((column, columnIndex) => (
            <Column key={column.id || columnIndex} grow={column.grow} className="flex items-center gap-4">
              {column.items?.map((item, itemIndex) => (
                <ComponentRenderer key={`${item.component}-${itemIndex}`} item={item} />
              ))}
            </Column>
          ))}
        </Row>
      ))}
    </Container>
  );
}
