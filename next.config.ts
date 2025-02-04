import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/*",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/",
      },
      {
        source: "/terms-of-service",
        destination: "/terms-of-service.html",
      },
      {
        source: "/privacy-policy",
        destination: "/privacy-policy.html",
      },
    ];
  },
} satisfies NextConfig;

export default nextConfig;
