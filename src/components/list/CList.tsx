import type { CListProps } from "@/interfaces/list.interface";

export function CList({ items, ordered = false, className = "", itemClassName = "" }: CListProps) {
  const List = ordered ? "ol" : "ul";

  if (!items.length) return null;

  return (
    <List className={className}>
      {items.map((item) => (
        <li key={item.key} className={`${itemClassName} ${item.className ?? ""}`.trim()}>
          {item.content}
        </li>
      ))}
    </List>
  );
}
