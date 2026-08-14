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
      {navigation}
      <div className="flex-1">{children}</div>
      {footer}
    </>
  );
}
