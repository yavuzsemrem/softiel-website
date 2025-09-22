"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, fallback?: string) => string;
  translations: Record<string, any>;
  getLocalizedUrl: (turkishUrl: string) => string;
  isChangingLocale: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const supportedLocales = ['tr', 'en', 'de', 'fr', 'ru', 'ar'];
const defaultLocale = 'tr';

// Çeviri cache'i
const translationCache = new Map<string, Record<string, any>>();

// Çeviri dosyalarını önceden yükle
const preloadTranslations = async () => {
  const promises = supportedLocales.map(async (locale) => {
    if (!translationCache.has(locale)) {
      try {
        const response = await fetch(`/locales/${locale}/common.json`);
        if (response.ok) {
          const data = await response.json();
          translationCache.set(locale, data);
        }
      } catch (error) {
        console.error(`Çeviri dosyası yüklenemedi: ${locale}`, error);
      }
    }
  });
  
  await Promise.all(promises);
};

// URL mapping'leri - her dil için sayfa URL'leri (ülke kodları ile)
const urlMappings = {
  tr: {
    '/': '/tr',
    '/hakkimizda': '/tr/hakkimizda',
    '/hizmetlerimiz': '/tr/hizmetlerimiz',
    '/fiyatlandirma': '/tr/fiyatlandirma',
    '/blog': '/tr/blog',
    '/iletisim': '/tr/iletisim',
    '/hizmetlerimiz/web-sitesi-tasarimi': '/tr/hizmetlerimiz/web-sitesi-tasarimi',
    '/hizmetlerimiz/web-gelistirme': '/tr/hizmetlerimiz/web-gelistirme',
    '/hizmetlerimiz/mobil-uygulama-gelistirme': '/tr/hizmetlerimiz/mobil-uygulama-gelistirme',
    '/hizmetlerimiz/seo-arama-motoru-optimizasyonu': '/tr/hizmetlerimiz/seo-arama-motoru-optimizasyonu',
    '/hizmetlerimiz/google-ads-meta-ads-yonetimi': '/tr/hizmetlerimiz/google-ads-meta-ads-yonetimi',
    '/hizmetlerimiz/wordpress-cms-cozumleri': '/tr/hizmetlerimiz/wordpress-cms-cozumleri',
    '/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi': '/tr/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi',
    '/hizmetlerimiz/social-media-yonetimi': '/tr/hizmetlerimiz/social-media-yonetimi',
    '/hizmetlerimiz/yapay-zeka-entegrasyonlari': '/tr/hizmetlerimiz/yapay-zeka-entegrasyonlari',
    '/hizmetlerimiz/otomasyon-entegrasyon': '/tr/hizmetlerimiz/otomasyon-entegrasyon',
    '/hizmetlerimiz/dijital-danismanlik': '/tr/hizmetlerimiz/dijital-danismanlik',
    '/hizmetlerimiz/no-code-low-code-cozumleri': '/tr/hizmetlerimiz/no-code-low-code-cozumleri',
    '/hizmetlerimiz/egitim-mentorluk': '/tr/hizmetlerimiz/egitim-mentorluk',
    '/projelerimiz': '/tr/projelerimiz'
  },
  en: {
    '/': '/en',
    '/hakkimizda': '/en/about',
    '/hizmetlerimiz': '/en/services',
    '/fiyatlandirma': '/en/pricing',
    '/blog': '/en/blog',
    '/iletisim': '/en/contact',
    '/hizmetlerimiz/web-sitesi-tasarimi': '/en/services/web-design',
    '/hizmetlerimiz/web-gelistirme': '/en/services/web-development',
    '/hizmetlerimiz/mobil-uygulama-gelistirme': '/en/services/mobile-app-development',
    '/hizmetlerimiz/seo-arama-motoru-optimizasyonu': '/en/services/seo-search-engine-optimization',
    '/hizmetlerimiz/google-ads-meta-ads-yonetimi': '/en/services/google-ads-meta-ads-management',
    '/hizmetlerimiz/wordpress-cms-cozumleri': '/en/services/wordpress-cms-solutions',
    '/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi': '/en/services/logo-corporate-identity-design',
    '/hizmetlerimiz/social-media-yonetimi': '/en/services/social-media-management',
    '/hizmetlerimiz/yapay-zeka-entegrasyonlari': '/en/services/ai-integrations',
    '/hizmetlerimiz/otomasyon-entegrasyon': '/en/services/automation-integration',
    '/hizmetlerimiz/dijital-danismanlik': '/en/services/digital-consulting',
    '/hizmetlerimiz/no-code-low-code-cozumleri': '/en/services/no-code-low-code-solutions',
    '/hizmetlerimiz/egitim-mentorluk': '/en/services/education-mentoring',
    '/projelerimiz': '/en/projects'
  },
  de: {
    '/': '/de',
    '/hakkimizda': '/de/uber-uns',
    '/hizmetlerimiz': '/de/dienstleistungen',
    '/fiyatlandirma': '/de/preise',
    '/blog': '/de/blog',
    '/iletisim': '/de/kontakt',
    '/hizmetlerimiz/web-sitesi-tasarimi': '/de/dienstleistungen/webdesign',
    '/hizmetlerimiz/web-gelistirme': '/de/dienstleistungen/webentwicklung',
    '/hizmetlerimiz/mobil-uygulama-gelistirme': '/de/dienstleistungen/mobile-app-entwicklung',
    '/hizmetlerimiz/seo-arama-motoru-optimizasyonu': '/de/dienstleistungen/seo-suchmaschinenoptimierung',
    '/hizmetlerimiz/google-ads-meta-ads-yonetimi': '/de/dienstleistungen/google-ads-meta-ads-verwaltung',
    '/hizmetlerimiz/wordpress-cms-cozumleri': '/de/dienstleistungen/wordpress-cms-losungen',
    '/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi': '/de/dienstleistungen/logo-corporate-identity-design',
    '/hizmetlerimiz/social-media-yonetimi': '/de/dienstleistungen/social-media-management',
    '/hizmetlerimiz/yapay-zeka-entegrasyonlari': '/de/dienstleistungen/ki-integrationen',
    '/hizmetlerimiz/otomasyon-entegrasyon': '/de/dienstleistungen/automatisierung-integration',
    '/hizmetlerimiz/dijital-danismanlik': '/de/dienstleistungen/digitale-beratung',
    '/hizmetlerimiz/no-code-low-code-cozumleri': '/de/dienstleistungen/no-code-low-code-losungen',
    '/hizmetlerimiz/egitim-mentorluk': '/de/dienstleistungen/bildung-mentoring',
    '/projelerimiz': '/de/projekte'
  },
  fr: {
    '/': '/fr',
    '/hakkimizda': '/fr/a-propos',
    '/hizmetlerimiz': '/fr/services',
    '/fiyatlandirma': '/fr/tarifs',
    '/blog': '/fr/blog',
    '/iletisim': '/fr/contact',
    '/hizmetlerimiz/web-sitesi-tasarimi': '/fr/services/conception-web',
    '/hizmetlerimiz/web-gelistirme': '/fr/services/developpement-web',
    '/hizmetlerimiz/mobil-uygulama-gelistirme': '/fr/services/developpement-app-mobile',
    '/hizmetlerimiz/seo-arama-motoru-optimizasyonu': '/fr/services/optimisation-moteurs-recherche-seo',
    '/hizmetlerimiz/google-ads-meta-ads-yonetimi': '/fr/services/gestion-google-ads-meta-ads',
    '/hizmetlerimiz/wordpress-cms-cozumleri': '/fr/services/solutions-wordpress-cms',
    '/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi': '/fr/services/design-logo-identite-corporative',
    '/hizmetlerimiz/social-media-yonetimi': '/fr/services/gestion-reseaux-sociaux',
    '/hizmetlerimiz/yapay-zeka-entegrasyonlari': '/fr/services/integrations-ia',
    '/hizmetlerimiz/otomasyon-entegrasyon': '/fr/services/automatisation-integration',
    '/hizmetlerimiz/dijital-danismanlik': '/fr/services/conseil-numerique',
    '/hizmetlerimiz/no-code-low-code-cozumleri': '/fr/services/solutions-no-code-low-code',
    '/hizmetlerimiz/egitim-mentorluk': '/fr/services/formation-mentorat',
    '/projelerimiz': '/fr/projets'
  },
  ru: {
    '/': '/ru',
    '/hakkimizda': '/ru/o-nas',
    '/hizmetlerimiz': '/ru/uslugi',
    '/fiyatlandirma': '/ru/ceny',
    '/blog': '/ru/blog',
    '/iletisim': '/ru/kontakt',
    '/hizmetlerimiz/web-sitesi-tasarimi': '/ru/uslugi/veb-dizajn',
    '/hizmetlerimiz/web-gelistirme': '/ru/uslugi/veb-razrabotka',
    '/hizmetlerimiz/mobil-uygulama-gelistirme': '/ru/uslugi/razrabotka-mobilnyh-prilozhenij',
    '/hizmetlerimiz/seo-arama-motoru-optimizasyonu': '/ru/uslugi/seo-optimizaciya-poiskovyh-sistem',
    '/hizmetlerimiz/google-ads-meta-ads-yonetimi': '/ru/uslugi/upravlenie-google-ads-meta-ads',
    '/hizmetlerimiz/wordpress-cms-cozumleri': '/ru/uslugi/resheniya-wordpress-cms',
    '/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi': '/ru/uslugi/dizajn-logo-korporativnogo-identiteta',
    '/hizmetlerimiz/social-media-yonetimi': '/ru/uslugi/upravlenie-socsetyami',
    '/hizmetlerimiz/yapay-zeka-entegrasyonlari': '/ru/uslugi/integracii-iskusstvennogo-intellekta',
    '/hizmetlerimiz/otomasyon-entegrasyon': '/ru/uslugi/avtomatizaciya-integraciya',
    '/hizmetlerimiz/dijital-danismanlik': '/ru/uslugi/cifrovoe-konsultirovanie',
    '/hizmetlerimiz/no-code-low-code-cozumleri': '/ru/uslugi/resheniya-no-code-low-code',
    '/hizmetlerimiz/egitim-mentorluk': '/ru/uslugi/obrazovanie-mentoring',
    '/projelerimiz': '/ru/proekty'
  },
  ar: {
    '/': '/ar',
    '/hakkimizda': '/ar/من-نحن',
    '/hizmetlerimiz': '/ar/خدماتنا',
    '/fiyatlandirma': '/ar/الأسعار',
    '/blog': '/ar/المدونة',
    '/iletisim': '/ar/اتصل-بنا',
    '/hizmetlerimiz/web-sitesi-tasarimi': '/ar/خدماتنا/تصميم-المواقع',
    '/hizmetlerimiz/web-gelistirme': '/ar/خدماتنا/تطوير-المواقع',
    '/hizmetlerimiz/mobil-uygulama-gelistirme': '/ar/خدماتنا/تطوير-التطبيقات-المحمولة',
    '/hizmetlerimiz/seo-arama-motoru-optimizasyonu': '/ar/خدماتنا/تحسين-محركات-البحث',
    '/hizmetlerimiz/google-ads-meta-ads-yonetimi': '/ar/خدماتنا/إدارة-إعلانات-جوجل-وميتا',
    '/hizmetlerimiz/wordpress-cms-cozumleri': '/ar/خدماتنا/حلول-ووردبريس-و-نظام-إدارة-المحتوى',
    '/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi': '/ar/خدماتنا/تصميم-الشعار-والهوية-الشركاتية',
    '/hizmetlerimiz/social-media-yonetimi': '/ar/خدماتنا/إدارة-وسائل-التواصل-الاجتماعي',
    '/hizmetlerimiz/yapay-zeka-entegrasyonlari': '/ar/خدماتنا/تكاملات-الذكاء-الاصطناعي',
    '/hizmetlerimiz/otomasyon-entegrasyon': '/ar/خدماتنا/الأتمتة-والتكامل',
    '/hizmetlerimiz/dijital-danismanlik': '/ar/خدماتنا/الاستشارات-الرقمية',
    '/hizmetlerimiz/no-code-low-code-cozumleri': '/ar/خدماتنا/حلول-لا-كود-قليل-الكود',
    '/hizmetlerimiz/egitim-mentorluk': '/ar/خدماتنا/التعليم-والإرشاد',
    '/projelerimiz': '/ar/مشاريعنا'
  }
};

