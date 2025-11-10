import { MetadataRoute } from 'next'

// Tüm dil kodları
const locales = ['tr', 'en', 'de', 'fr', 'ru', 'ar']

// Ana URL
const baseUrl = 'https://softiel.com'

// Statik sayfalar (her dil için)
const staticPages = [
  '', // Ana sayfa
  '/about',
  '/services',
  '/projects',
  '/pricing',
  '/contact',
  '/blog',
]

// Hizmet sayfaları
const servicePages = [
  '/services/web-design',
  '/services/web-application-development',
  '/services/mobile-application-development',
  '/services/seo-optimization',
  '/services/google-ads-management',
  '/services/social-media-management',
  '/services/artificial-intelligence-integration',
  '/services/wordpress-solutions',
  '/services/logo-and-corporate-identity',
  '/services/digital-consulting',
  '/services/no-code-low-code-solutions',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = []

  // Root redirect
  routes.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  // Her dil için sayfaları ekle
  locales.forEach((locale) => {
    // Statik sayfalar
    staticPages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' || page === '/blog' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      })
    })

    // Hizmet sayfaları
    servicePages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      })
    })
  })

  return routes
}

