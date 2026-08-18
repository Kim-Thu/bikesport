import { SectionHeader } from "@/components/section-header/SectionHeader";
import type { SectionHeaderBlockPayload } from "@/interfaces/page-block.interface";
import { cn } from "@/lib/classname.utils";

export function SectionHeaderBlock({ block }: { block: SectionHeaderBlockPayload }) {
  return <SectionHeader {...block.props} className={cn("mb-6", block.props.className)} />;
}
