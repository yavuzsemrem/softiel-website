"use client"

import React from "react"
import { Home, ArrowLeft, AlertTriangle } from "lucide-react"

type SupportedLang = 'tr' | 'en' | 'de' | 'fr' | 'ru' | 'ar'

const TEXTS: Record<SupportedLang, {
  badge: string,
  titlePart1: string,
  titlePart2: string,
  description: string,
  goHome: string,
  goBack: string,
  homeHref: string,
}> = {
  tr: {
    badge: "404 Hata",
    titlePart1: "Sayfa",
    titlePart2: "Bulunamadı",
    description: "Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönmek için aşağıdaki seçenekleri kullanabilirsiniz.",
    goHome: "Ana Sayfaya Dön",
    goBack: "Geri Git",
    homeHref: "/tr",
  },
  en: {
    badge: "404 Error",
    titlePart1: "Page",
    titlePart2: "Not Found",
    description: "The page you’re looking for doesn’t exist or may have been moved. Use the options below to return to the homepage.",
    goHome: "Go to Homepage",
    goBack: "Go Back",
    homeHref: "/en",
  },
  de: {
    badge: "404 Fehler",
    titlePart1: "Seite",
    titlePart2: "Nicht Gefunden",
    description: "Die gesuchte Seite existiert nicht oder wurde verschoben. Nutzen Sie die Optionen unten, um zur Startseite zurückzukehren.",
    goHome: "Zur Startseite",
    goBack: "Zurück",
    homeHref: "/de",
  },
  fr: {
    badge: "Erreur 404",
    titlePart1: "Page",
    titlePart2: "Introuvable",
    description: "La page que vous recherchez n’existe pas ou a été déplacée. Utilisez les options ci-dessous pour revenir à l’accueil.",
    goHome: "Aller à l’accueil",
    goBack: "Revenir",
    homeHref: "/fr",
  },
  ru: {
    badge: "Ошибка 404",
    titlePart1: "Страница",
    titlePart2: "Не Найдена",
    description: "Страница, которую вы ищете, не существует или была перемещена. Используйте варианты ниже, чтобы вернуться на главную.",
    goHome: "На Главную",
    goBack: "Назад",
    homeHref: "/ru",
  },
  ar: {
    badge: "خطأ 404",
    titlePart1: "الصفحة",
    titlePart2: "غير موجودة",
    description: "الصفحة المطلوبة غير موجودة أو ربما تم نقلها. استخدم الخيارات أدناه للعودة إلى الصفحة الرئيسية.",
    goHome: "الذهاب للصفحة الرئيسية",
    goBack: "رجوع",
    homeHref: "/ar",
  },
}

export function NotFoundHero({ lang }: { lang: SupportedLang }) {
  const t = TEXTS[lang]
  return (
    <section className="relative pt-20 pb-8 lg:pt-32 lg:pb-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8 animate-slide-up" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <AlertTriangle className="h-5 w-5 text-red-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{t.badge}</span>
          </div>

          {/* 404 Number */}
          <div className="mb-8 animate-scale-in">
            <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-display font-bold text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text leading-none">
              404
            </h1>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-6 leading-tight animate-slide-up">
            {t.titlePart1}{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              {t.titlePart2}
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up">{t.description}</p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <a
              href={t.homeHref}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Home className="h-5 w-5" />
              <span>{t.goHome}</span>
            </a>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 glass px-8 py-4 rounded-2xl font-semibold text-lg text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: 'rgba(148, 148, 148, 0.1)' }}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t.goBack}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
