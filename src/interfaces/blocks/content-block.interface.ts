import type { IconListProps } from "@/interfaces/icon-list.interface";
import type { SectionHeaderProps } from "@/interfaces/section-header.interface";
import type { PageBlockBase } from "@/interfaces/blocks/page-block-base.interface";

export interface IconListBlockPayload extends PageBlockBase {
  component: "icon-list";
  props: IconListProps;
}

export interface InlineFormBlockPayload extends PageBlockBase {
  component: "inline-form";
  props: {
    title: string;
    description?: string;
    placeholder?: string;
    actionLabel?: string;
    inputType?: "email" | "text";
  };
}

export interface SectionHeaderBlockPayload extends PageBlockBase {
  component: "section-header";
  props: SectionHeaderProps;
}

export interface ContentBlockPayload extends PageBlockBase {
  component: "content";
  props: {
    eyebrow?: string;
    title?: string;
    paragraphs?: string[];
    align?: "left" | "center" | "right";
    className?: string;
  };
}

export interface TimelineBlockPayload extends PageBlockBase {
  component: "timeline";
  props: {
    className?: string;
    items: Array<{
      label: string;
      title: string;
      description?: string;
      mediaId?: string | null;
      mediaAlt?: string;
    }>;
  };
}
