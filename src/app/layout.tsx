import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/app/providers";
import { KixtGtm, KixtGtmNoScript } from "@/components/analytics/KixtGtm";
import { siteMetadataBase } from "@/lib/seo/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = siteMetadataBase();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark min-h-dvh antialiased`}
    >
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-slate-950 font-sans text-slate-100 antialiased">
        <KixtGtmNoScript />
        <KixtGtm />
        <Providers>{children}</Providers>
        <div
          id="puretext-portal-root"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] [&>*]:pointer-events-auto"
        />
      </body>
    </html>
  );
}