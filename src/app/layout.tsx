import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { StructuredData } from "@/components/structured-data";


// AppContent'i lazy load et - CLIENT ONLY (useI18n ve hooks kullanır)
const AppContent = dynamic(() => import("@/components/app-content").then(mod => ({ default: mod.AppContent })), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="animate-pulse text-white">Yükleniyor...</div>
    </div>
  )
});

// reCAPTCHA'yı globalden kaldır - sadece gereken sayfalarda yükle

// ThemeProvider'ı lazy load et - CLIENT ONLY (theme switching hooks kullanır)
const LazyThemeProvider = dynamic(() => import("@/components/theme-provider").then(mod => ({ default: mod.ThemeProvider })), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-slate-900" />
});

// NotificationProvider'ı lazy load et - CLIENT ONLY (hooks içerir)
const LazyNotificationProvider = dynamic(() => import("@/contexts/notification-context").then(mod => ({ default: mod.NotificationProvider })), {
  ssr: false,
  loading: () => <></>
});

// I18nProvider'ı lazy load et - CLIENT ONLY (useEffect ve localStorage kullanır)
const LazyI18nProvider = dynamic(() => import("@/contexts/i18n-context").then(mod => ({ default: mod.I18nProvider })), {
  ssr: false,
  loading: () => <></>
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap', // Font loading optimizasyonu
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: 'swap', // Font loading optimizasyonu
});

