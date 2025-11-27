import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/card-info",
        destination: "https://automerch.com.ua/api/card-info",
      },
      {
        source: "/api/payment/:id*",
        destination: "https://automerch.com.ua/api/payment/:id*",
      },
    ];
  },
};

export default nextConfig;
