import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ToastViewport } from "@/components/toast/ToastViewport";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

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
      { url: "/uploads/favicon.ico", type: "image/x-icon" },
      { url: "/uploads/favicon-196x196.png", sizes: "196x196", type: "image/png" },
      { url: "/uploads/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/uploads/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/uploads/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/uploads/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/uploads/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/uploads/apple-touch-icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/uploads/apple-touch-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/uploads/apple-touch-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/uploads/apple-touch-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/uploads/apple-touch-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/uploads/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/uploads/apple-touch-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/uploads/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={inter.className} suppressHydrationWarning>
      <body>
        {children}
        <ToastViewport />
      </body>
    </html>
  );
}
