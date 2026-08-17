import type { ContentBlockPayload } from "@/interfaces/page-block.interface";
import { cn } from "@/lib/classname.utils";

const alignmentClassMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export function ContentBlock({ block }: { block: ContentBlockPayload }) {
  const alignment = block.props.align ?? "left";

  return (
    <div
      className={cn(
        "w-full",
        alignmentClassMap[alignment],
        alignment === "center" && "mx-auto max-w-4xl",
        block.props.className,
      )}
    >
      {block.props.eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
          {block.props.eyebrow}
        </p>
      ) : null}

      {block.props.title ? (
        <h2 className="text-xl font-bold uppercase text-gray-950 sm:text-2xl">
          {block.props.title}
        </h2>
      ) : null}

      {block.props.paragraphs?.length ? (
        <div className={cn("space-y-3 text-sm leading-7 text-gray-600 sm:text-base", block.props.title && "mt-4")}>
          {block.props.paragraphs.map((paragraph, index) => (
            <p key={`${block._id}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
