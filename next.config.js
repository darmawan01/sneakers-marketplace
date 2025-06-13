/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ebayimg.com',
      },
      {
        protocol: 'https',
        hostname: 'kickstw.com.au',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images.farfetch-contents.com',
      },
      {
        protocol: 'https',
        hostname: 'static.nike.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.adidas.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
    ],
  },
}

module.exports = nextConfig 