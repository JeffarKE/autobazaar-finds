import type { Metadata, Viewport } from "next";

import "./globals.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SiteChrome from "./components/layout/SiteChrome";
import ThemeProvider from "./components/theme/ThemeProvider";
import { socialLinks } from "@/lib/site";
import {
  defaultDescription,
  serializeJsonLd,
  siteName,
  siteUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Auto Bazaar Finds | Buy and Sell Cars in Kenya",
    template: "%s | Auto Bazaar Finds",
  },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "automotive",
  classification: "Vehicle marketplace and car sourcing service",
  keywords: [
    "cars for sale in Kenya",
    "used cars for sale in Kenya",
    "cars for sale Nairobi",
    "vehicle marketing Kenya",
    "car sourcing Kenya",
    "sell my car Kenya",
    "Auto Bazaar Finds",
  ],
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Auto Bazaar Finds | Cars for Sale in Kenya",
    description: defaultDescription,
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Bazaar Finds | Cars for Sale in Kenya",
    description: defaultDescription,
  },
  other: {
    "geo.region": "KE-30",
    "geo.placename": "Nairobi",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#07110c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/favicon.ico`,
        email: "autobazaarfinds@gmail.com",
        telephone: "+254741056053",
        description: defaultDescription,
        areaServed: { "@type": "Country", name: "Kenya" },
        sameAs: Object.values(socialLinks),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+254741056053",
          email: "autobazaarfinds@gmail.com",
          areaServed: "KE",
          availableLanguage: ["English", "Swahili"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: defaultDescription,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-KE",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/cars?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html
      lang="en-KE"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(siteJsonLd),
          }}
        />
        <ThemeProvider>
          <SiteChrome
            navigation={<Navbar />}
            footer={<Footer />}
          >
            {children}
          </SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
