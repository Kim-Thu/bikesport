export interface TabItem {
  label: string;
  value: string;
  mediaId?: string | null;
}

export interface TabTemplateProps {
  item: TabItem;
  active: boolean;
  onClick: () => void;
}
