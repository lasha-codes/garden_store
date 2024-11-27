import type { NextConfig } from 'next'
// @ts-ignore
import withPreact from 'next-plugin-preact'
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
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

export default { ...nextConfig, withBundleAnalyzer, withPreact: withPreact({}) }
