import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { isDemo } from "@/config/demo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Cursor } from "@/components/ui/Cursor";
import { MobileCta } from "@/components/layout/MobileCta";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { businessSchema, graph, personSchema, websiteSchema } from "@/lib/seo";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  // Only the cut the design uses: every display-face element is bold italic.
  weight: ["700"],
  style: ["italic"],
  display: "swap",
});

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap", preload: false });

const title = `${site.brand} · Personal Trainer in ${site.city} | ${site.gym}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.brand}` },
  description: site.description,
  keywords: [
    "personal trainer Abu Dhabi",
    "strength coach Abu Dhabi",
    "fat loss coach Abu Dhabi",
    "female personal trainer Abu Dhabi",
    "ladies personal trainer Abu Dhabi",
    "postnatal personal trainer Abu Dhabi",
    "online coaching UAE",
  ],
  authors: [{ name: site.brand, url: site.url }],
  creator: site.brand,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: site.url,
    siteName: site.brand,
    title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: isDemo
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  category: "fitness",
};

export const viewport: Viewport = {
  themeColor: "#0a0c0a",
  width: "device-width",
  initialScale: 1,
  // Needed for env(safe-area-inset-*) to report real values on iOS, so the
  // sticky mobile bar stays above the home indicator when the toolbar collapses.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${chakra.variable} ${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <DemoBanner />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Cursor />
        <MobileCta />
        <JsonLd data={graph(websiteSchema(), businessSchema(), personSchema())} />
      </body>
    </html>
  );
}
