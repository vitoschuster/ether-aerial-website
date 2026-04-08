import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    // Next.js image optimization server doesn't exist in static export.
    // Cloudflare Pages CDN handles delivery — unoptimized is fine here.
    unoptimized: true,
  },
};

export default nextConfig;
