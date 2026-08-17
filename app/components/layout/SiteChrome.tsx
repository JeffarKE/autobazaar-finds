"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function SiteChrome({
  children,
  navigation,
  footer,
}: {
  children: ReactNode;
  navigation: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const isAdminArea = pathname.startsWith("/admin");

  if (isAdminArea) return children;

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-xl bg-emerald-400 px-4 py-3 font-bold text-emerald-950 shadow-xl transition focus:translate-y-0"
      >
        Skip to main content
      </a>
      {navigation}
      <div id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </div>
      {footer}
    </>
  );
}
