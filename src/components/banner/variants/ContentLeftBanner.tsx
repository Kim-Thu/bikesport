import { BannerActions } from "@/components/banner/BannerActions";
import { BannerBackground } from "@/components/banner/BannerBackground";
import { CLink } from "@/components/link/CLink";
import { Heading } from "@/components/heading/Heading";
import type { BannerRecord } from "@/interfaces/banner.interface";

export function ContentLeftBanner({ banner }: { banner: BannerRecord }) {
  const breadcrumbs = banner.breadcrumbs ?? [];
  const actions = banner.actions ?? [];

  return (
    <div className="relative flex min-h-72 w-full overflow-hidden rounded-xl border border-blue-100 bg-white sm:min-h-80 lg:min-h-96">
      <BannerBackground banner={banner} imageClassName="object-cover lg:object-right" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10 lg:via-white/75" />

      <div className="relative z-20 flex w-full items-center p-5 sm:p-7 lg:p-8">
        <div className="max-w-xl">
          {breadcrumbs.length ? (
            <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              {breadcrumbs.map((item, index) => (
                <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">›</span> : null}
                  {item.href ? (
                    <CLink href={item.href} className="transition-colors hover:text-blue-700">
                      {item.label}
                    </CLink>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          ) : null}

          {banner.eyebrow ? (
            <p className="mb-2 text-sm font-semibold text-gray-700">{banner.eyebrow}</p>
          ) : null}

          {banner.title ? (
            <Heading level={1} className="text-3xl font-black leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              <span className="block">{banner.title}</span>
              {banner.titleHighlight ? <span className="block text-blue-700">{banner.titleHighlight}</span> : null}
            </Heading>
          ) : null}

          {banner.description ? (
            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-700 sm:text-base">{banner.description}</p>
          ) : null}

          <BannerActions actions={actions} />
        </div>
      </div>
    </div>
  );
}