// URL mapping fonksiyonları
const getTranslatedUrl = (currentPath: string, targetLocale: string): string => {
  // Önce mevcut dildeki URL'yi bul
  const currentLocale = Object.keys(urlMappings).find(locale => {
    const mappings = urlMappings[locale as keyof typeof urlMappings];
    return Object.values(mappings).includes(currentPath);
  }) || 'tr';

  // Mevcut dildeki URL'yi Türkçe URL'ye çevir
  const currentMappings = urlMappings[currentLocale as keyof typeof urlMappings];
  const turkishUrl = Object.keys(urlMappings.tr).find(key => 
    (currentMappings as any)?.[key] === currentPath
  ) || currentPath;

  // Türkçe URL'yi hedef dile çevir
  const targetMappings = urlMappings[targetLocale as keyof typeof urlMappings];
  return (targetMappings as any)?.[turkishUrl] || currentPath;
};

const getCurrentLocaleFromUrl = (pathname: string): string => {
  // URL'den dil tespit et
  for (const [locale, mappings] of Object.entries(urlMappings)) {
    if (Object.values(mappings).includes(pathname)) {
      return locale;
    }
  }
  return defaultLocale;
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState(defaultLocale);
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isChangingLocale, setIsChangingLocale] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Client-side olduğunu belirle ve URL'den dil tespit et
  useEffect(() => {
    setIsClient(true);

    // URL'den dil tespit et
    const urlLocale = getCurrentLocaleFromUrl(pathname);
    if (urlLocale !== defaultLocale) {
      setLocaleState(urlLocale);
      // URL'den tespit edilen dili localStorage'a kaydet
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-locale', urlLocale);
      }
    } else {
      // localStorage'dan dil tercihini oku
      const savedLocale = localStorage.getItem('preferred-locale');
      if (savedLocale && supportedLocales.includes(savedLocale)) {
        setLocaleState(savedLocale);
      } else {
        setLocaleState(defaultLocale);
      }
    }

    // Çeviri dosyalarını önceden yükle
    preloadTranslations();
  }, [pathname]);

  // Çeviri dosyalarını yükle (sadece client-side)
  useEffect(() => {
    if (!isClient) return;

    // Önce fallback değerlerle yükle
    setIsLoaded(true);

    const loadTranslations = async () => {
      // Cache'den kontrol et
      if (translationCache.has(locale)) {
        setTranslations(translationCache.get(locale)!);
        // Loading state'i sıfırla
        setIsChangingLocale(false);
        return;
      }

      try {
        const response = await fetch(`/locales/${locale}/common.json`);
        if (response.ok) {
          const data = await response.json();
          translationCache.set(locale, data);
          setTranslations(data);
        }
      } catch (error) {
        console.error('Çeviri dosyası yüklenemedi:', error);
        // Fallback olarak Türkçe yükle
        if (locale !== 'tr') {
          if (translationCache.has('tr')) {
            setTranslations(translationCache.get('tr')!);
          } else {
            try {
              const response = await fetch(`/locales/tr/common.json`);
              if (response.ok) {
                const data = await response.json();
                translationCache.set('tr', data);
                setTranslations(data);
              }
            } catch (fallbackError) {
              console.error('Fallback çeviri dosyası yüklenemedi:', fallbackError);
            }
          }
        }
      } finally {
        // Loading state'i sıfırla
        setIsChangingLocale(false);
      }
    };

    loadTranslations();
  }, [locale, isClient]);

  const setLocale = (newLocale: string) => {
    if (supportedLocales.includes(newLocale) && newLocale !== locale) {
      // Loading state'i başlat
      setIsChangingLocale(true);
      
      // Dil tercihini localStorage'a kaydet
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-locale', newLocale);

        // URL'yi yeni dile göre çevir ve yönlendir
        const currentPath = pathname;
        const translatedUrl = getTranslatedUrl(currentPath, newLocale);

        // Eğer URL değiştiyse yönlendir
        if (translatedUrl !== currentPath) {
          router.push(translatedUrl);
        } else {
          // URL aynıysa sadece state'i güncelle
          setLocaleState(newLocale);
        }
      }
    }
  };

  const t = (key: string, fallback?: string): string => {
    // Client-side değilse veya çeviriler yüklenmediyse fallback değeri döndür
    if (!isClient || !isLoaded) {
      return fallback || key;
    }
    
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }
    
    return typeof value === 'string' ? value : fallback || key;
  };

  const getLocalizedUrl = (turkishUrl: string): string => {
    const currentMappings = urlMappings[locale as keyof typeof urlMappings];
    return (currentMappings as any)?.[turkishUrl] || turkishUrl;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, translations, getLocalizedUrl, isChangingLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
