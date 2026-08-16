import Image from "next/image";
import { CLink } from "@/components/link/CLink";
import { Logo } from "@/components/logo/Logo";
import { Social } from "@/components/social/Social";
import wpOption from "@/data/wp-option.json";
import type { FooterSettings } from "@/interfaces/footer.interface";
import { getMenuById, getMenuHref } from "@/lib/menu.utils";

export function FooterMain({ settings }: { settings: FooterSettings }) {
  const hotline = wpOption.contact.hotline;
  const menus = (settings.menuIds ?? []).map(getMenuById).filter(Boolean);
  const assets = (settings.assets ?? []).filter((asset) => asset.enabled !== false);

  return (
    <div className="mx-auto grid w-full max-w-screen-2xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_2fr] lg:px-8 lg:py-12">
      <div className="space-y-5">
        <Logo href="/" />
        {settings.description ? <p className="max-w-md text-sm leading-6 text-gray-600">{settings.description}</p> : null}

        {hotline?.value ? (
          <div className="text-sm">
            <span className="text-gray-500">{hotline.label}: </span>
            <CLink href={hotline.href || `tel:${hotline.value.replace(/\s+/g, "")}`} className="font-semibold text-gray-900">
              {hotline.value}
            </CLink>
          </div>
        ) : null}

        <Social />

        {assets.length ? (
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {assets.map((asset) => (
              <Image
                key={asset.src}
                src={asset.src}
                alt={asset.alt}
                width={asset.width}
                height={asset.height}
                className="h-auto max-h-10 w-auto object-contain"
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {menus.map((menu) => {
          if (!menu) return null;
          const items = menu.items.filter((item) => !item.parentId).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

          return (
            <section key={menu._id}>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900">{menu.name}</h2>
              <ul className="space-y-3 text-sm text-gray-600">
                {items.map((item) => (
                  <li key={item._id}>
                    <CLink href={getMenuHref(item)} className="transition hover:text-blue-600 focus:text-blue-600">
                      {item.label}
                    </CLink>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
