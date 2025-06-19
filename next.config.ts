import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: ['127.0.0.1', 'localhost','monportofoliobackend.up.railway.app','res.cloudinary.com'],
  },
};

export default nextConfig;
