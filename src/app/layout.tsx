import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ToastViewport } from "@/components/toast/ToastViewport";
import { getMediaUrl } from "@/lib/media.utils";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const faviconUrl = getMediaUrl("66bf4e8c9f2a4d7b8c1e3708");
const favicon32Url = getMediaUrl("66bf4e8c9f2a4d7b8c1e3709");
const appleTouchIconUrl = getMediaUrl("66bf4e8c9f2a4d7b8c1e3710");

export const metadata: Metadata = {
  title: "Bike Sport",
  description: "",
  applicationName: "Bike Sport",
  openGraph: {
    title: "Bike Sport",
    description: "",
    type: "website",
  },
  manifest: "/uploads/site.webmanifest",
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
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={inter.className}>
      <body>
        {children}
        <ToastViewport />
      </body>
    </html>
  );
}
