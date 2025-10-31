import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Performance optimizations
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    loader: 'default',
    unoptimized: false,
  },
  serverExternalPackages: [],
  transpilePackages: [],
  outputFileTracingRoot: __dirname,
  
  // Ensure proper build output
  trailingSlash: false,
  generateEtags: false,
  
  // Performance optimizations
  experimental: {
    optimizeCss: false, // Disable CSS optimization to avoid critters issue
    optimizePackageImports: ['lucide-react', '@tanstack/react-query'],
  },
  
  // Compression
  compress: true,
  
  // Bundle analyzer
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Stripe bundle
          stripe: {
            name: 'stripe',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](stripe|@stripe)[\\/]/,
            priority: 20,
          },
          // UI components
          ui: {
            name: 'ui',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](lucide-react|clsx|tailwind-merge)[\\/]/,
            priority: 15,
          },
          // React Query
          reactQuery: {
            name: 'react-query',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@tanstack\/react-query|swr)[\\/]/,
            priority: 15,
          },
          // Common vendor
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      }
    }
    return config
  },
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
};

export default nextConfig;