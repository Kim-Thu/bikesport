import { BannerActions } from "@/components/banner/BannerActions";
import { BannerBackground } from "@/components/banner/BannerBackground";
import { Heading } from "@/components/heading/Heading";
import type { BannerRecord } from "@/interfaces/banner.interface";

export function CenteredBanner({ banner }: { banner: BannerRecord }) {
  const actions = banner.actions ?? [];

  return (
    <div className="relative flex aspect-hero-mobile w-full overflow-hidden rounded-xl border border-blue-100 bg-transparent sm:aspect-hero-tablet lg:aspect-8/3">
      <BannerBackground banner={banner} />

      <div className="relative z-20 flex w-full items-center justify-center p-5 text-center sm:p-7 lg:p-8">
        <div className="max-w-3xl">
          {banner.eyebrow ? (
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-800 sm:text-sm">{banner.eyebrow}</p>
          ) : null}

          {banner.title ? (
            <Heading level={1} className="text-4xl font-black uppercase leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              <span>{banner.title}</span>
              {banner.titleHighlight ? <span className="ml-2 text-blue-600">{banner.titleHighlight}</span> : null}
            </Heading>
          ) : null}

          {banner.description ? (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-700">{banner.description}</p>
          ) : null}

          <BannerActions actions={actions} align="center" />
        </div>
      </div>
    </div>
  );
}
