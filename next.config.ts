import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placedog.net",
        pathname: "/500/500",
      },
    ],
  },
};

export default nextConfig;
