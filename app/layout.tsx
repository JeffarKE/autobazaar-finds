import type { Metadata } from "next";

import "./globals.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SiteChrome from "./components/layout/SiteChrome";
import ThemeProvider from "./components/theme/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Auto Bazaar Finds | Buy and Sell Cars in Kenya",
    template: "%s | Auto Bazaar Finds",
  },
  description:
    "Buy, sell, or source quality vehicles in Kenya with Auto Bazaar Finds.",
  applicationName: "Auto Bazaar Finds",
  category: "automotive",
  keywords: [
    "cars for sale in Kenya",
    "vehicle marketing Kenya",
    "car sourcing Kenya",
    "sell my car Kenya",
    "Auto Bazaar Finds",
  ],
  openGraph: {
    title: "Auto Bazaar Finds",
    description: "Buy, sell or find a car in Kenya with Auto Bazaar Finds.",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Bazaar Finds",
    description: "Buy, sell or find a car in Kenya with Auto Bazaar Finds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Auto Bazaar Finds",
    url: siteUrl,
    email: "autobazaarfinds@gmail.com",
    telephone: "+254741056053",
    description:
      "Vehicle marketing and sourcing service helping people buy and sell vehicles in Kenya.",
    areaServed: { "@type": "Country", name: "Kenya" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+254741056053",
      email: "autobazaarfinds@gmail.com",
      availableLanguage: ["English", "Swahili"],
    },
  };

  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
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
