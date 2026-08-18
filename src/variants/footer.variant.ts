export const FOOTER_LAYOUT_CLASS = {
  container: "py-8",
  mainRow: "flex-col items-stretch gap-8 xl:flex-row xl:items-start",
  brandColumn: "w-full xl:w-1/4",
  brandContent: "space-y-4",
  description: "max-w-sm text-sm leading-6 text-gray-600",
  menusColumn: "w-full",
  menusRow: "flex-wrap items-start gap-8 xl:justify-between",
  menuColumn: "w-full sm:flex-1",
  menuHeading: "mb-4 text-sm font-bold uppercase tracking-wide text-gray-900",
  menuList: "space-y-4 text-sm text-gray-600",
  menuLink: "transition hover:text-blue-700 focus:text-blue-700",
  companyInfo: "mt-8 border-t border-gray-100 pt-8",
} as const;
