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

// Çeviri dosyalarını önceden yükle - Sadece gerekli dili yükle (network chain reduction)
const preloadTranslations = async (primaryLocale: string) => {
  // Önce aktif dili yükle
  if (!translationCache.has(primaryLocale)) {
    try {
      const response = await fetch(`/locales/${primaryLocale}/common.json`);
      if (response.ok) {
        const data = await response.json();
        translationCache.set(primaryLocale, data);
      }
    } catch (error) {
      console.error(`Çeviri dosyası yüklenemedi: ${primaryLocale}`, error);
    }
  }
  
  // Diğer dilleri idle'da yükle
  if (typeof window !== 'undefined' && (window as any).requestIdleCallback) {
    (window as any).requestIdleCallback(() => {
      supportedLocales.forEach(async (locale) => {
        if (locale !== primaryLocale && !translationCache.has(locale)) {
          try {
            const response = await fetch(`/locales/${locale}/common.json`);
            if (response.ok) {
              const data = await response.json();
              translationCache.set(locale, data);
            }
          } catch (error) {
            // Sessizce geç
          }
        }
      });
    }, { timeout: 5000 });
  }
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
    '/hizmetlerimiz/seo-arama-motoru-optimizasyonu': '/tr/hizmetlerimiz/seo-optimizasyonu',
    '/hizmetlerimiz/google-ads-yonetimi': '/tr/hizmetlerimiz/google-ads-yonetimi',
    '/hizmetlerimiz/wordpress-cozumleri': '/tr/hizmetlerimiz/wordpress-cozumleri',
    '/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi': '/tr/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi',
    '/hizmetlerimiz/social-media-yonetimi': '/tr/hizmetlerimiz/social-media-yonetimi',
    '/hizmetlerimiz/yapay-zeka-entegrasyonlari': '/tr/hizmetlerimiz/yapay-zeka-entegrasyonlari',
    '/hizmetlerimiz/dijital-danismanlik': '/tr/hizmetlerimiz/dijital-danismanlik',
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
    '/hizmetlerimiz/seo-arama-motoru-optimizasyonu': '/tr/hizmetlerimiz/seo-optimizasyonu',
    '/hizmetlerimiz/google-ads-yonetimi': '/en/services/google-ads-management',
    '/hizmetlerimiz/wordpress-cozumleri': '/en/services/wordpress-solutions',
    '/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi': '/en/services/logo-corporate-identity-design',
    '/hizmetlerimiz/social-media-yonetimi': '/en/services/social-media-management',
    '/hizmetlerimiz/yapay-zeka-entegrasyonlari': '/en/services/ai-integrations',
    '/hizmetlerimiz/dijital-danismanlik': '/en/services/digital-consulting',
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
    '/hizmetlerimiz/seo-arama-motoru-optimizasyonu': '/tr/hizmetlerimiz/seo-optimizasyonu',
    '/hizmetlerimiz/google-ads-yonetimi': '/de/dienstleistungen/google-ads-verwaltung',
    '/hizmetlerimiz/wordpress-cozumleri': '/de/dienstleistungen/wordpress-loesungen',
    '/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi': '/de/dienstleistungen/logo-corporate-identity-design',
    '/hizmetlerimiz/social-media-yonetimi': '/de/dienstleistungen/social-media-management',
    '/hizmetlerimiz/yapay-zeka-entegrasyonlari': '/de/dienstleistungen/ki-integrationen',
    '/hizmetlerimiz/dijital-danismanlik': '/de/dienstleistungen/digitale-beratung',
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
    '/hizmetlerimiz/seo-arama-motoru-optimizasyonu': '/tr/hizmetlerimiz/seo-optimizasyonu',
    '/hizmetlerimiz/google-ads-yonetimi': '/fr/services/gestion-google-ads',
    '/hizmetlerimiz/wordpress-cozumleri': '/fr/services/solutions-wordpress',
    '/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi': '/fr/services/design-logo-identite-corporative',
    '/hizmetlerimiz/social-media-yonetimi': '/fr/services/gestion-reseaux-sociaux',
    '/hizmetlerimiz/yapay-zeka-entegrasyonlari': '/fr/services/integrations-ia',
    '/hizmetlerimiz/dijital-danismanlik': '/fr/services/conseil-numerique',
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
    '/hizmetlerimiz/seo-arama-motoru-optimizasyonu': '/tr/hizmetlerimiz/seo-optimizasyonu',
    '/hizmetlerimiz/google-ads-yonetimi': '/ru/uslugi/upravlenie-google-ads',
    '/hizmetlerimiz/wordpress-cozumleri': '/ru/uslugi/resheniya-wordpress',
    '/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi': '/ru/uslugi/dizajn-logo-korporativnogo-identiteta',
    '/hizmetlerimiz/social-media-yonetimi': '/ru/uslugi/upravlenie-socsetyami',
    '/hizmetlerimiz/yapay-zeka-entegrasyonlari': '/ru/uslugi/integracii-iskusstvennogo-intellekta',
    '/hizmetlerimiz/dijital-danismanlik': '/ru/uslugi/cifrovoe-konsultirovanie',
    '/projelerimiz': '/ru/proekty'
  },
  ar: {
    '/': '/ar',
    '/hakkimizda': '/ar/about',
    '/hizmetlerimiz': '/ar/services',
    '/fiyatlandirma': '/ar/pricing',
    '/blog': '/ar/blog',
    '/iletisim': '/ar/contact',
    '/hizmetlerimiz/web-sitesi-tasarimi': '/ar/services/web-design',
    '/hizmetlerimiz/web-gelistirme': '/ar/services/web-development',
    '/hizmetlerimiz/mobil-uygulama-gelistirme': '/ar/services/mobile-app-development',
    '/hizmetlerimiz/seo-arama-motoru-optimizasyonu': '/ar/services/seo-optimization',
    '/hizmetlerimiz/google-ads-yonetimi': '/ar/services/google-ads-management',
    '/hizmetlerimiz/wordpress-cozumleri': '/ar/services/wordpress-solutions',
    '/hizmetlerimiz/logo-kurumsal-kimlik-tasarimi': '/ar/services/logo-corporate-identity-design',
    '/hizmetlerimiz/social-media-yonetimi': '/ar/services/social-media-management',
    '/hizmetlerimiz/yapay-zeka-entegrasyonlari': '/ar/services/ai-integrations',
    '/hizmetlerimiz/dijital-danismanlik': '/ar/services/digital-consulting',
    '/projelerimiz': '/ar/projects'
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
  // URL'den dil tespit et - önce tam eşleşme kontrol et
  for (const [locale, mappings] of Object.entries(urlMappings)) {
    if (Object.values(mappings).includes(pathname)) {
      return locale;
    }
  }
  
  // Tam eşleşme bulunamazsa, URL'nin başındaki dil kodunu kontrol et
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0) {
    const firstSegment = pathSegments[0];
    if (supportedLocales.includes(firstSegment)) {
      return firstSegment;
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
    
    // URL'den tespit edilen dil ile mevcut locale'i karşılaştır
    if (urlLocale !== locale) {
      setLocaleState(urlLocale);
      // URL'den tespit edilen dili localStorage'a kaydet
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-locale', urlLocale);
      }
    } else {
      // localStorage'dan dil tercihini oku (sadece ilk yüklemede)
      const savedLocale = localStorage.getItem('preferred-locale');
      if (savedLocale && supportedLocales.includes(savedLocale) && savedLocale !== urlLocale) {
        // Eğer localStorage'daki dil URL'deki dilden farklıysa, URL'yi güncelle
        const translatedUrl = getTranslatedUrl(pathname, savedLocale);
        if (translatedUrl !== pathname) {
          router.replace(translatedUrl);
        }
      }
    }

    // Çeviri dosyalarını önceden yükle - sadece aktif dil
    preloadTranslations(urlLocale);
  }, [pathname, locale, router]);

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

        // Eğer URL değiştiyse yönlendir (replace kullanarak history'ye yeni entry ekleme)
        if (translatedUrl !== currentPath) {
          router.replace(translatedUrl);
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
