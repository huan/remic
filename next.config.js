/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Rewrites priority order (Next.js docs):
   *  1. beforeFiles
   *  2. (filesystem routes like /app/page.tsx)
   *  3. afterFiles
   *  4. dynamic routes
   *  5. fallback
   *
   * Previously we returned an array, which Next treats as `fallback` rewrites.
   * That meant the existing root route `src/app/page.tsx` matched first, so the
   * rewrite '/' -> '/0823-04pm-landing.html' never executed in production.
   *
   * By placing the rule in `beforeFiles`, we ensure it runs BEFORE filesystem
   * route matching, effectively letting the static HTML landing file win.
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/0823-04pm-landing.html',
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

module.exports = nextConfig
