export const MEDIA_CTA_CLASS = {
  surface: {
    panel: "relative overflow-hidden bg-blue-50",
    media: "absolute inset-0 h-full w-full object-cover object-right",
    overlay: "absolute inset-0 bg-linear-to-r from-blue-50 via-blue-50/95 to-transparent",
    content: "relative z-10 max-w-3xl p-4 sm:p-8",
    eyebrow: "text-xs font-bold uppercase text-blue-700",
    title: "mt-2 text-xl font-black uppercase leading-tight text-blue-700 sm:text-2xl",
    description: "mt-2 text-sm leading-relaxed text-gray-600 sm:text-base",
    action: "mt-4",
  },
  "primary-inline": {
    panel: "relative overflow-hidden border-blue-700 bg-blue-700 text-white",
    media: "absolute inset-0 h-full w-full object-cover object-right opacity-20",
    content: "relative z-10 flex flex-col gap-4 p-4 sm:p-8 lg:flex-row lg:items-center lg:justify-between",
    text: "min-w-0",
    eyebrow: "text-xs font-bold uppercase text-white/80",
    title: "text-xl font-bold leading-tight text-white sm:text-2xl",
    description: "mt-2 text-sm text-white/80 sm:text-base",
    action: "shrink-0",
  },
} as const;
