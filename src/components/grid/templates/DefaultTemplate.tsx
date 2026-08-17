import type { TabsGridTemplateProps } from "@/interfaces/tabs-grid.interface";

export function DefaultTemplate({ header, grid, pagination }: TabsGridTemplateProps) {
  return (
    <>
      {header}
      {grid}
      {pagination}
    </>
  );
}
