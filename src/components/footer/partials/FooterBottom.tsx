import type { FooterSettings } from "@/interfaces/footer.interface";

export function FooterBottom({ settings }: { settings: FooterSettings }) {
  if (!settings.copyright) return null;

  return (
    <div className="border-t border-gray-200">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-4 text-xs text-gray-500 sm:px-6 lg:px-8">
        {settings.copyright}
      </div>
    </div>
  );
}
