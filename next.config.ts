import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/browse",
        destination: "/cars",
        permanent: true,
      },
      {
        source: "/saved",
        destination: "/cars",
        permanent: false,
      },
      {
        source: "/compare",
        destination: "/cars",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pjbnvdnxazcrcubkcjmj.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default nextConfig;
