import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { ToastViewport } from "@/components/toast/ToastViewport";
import wpOption from "@/data/wp-option.json";
import type { FooterSettings } from "@/interfaces/footer.interface";
import type { HeaderSettings } from "@/interfaces/header.interface";
import type { SeoGlobalSettings } from "@/interfaces/seo.interface";
import { getMediaUrl } from "@/lib/media.utils";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const globalSeo = wpOption.seo as SeoGlobalSettings;
const siteIcons = wpOption.site.icons;
const faviconUrl = getMediaUrl(siteIcons.faviconMediaId);
const favicon32Url = getMediaUrl(siteIcons.favicon32MediaId);
const appleTouchIconUrl = getMediaUrl(siteIcons.appleTouchIconMediaId);
const defaultOgImageUrl = getMediaUrl(globalSeo.openGraph?.defaultImageMediaId);
const defaultTwitterImageUrl = getMediaUrl(globalSeo.twitter?.defaultImageMediaId);

export const metadata: Metadata = {
  title: wpOption.site.siteTitle,
  description: globalSeo.defaultDescription,
  applicationName: wpOption.site.siteTitle,
  robots: globalSeo.robots,
  openGraph: {
    title: wpOption.site.siteTitle,
    description: globalSeo.defaultDescription,
    type: globalSeo.openGraph?.type,
    locale: globalSeo.openGraph?.locale,
    siteName: wpOption.site.siteTitle,
    images: defaultOgImageUrl ? [{ url: defaultOgImageUrl }] : undefined,
  },
  twitter: {
    card: globalSeo.twitter?.card,
    title: wpOption.site.siteTitle,
    description: globalSeo.defaultDescription,
    images: defaultTwitterImageUrl ? [defaultTwitterImageUrl] : undefined,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      ...(faviconUrl ? [{ url: faviconUrl, type: "image/x-icon" }] : []),
      ...(favicon32Url ? [{ url: favicon32Url, sizes: "32x32", type: "image/png" }] : []),
    ],
    apple: appleTouchIconUrl
      ? [{ url: appleTouchIconUrl, sizes: "180x180", type: "image/png" }]
      : [],
  },
};

export const viewport: Viewport = {
  themeColor: wpOption.site.theme.themeColor,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={inter.className} suppressHydrationWarning>
      <body>
        <Header settings={wpOption.header as HeaderSettings} />
        {children}
        <Footer settings={wpOption.footer as FooterSettings} />
        <ToastViewport />
      </body>
    </html>
  );
}
