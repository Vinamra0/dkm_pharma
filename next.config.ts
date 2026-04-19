import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendTarget = process.env.BACKEND_PROXY_TARGET || "http://localhost:3001";

    return [
      {
        source: "/backend/api/auth/:path*",
        destination: `${backendTarget}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