export const metadata: Metadata = {
  metadataBase: new URL('https://softiel.com'),
  title: {
    default: "Softiel - Modern Web Ajansı | Web Tasarım & Dijital Pazarlama",
    template: "%s | Softiel"
  },
  description: "Softiel ile dijital dünyada fark yaratın. Web tasarım, geliştirme, SEO ve dijital pazarlama hizmetleri. Softiel Software - Modern Web Ajansı.",
  keywords: [
    "Softiel",
    "Softiel Software",
    "Softiel Yazılım",
    "web tasarım",
    "web geliştirme",
    "SEO optimizasyonu",
    "dijital pazarlama",
    "mobil uygulama geliştirme",
    "yapay zeka entegrasyonu",
    "web ajansı",
    "softiel.com"
  ],
  authors: [{ name: "Softiel", url: "https://softiel.com" }],
  creator: "Softiel",
  publisher: "Softiel",
  applicationName: "Softiel",
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: 'https://softiel.com',
    languages: {
      'tr': 'https://softiel.com/tr',
      'en': 'https://softiel.com/en',
      'de': 'https://softiel.com/de',
      'fr': 'https://softiel.com/fr',
      'ru': 'https://softiel.com/ru',
      'ar': 'https://softiel.com/ar',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ['en_US', 'de_DE', 'fr_FR', 'ru_RU', 'ar_SA'],
    url: "https://softiel.com",
    siteName: "Softiel",
    title: "Softiel - Modern Web Ajansı | Web Tasarım & Dijital Pazarlama",
    description: "Softiel ile dijital dünyada fark yaratın. Web tasarım, geliştirme, SEO ve dijital pazarlama hizmetleri. Softiel Software - Modern Web Ajansı.",
    images: [
      {
        url: 'https://softiel.com/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Softiel Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Softiel - Modern Web Ajansı',
    description: 'Softiel ile dijital dünyada fark yaratın. Web tasarım, geliştirme, SEO ve dijital pazarlama hizmetleri.',
    creator: '@softiel',
    site: '@softiel',
    images: ['https://softiel.com/android-chrome-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Google Search Console'dan alınacak
    yandex: 'your-yandex-verification-code', // Yandex'ten alınacak
  },
  manifest: '/manifest.json',
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Structured Data - JSON-LD for SEO */}
        <StructuredData locale="tr" />
        
        {/* Favicon declarations - Multiple formats for better compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="classification" content="Web Agency, Software Development" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="copyright" content="Softiel" />
        <meta name="author" content="Softiel" />
        <meta name="designer" content="Softiel" />
        <meta name="owner" content="Softiel" />
        <meta name="reply-to" content="info@softiel.com" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        
        {/* Canonical Link */}
        <link rel="canonical" href="https://softiel.com" />
        
        {/* Hreflang Tags for Multi-language Support */}
        <link rel="alternate" hrefLang="tr" href="https://softiel.com/tr" />
        <link rel="alternate" hrefLang="en" href="https://softiel.com/en" />
        <link rel="alternate" hrefLang="de" href="https://softiel.com/de" />
        <link rel="alternate" hrefLang="fr" href="https://softiel.com/fr" />
        <link rel="alternate" hrefLang="ru" href="https://softiel.com/ru" />
        <link rel="alternate" hrefLang="ar" href="https://softiel.com/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://softiel.com/en" />
        
        {/* Preconnect to critical origins - Network latency reduction */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        
               {/* Minimal critical JS + Firestore Cache Cleaner */}
               <script
                 dangerouslySetInnerHTML={{
                   __html: `
                     // Font loading optimization
                     if ('fonts' in document) {
                       document.fonts.ready.then(() => {
                         document.documentElement.classList.add('fonts-loaded');
                       });
                     }
                     
                     // FIRESTORE CACHE AUTO-CLEANER - Her sayfa yüklendiğinde temizle
                     (function() {
                       const lastClean = sessionStorage.getItem('firestore_last_clean');
                       const now = Date.now();
                       
                       // 5 dakikada bir temizle (veya ilk yüklemede)
                       if (!lastClean || (now - parseInt(lastClean)) > 300000) {
                         if (typeof indexedDB !== 'undefined') {
                           indexedDB.databases().then(function(dbs) {
                             dbs.forEach(function(db) {
                               if (db.name && db.name.includes('firestore')) {
                                 indexedDB.deleteDatabase(db.name);
                                 console.log('🧹 Firestore cache cleared:', db.name);
                               }
                             });
                             sessionStorage.setItem('firestore_last_clean', now.toString());
                           }).catch(function() {});
                         }
                       }
                     })();
                     
                     // Global error handler for production - suppress React errors in production
                    window.addEventListener('error', function(event) {
                      // Sadece geliştirme ortamında console'a yaz
                      if (window.location.hostname === 'localhost') {
                        console.error('Global error caught:', event.error);
                      }
                      // Production'da hataları bastır
                      event.preventDefault();
                      return false;
                    }, true);
                    
                    window.addEventListener('unhandledrejection', function(event) {
                      // Sadece geliştirme ortamında console'a yaz
                      if (window.location.hostname === 'localhost') {
                        console.error('Unhandled promise rejection:', event.reason);
                      }
                      // Production'da hataları bastır
                      event.preventDefault();
                      return false;
                    }, true);
                   `,
                 }}
               />
               
               {/* Cookiebot sadece production ortamında yükle */}
               <script
                 dangerouslySetInnerHTML={{
                   __html: `
                     if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
                       const script = document.createElement('script');
                       script.id = 'Cookiebot';
                       script.src = 'https://consent.cookiebot.com/uc.js';
                       script.setAttribute('data-cbid', '147e1717-7906-4741-9373-2fab1630eed4');
                       script.setAttribute('data-blockingmode', 'auto');
                       script.defer = true;
                       document.head.appendChild(script);
                     }
                   `,
                 }}
               />
      </head>
            <body
              className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
            >
              <ErrorBoundary>
                <Suspense fallback={
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="animate-pulse text-white">Yükleniyor...</div>
                  </div>
                }>
                  <LazyThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                  >
                    <LazyNotificationProvider>
                      <LazyI18nProvider>
                        <AppContent>
                          {children}
                        </AppContent>
                      </LazyI18nProvider>
                    </LazyNotificationProvider>
                  </LazyThemeProvider>
                </Suspense>
              </ErrorBoundary>
               
               {/* Load non-critical CSS and other non-critical scripts */}
               <script
                 dangerouslySetInnerHTML={{
                   __html: `
                     // Load non-critical CSS
                     (function() {
                       var loadNonCriticalCSS = function() {
                         if (!document.querySelector('link[href="/non-critical.css"]')) {
                           var link = document.createElement('link');
                           link.rel = 'stylesheet';
                           link.href = '/non-critical.css';
                           link.media = 'print';
                           link.onload = function() {
                             this.media = 'all';
                           };
                           document.head.appendChild(link);
                         }
                       };
                       
                       if (document.readyState === 'complete') {
                         loadNonCriticalCSS();
                       } else {
                         window.addEventListener('load', loadNonCriticalCSS);
                       }
                     })();
                     
                     // Remove Next.js dev tools badge
                     if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
                       setTimeout(function() {
                         var badges = document.querySelectorAll('[data-next-badge="true"]');
                         badges.forEach(function(badge) { badge.remove(); });
                       }, 1000);
                     }
                   `,
                 }}
               />
      </body>
    </html>
  );
}
