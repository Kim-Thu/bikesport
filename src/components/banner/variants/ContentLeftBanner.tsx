import { BannerActions } from "@/components/banner/BannerActions";
import { BannerBackground } from "@/components/banner/BannerBackground";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { Heading } from "@/components/heading/Heading";
import type { BannerRecord } from "@/interfaces/banner.interface";
import { cn } from "@/lib/classname.utils";
import { resolveBannerSizeClass } from "@/variants/banner.variant";

export function ContentLeftBanner({ banner }: { banner: BannerRecord }) {
  const breadcrumbs = banner.breadcrumbs ?? [];
  const actions = banner.actions ?? [];

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden rounded-xl border border-blue-100 bg-white",
        resolveBannerSizeClass(banner.size ?? "page"),
      )}
    >
      <BannerBackground banner={banner} imageClassName="object-cover lg:object-right" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10 lg:via-white/75" />

      <div className="relative z-20 flex w-full items-center p-4 lg:p-8">
        <div className="max-w-xl">
          <Breadcrumb items={breadcrumbs} className="mb-4 gap-2 text-xs" />

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
