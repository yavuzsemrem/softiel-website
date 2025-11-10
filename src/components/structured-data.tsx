import React from 'react'

interface StructuredDataProps {
  locale?: string
}

export function StructuredData({ locale = 'tr' }: StructuredDataProps) {
  // Organization Schema - Softiel markasını güçlendirmek için
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Softiel',
    alternateName: 'Softiel Software',
    legalName: 'Softiel Yazılım Bilişim Danışmanlık',
    url: 'https://softiel.com',
    logo: 'https://softiel.com/android-chrome-512x512.png',
    description: locale === 'tr' 
      ? 'Softiel ile dijital dünyada fark yaratın. Web tasarım, geliştirme, SEO ve dijital pazarlama hizmetleri.'
      : 'Make a difference in the digital world with Softiel. Web design, development, SEO and digital marketing services.',
    foundingDate: '2023',
    founders: [
      {
        '@type': 'Person',
        name: 'Softiel Team'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'Istanbul'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@softiel.com',
      availableLanguage: ['Turkish', 'English', 'German', 'French', 'Russian', 'Arabic']
    },
    sameAs: [
      'https://www.linkedin.com/company/softiel',
      'https://twitter.com/softiel',
      'https://www.instagram.com/softiel',
      'https://www.facebook.com/softiel'
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '41.0082',
        longitude: '28.9784'
      }
    },
    brand: {
      '@type': 'Brand',
      name: 'Softiel',
      logo: 'https://softiel.com/android-chrome-512x512.png',
      slogan: locale === 'tr' 
        ? 'Dijital Dünyada Fark Yaratın'
        : 'Make a Difference in the Digital World'
    }
  }

  // WebSite Schema - Arama özelliği için
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Softiel',
    alternateName: 'Softiel - Modern Web Ajansı',
    url: 'https://softiel.com',
    description: locale === 'tr'
      ? 'Softiel ile dijital dünyada fark yaratın. Web tasarım, geliştirme, SEO ve dijital pazarlama hizmetleri.'
      : 'Make a difference in the digital world with Softiel. Web design, development, SEO and digital marketing services.',
    inLanguage: ['tr', 'en', 'de', 'fr', 'ru', 'ar'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://softiel.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  // ProfessionalService Schema - Hizmetler için
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Softiel',
    image: 'https://softiel.com/android-chrome-512x512.png',
    '@id': 'https://softiel.com',
    url: 'https://softiel.com',
    telephone: '',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'Istanbul'
    },
    areaServed: ['TR', 'Global'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'tr' ? 'Hizmetlerimiz' : 'Our Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'tr' ? 'Web Tasarım' : 'Web Design',
            description: locale === 'tr' 
              ? 'Modern ve kullanıcı dostu web tasarım hizmetleri'
              : 'Modern and user-friendly web design services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'tr' ? 'Web Geliştirme' : 'Web Development',
            description: locale === 'tr'
              ? 'Özelleştirilmiş web uygulama geliştirme'
              : 'Custom web application development'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO',
            description: locale === 'tr'
              ? 'Arama motoru optimizasyonu hizmetleri'
              : 'Search engine optimization services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'tr' ? 'Dijital Pazarlama' : 'Digital Marketing',
            description: locale === 'tr'
              ? 'Google Ads, Meta Ads ve sosyal medya yönetimi'
              : 'Google Ads, Meta Ads and social media management'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'tr' ? 'Mobil Uygulama Geliştirme' : 'Mobile Application Development',
            description: locale === 'tr'
              ? 'iOS ve Android uygulama geliştirme'
              : 'iOS and Android application development'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'tr' ? 'Yapay Zeka Entegrasyonu' : 'AI Integration',
            description: locale === 'tr'
              ? 'Yapay zeka ve otomasyon çözümleri'
              : 'Artificial intelligence and automation solutions'
          }
        }
      ]
    }
  }

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://softiel.com#business',
    name: 'Softiel',
    image: 'https://softiel.com/android-chrome-512x512.png',
    description: locale === 'tr'
      ? 'Softiel ile dijital dünyada fark yaratın. Web tasarım, geliştirme, SEO ve dijital pazarlama hizmetleri.'
      : 'Make a difference in the digital world with Softiel. Web design, development, SEO and digital marketing services.',
    url: 'https://softiel.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'Istanbul'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    ]
  }

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      
      {/* Professional Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}

