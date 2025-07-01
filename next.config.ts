import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.innovationsgp.com",
      },
      // Add WordPress.com and wp.com domains for media
      {
        protocol: "https",
        hostname: "**.wordpress.com",
      },
      {
        protocol: "https",
        hostname: "**.wp.com",
      },
      {
        protocol: "https",
        hostname: "innovationsgp.com",
      },
      // Allow images from any domain during development
      {
        protocol: "https",
        hostname: "**",
      },
      // Add Gravatar for author avatars
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      // Add localhost for development
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
      // Add WordPress server IP address
      {
        protocol: "http",
        hostname: "3.147.83.251",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = {
        type: "memory", // Use memory instead of filesystem
      };
    }
    return config;
  },
  // Add headers to handle mixed content
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
          // Allow mixed content for development (remove in production)
          {
            key: "Content-Security-Policy",
            value: "block-all-mixed-content",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
