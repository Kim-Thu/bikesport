import { IconList } from "@/components/list/IconList";
import type { IconListBlockPayload } from "@/interfaces/page-block.interface";

export function IconListBlock({ block }: { block: IconListBlockPayload }) {
  return <IconList items={block.props.items} layout={block.props.layout} />;
}
