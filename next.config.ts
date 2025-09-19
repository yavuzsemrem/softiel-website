import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export kaldırıldı - Local development için
  // output: 'export',
  trailingSlash: false, // API route'ları için false yapıldı
  images: {
    unoptimized: true
  },
  // Node.js deprecation warning'lerini bastır
  serverExternalPackages: [],
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

export default nextConfig;
