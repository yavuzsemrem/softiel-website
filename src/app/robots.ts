import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/login/', '/admin-panel-secure-access-2024/', '/api/'],
      },
    ],
    sitemap: 'https://softiel.com/sitemap.xml',
  }
}

