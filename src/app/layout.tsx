import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { ToastViewport } from "@/components/toast/ToastViewport";
import { getHomeUrl } from "@/lib/link.utils";
import { getMediaUrl } from "@/lib/media.utils";
import { getSiteOptions } from "@/lib/options.utils";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const options = await getSiteOptions();
  const globalSeo = options.seo;
  const siteIcons = options.site.icons;
  const siteUrl = getHomeUrl();
  const metadataBase = siteUrl ? new URL(siteUrl) : undefined;
  const [faviconUrl, favicon32Url, appleTouchIconUrl, defaultOgImageUrl, defaultTwitterImageUrl] = await Promise.all([
    getMediaUrl(siteIcons.faviconMediaId),
    getMediaUrl(siteIcons.favicon32MediaId),
    getMediaUrl(siteIcons.appleTouchIconMediaId),
    getMediaUrl(globalSeo.openGraph?.defaultImageMediaId),
    getMediaUrl(globalSeo.twitter?.defaultImageMediaId),
  ]);

  return {
    metadataBase,
    title: options.site.siteTitle,
    description: globalSeo.defaultDescription,
    applicationName: options.site.siteTitle,
    robots: globalSeo.robots,
    openGraph: {
      title: options.site.siteTitle,
      description: globalSeo.defaultDescription,
      type: globalSeo.openGraph?.type,
      locale: globalSeo.openGraph?.locale,
      siteName: options.site.siteTitle,
      images: metadataBase && defaultOgImageUrl ? [{ url: defaultOgImageUrl }] : undefined,
    },
    twitter: {
      card: globalSeo.twitter?.card,
      title: options.site.siteTitle,
      description: globalSeo.defaultDescription,
      images: metadataBase && defaultTwitterImageUrl ? [defaultTwitterImageUrl] : undefined,
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
}

export async function generateViewport(): Promise<Viewport> {
  const options = await getSiteOptions();
  return { themeColor: options.site.theme.themeColor };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const options = await getSiteOptions();

  return (
    <html lang="vi" className={inter.className} suppressHydrationWarning>
      <body>
        <Header settings={options.header} />
        {children}
        <Footer settings={options.footer} />
        <ToastViewport />
      </body>
    </html>
  );
}
