import type { Metadata } from "next";

import "./globals.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export const metadata: Metadata = {
  title: "Auto Baazar Finds",
  description: "Find your next vehicle with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
