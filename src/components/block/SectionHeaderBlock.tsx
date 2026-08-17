import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { SectionHeaderBlockPayload } from "@/interfaces/page-block.interface";

export function SectionHeaderBlock({ block }: { block: SectionHeaderBlockPayload }) {
  return <SectionHeader {...block.props} />;
}
