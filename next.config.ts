import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24 h côté CDN Next.js
    remotePatterns: [
      { protocol: "http",  hostname: "127.0.0.1",                              pathname: "/**" },
      { protocol: "http",  hostname: "localhost",                               pathname: "/**" },
      { protocol: "https", hostname: "monportofoliobackend.up.railway.app",     pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com",                     pathname: "/darkqhocp/**" },
    ],
  },

  async headers() {
    return [
      {
        /* Sécurité + performances sur toutes les routes */
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",          value: "SAMEORIGIN" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control",   value: "on" },
        ],
      },
      {
        /* Cache long sur les assets statiques (vendor, css, fonts, images publiques) */
        source: "/assets/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
