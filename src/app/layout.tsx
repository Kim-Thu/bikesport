import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { ToastViewport } from "@/components/toast/ToastViewport";
import { getHomeUrl } from "@/lib/link.utils";
import { getMediaUrlsByIds } from "@/lib/media.utils";
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
  const mediaIds = [
    siteIcons.faviconMediaId,
    siteIcons.favicon32MediaId,
    siteIcons.appleTouchIconMediaId,
    globalSeo.openGraph?.defaultImageMediaId,
    globalSeo.twitter?.defaultImageMediaId,
  ];
  const mediaUrlById = await getMediaUrlsByIds(mediaIds);
  const faviconUrl = siteIcons.faviconMediaId ? mediaUrlById[siteIcons.faviconMediaId] : undefined;
  const favicon32Url = siteIcons.favicon32MediaId ? mediaUrlById[siteIcons.favicon32MediaId] : undefined;
  const appleTouchIconUrl = siteIcons.appleTouchIconMediaId
    ? mediaUrlById[siteIcons.appleTouchIconMediaId]
    : undefined;
  const defaultOgImageUrl = globalSeo.openGraph?.defaultImageMediaId
    ? mediaUrlById[globalSeo.openGraph.defaultImageMediaId]
    : undefined;
  const defaultTwitterImageUrl = globalSeo.twitter?.defaultImageMediaId
    ? mediaUrlById[globalSeo.twitter.defaultImageMediaId]
    : undefined;

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
