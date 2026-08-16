import { CLink } from "@/components/link/CLink";
import { CList } from "@/components/list/CList";
import { Heading } from "@/components/heading/Heading";
import { Section } from "@/components/section/Section";
import type { CMenuProps } from "@/interfaces/menu.interface";
import { createMenuIndex, getMenuById, getMenuHref, sortMenuItems } from "@/lib/menu.utils";

export function CMenu({
  menuId,
  title,
  headingLevel = 2,
  sectionClassName = "",
  headingClassName = "",
  listClassName = "",
  itemClassName = "",
  linkClassName = "",
  includeChildren = false,
}: CMenuProps) {
  const menu = getMenuById(menuId);

  if (!menu) return null;

  const items = includeChildren ? sortMenuItems(menu.items) : createMenuIndex(menu.items).rootItems;
  const heading = title ?? menu.name;

  return (
    <Section className={sectionClassName}>
      {heading ? (
        <Heading level={headingLevel} className={headingClassName}>
          {heading}
        </Heading>
      ) : null}
      <CList
        className={listClassName}
        itemClassName={itemClassName}
        items={items.map((item) => ({
          key: item._id,
          content: (
            <CLink href={getMenuHref(item)} className={linkClassName}>
              {item.label}
            </CLink>
          ),
        }))}
      />
    </Section>
  );
}
