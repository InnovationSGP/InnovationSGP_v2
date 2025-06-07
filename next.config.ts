import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['3.147.83.251'],
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
