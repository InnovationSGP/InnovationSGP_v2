import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '3.147.83.251',
            },
            {
                protocol: 'http',
                hostname: '3.147.83.251',
            },

            // Add localhost for development
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'localhost',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config, { dev, isServer }) => {
        if (dev) {
            config.cache = {
                type: 'memory', // Use memory instead of filesystem
            };
        }
        return config;
    },
    // Add headers to handle mixed content
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "upgrade-insecure-requests"
                    },
                    // Allow mixed content for development (remove in production)
                    {
                        key: 'Content-Security-Policy',
                        value: "block-all-mixed-content"
                    }
                ],
            },
        ]
    },
};

export default nextConfig;