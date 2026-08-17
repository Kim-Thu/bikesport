export interface SkeletonProps {
  className?: string;
}

export type CardSkeletonTemplate = "product" | "category" | "content";

export interface CardSkeletonProps {
  template?: CardSkeletonTemplate;
  className?: string;
}

export interface SectionSkeletonProps {
  template?: CardSkeletonTemplate;
  itemCount?: number;
  className?: string;
}
