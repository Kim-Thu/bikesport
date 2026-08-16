export type CardTemplate = "category";

export interface CardProps {
  title: string;
  href: string;
  mediaId?: string | null;
  template?: CardTemplate;
  className?: string;
}
