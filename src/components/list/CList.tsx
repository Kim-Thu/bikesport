import type { CListProps } from "@/interfaces/list.interface";
import { cn } from "@/lib/classname.utils";

export function CList({ items, ordered = false, className = "", itemClassName = "" }: CListProps) {
  const List = ordered ? "ol" : "ul";

  if (!items.length) return null;

  return (
    <List className={cn(className)}>
      {items.map((item) => (
        <li key={item.key} className={cn(itemClassName, item.className)}>
          {item.content}
        </li>
      ))}
    </List>
  );
}
