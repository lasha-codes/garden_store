import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Content-Type', value: 'font/woff2' },
        ],
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'http',
        hostname: '*',
      },
    ],
  },
}

export default nextConfig
