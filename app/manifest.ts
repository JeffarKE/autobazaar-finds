import type { MetadataRoute } from "next";

import { defaultDescription, siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} — Cars in Kenya`,
    short_name: siteName,
    description: defaultDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4f7f5",
    theme_color: "#07110c",
    categories: ["automotive", "shopping"],
    lang: "en-KE",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
