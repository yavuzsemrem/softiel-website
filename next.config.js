/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export kaldırıldı - Local development için
  // output: 'export',
  trailingSlash: false, // API route'ları için false yapıldı
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 yıl
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Bundle analyzer için
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Environment variables için
  env: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
  // Next.js development server'ının eklediği elementleri kaldır
  devIndicators: {
    position: 'bottom-right',
  },
  // PoweredByHeader'ı kaldır
  poweredByHeader: false,
  // Geçici olarak hataları atla
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Firebase Hosting için ek ayarlar (static export olmadığı için gerekli değil)
  // distDir: 'out',
  // assetPrefix: '',
};

module.exports = nextConfig;



