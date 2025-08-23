/** @type {import('next').NextConfig} */
const nextConfig = {
  // appDir is now stable in Next.js 13+, no need for experimental flag
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/0823-04pm-landing.html',
      },
    ]
  },
}

module.exports = nextConfig
