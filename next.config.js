/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    // remotePatterns: {},
    domains: ['static.looksnice.org'],
    dangerouslyAllowSVG: true, 
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/browse',
        permanent: true,
      }
    ]
  }
  
}

module.exports = nextConfig
