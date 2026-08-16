import { BannerBackground } from "@/components/banner/BannerBackground";
import { Heading } from "@/components/heading/Heading";
import { CLink } from "@/components/link/CLink";
import type { BannerAction, BannerRecord } from "@/interfaces/banner.interface";
import { cn } from "@/lib/classname.utils";

const ACTION_CLASS: Record<NonNullable<BannerAction["variant"]>, string> = {
  primary: "border-blue-600 bg-blue-600 text-white hover:bg-blue-700",
  outline: "border-blue-600 bg-white text-blue-600 hover:bg-blue-50",
};

export function CenteredBanner({ banner }: { banner: BannerRecord }) {
  const actions = banner.actions ?? [];

  return (
    <div className="relative flex aspect-4/3 w-full overflow-hidden rounded-xl border border-blue-100 bg-transparent sm:aspect-video lg:aspect-[64/15]">
      <BannerBackground banner={banner} />

      <div className="relative z-20 flex w-full items-center justify-center p-5 text-center sm:p-7 lg:p-8">
        <div className="max-w-3xl">
          {banner.eyebrow ? (
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-800 sm:text-sm">{banner.eyebrow}</p>
          ) : null}

          {banner.title ? (
            <Heading level={1} className="text-4xl font-black uppercase leading-none tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              <span>{banner.title}</span>
              {banner.titleHighlight ? <span className="ml-2 text-blue-600">{banner.titleHighlight}</span> : null}
            </Heading>
          ) : null}

          {banner.description ? (
            <p className="mx-auto mt-3 max-w-2xl text-base font-bold uppercase text-gray-800 sm:text-lg">{banner.description}</p>
          ) : null}

          {actions.length ? (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {actions.map((action) => (
                <CLink
                  key={`${action.label}-${action.href}`}
                  href={action.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                    ACTION_CLASS[action.variant ?? "primary"],
                  )}
                >
                  {action.label}
                </CLink>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
