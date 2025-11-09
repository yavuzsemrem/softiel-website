import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/error-boundary";


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
  title: "Softiel - Modern Web Ajansı",
  description: "Softiel ile dijital dünyada fark yaratın. Web tasarım, geliştirme, SEO ve dijital pazarlama hizmetleri.",
  keywords: "web tasarım, web geliştirme, SEO, dijital pazarlama, mobil uygulama, yapay zeka",
  authors: [{ name: "Softiel" }],
  openGraph: {
    title: "Softiel - Modern Web Ajansı",
    description: "Softiel ile dijital dünyada fark yaratın. Web tasarım, geliştirme, SEO ve dijital pazarlama hizmetleri.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical origins - Network latency reduction */}
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
