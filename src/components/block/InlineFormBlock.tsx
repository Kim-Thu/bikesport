import { InlineForm } from "@/components/form/InlineForm";
import type { InlineFormBlockPayload } from "@/interfaces/page-block.interface";

export function InlineFormBlock({ block }: { block: InlineFormBlockPayload }) {
  return <InlineForm {...block.props} />;
}
