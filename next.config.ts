import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow next/image to load from any HTTPS host (covers Render, S3, CDN, etc.)
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  async rewrites() {
    // Use NEXT_PUBLIC_API_BASE first (set in Vercel env), fall back to BACKEND_PROXY_TARGET,
    // then localhost for local dev. Both env vars point to the same Render backend URL.
    const backendTarget =
      process.env.NEXT_PUBLIC_API_BASE ||
      process.env.BACKEND_PROXY_TARGET ||
      "http://localhost:3001";

    return [
      {
        source: "/uploads/:path*",
        destination: `${backendTarget}/uploads/:path*`,
      },
      {
        source: "/backend/uploads/:path*",
        destination: `${backendTarget}/uploads/:path*`,
      },
      {
        source: "/backend/api/:path*",
        destination: `${backendTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
