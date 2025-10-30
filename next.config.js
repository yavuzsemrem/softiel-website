/** @type {import('next').NextConfig} */
const baseConfig = {
  experimental: { optimizeCss: false },
  swcMinify: false,
  trailingSlash: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'localhost' },
      { protocol: 'https', hostname: 'th.bing.com' },
      { protocol: 'http', hostname: 'getwallpapers.com' },
      { protocol: 'https', hostname: 'getwallpapers.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    loader: 'default',
  },
  env: { NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY },
  async headers() {
    return [
      { source: '/(.*)', headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
      ]},
      { source: '/tr/iletisim', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
      { source: '/en/contact',  headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
    ]
  },
};

try {
  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: true });
    module.exports = withBundleAnalyzer(baseConfig);
  } else {
    module.exports = baseConfig;
  }
} catch (_) {
  module.exports = baseConfig;
}