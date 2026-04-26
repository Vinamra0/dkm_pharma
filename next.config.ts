import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendTarget = process.env.BACKEND_PROXY_TARGET || "http://localhost:3001";

    return [
      {
        source: "/backend/api/:path*",
        destination: `${backendTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
