/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
  },
}

module.exports = nextConfig
