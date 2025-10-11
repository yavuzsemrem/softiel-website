/** @type {import('next').NextConfig} */

// Bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  // Static export kaldırıldı - Local development için
  // output: 'export',
  trailingSlash: false, // API route'ları için false yapıldı
  
  // CSS optimizasyonu - render blocking'i önlemek için
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@/components', 
      '@/lib', 
      'lucide-react', 
      'date-fns', 
      'framer-motion',
      'react-google-recaptcha-v3',
      'next-themes',
      'firebase'
    ],
    // Main thread work optimizasyonu - ULTRA
    optimizeServerReact: true,
    serverComponentsExternalPackages: ['firebase-admin'],
    // CSS chunk optimization
    cssChunking: 'strict',
    // Web Vitals tracking
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
    // Daha agresif optimizasyonlar
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Compiler optimizasyonları
  compiler: {
    // Tree shaking optimizasyonu
    styledComponents: true,
    // React optimizasyonları - main-thread work azaltmak için
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Production optimizasyonları - main-thread work minimize
  productionBrowserSourceMaps: false,  // Source map'leri kaldır - daha hızlı
  poweredByHeader: false,
  reactStrictMode: false,  // Production'da strict mode'u kapat - daha hızlı
  generateEtags: false,  // ETag generation'ı kapat
  
  // SWC minification - CSS ve JS için
  swcMinify: true,
  
  // Compression
  compress: true,
  
  // CSS modularization - critical CSS optimization
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
  
  images: {
    unoptimized: false,
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'localhost' },
      { protocol: 'https', hostname: 'th.bing.com' },
      { protocol: 'http', hostname: 'getwallpapers.com' },
      { protocol: 'https', hostname: 'getwallpapers.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' }
    ],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Image loading optimizasyonları - main-thread work azaltmak için
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    loader: 'default',
  },
  
  // Webpack konfigürasyonu - Main thread work optimizasyonu ile
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    // Cache optimizasyonu - webpack cache hatalarını önle
    if (dev) {
      config.cache = {
        type: 'memory',
      }
    }

    // Basit ve stabil code splitting - React'i korumak için
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // React + React-DOM + Scheduler tek chunk - ASLA BÖLME
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: 'react-vendor',
            chunks: 'all',
            priority: 100,
            enforce: true,
          },
          // Framer Motion async
          framerMotion: {
            test: /[\\/]node_modules[\\/](framer-motion|motion-dom)[\\/]/,
            name: 'framer-motion',
            chunks: 'async',
            priority: 80,
            enforce: true,
          },
          // Firebase async
          firebase: {
            test: /[\\/]node_modules[\\/](@firebase|firebase)[\\/]/,
            name: 'firebase',
            chunks: 'async',
            priority: 75,
            enforce: true,
          },
          // Diğer vendor'lar
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
        },
      }
      
      // Basit optimizasyonlar
      config.optimization.minimize = true
    }

    return config
  },
  
  // Environment variables için
  env: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
  
  // bfcache optimizasyonları
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/tr/iletisim',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/en/contact',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
}

module.exports = withBundleAnalyzer(nextConfig)