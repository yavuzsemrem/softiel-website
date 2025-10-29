"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle, Star, Users, Clock, Award, Palette, Smartphone, Search, Zap, Target, Globe, Code, Layers, Shield, TrendingUp, FileText, Share2, Bot, Wrench, BookOpen, BarChart3, Settings, Database, DollarSign, RefreshCw, Sparkles, Headphones, MessageCircle, Eye } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"
import websiteDesignImage from "@/images/website-design.webp"
import webApplicationDevelopmentImage from "@/images/web-application-development.webp"
import mobileApplicationDevelopmentImage from "@/images/mobile-application-development.webp"
import seoOptimizationImage from "@/images/seo-optimization.webp"
import googleAdsImage from "@/images/google-ads-and-meta-ads-management.webp"
import wordpressSolutionsImage from "@/images/wordpress-solutions.webp"
import logoCorporateImage from "@/images/logo-and-corporate-identity.webp"
import socialMediaImage from "@/images/social-media-management.webp"
import aiIntegrationImage from "@/images/artificial-intelligence-integration.webp"
import automationImage from "@/images/automation-and-integration.webp"
import digitalConsultingImage from "@/images/digital-consulting.webp"
import servicesImage from "@/images/services.webp"

// WhatsApp icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
)

interface ServiceHeroProps {
  data: {
    title: string
    subtitle: string
    description: string
    features: Array<{
      title: string
      description: string
    }>
    serviceType?: string
  }
}

export function ServiceHero({ data }: ServiceHeroProps) {
  const { t } = useI18n()

  // Görsel seçim fonksiyonu
  const getServiceImage = (serviceType?: string) => {
    switch (serviceType) {
      case 'web-tasarimi':
        return websiteDesignImage
      case 'web-gelistirme':
        return webApplicationDevelopmentImage
      case 'mobil-uygulama':
        return mobileApplicationDevelopmentImage
      case 'seo':
        return seoOptimizationImage
      case 'google-ads':
        return googleAdsImage
      case 'wordpress':
        return wordpressSolutionsImage
      case 'logo-kimlik':
        return logoCorporateImage
      case 'sosyal-medya':
        return socialMediaImage
      case 'yapay-zeka':
        return aiIntegrationImage
      case 'otomasyon':
        return automationImage
      case 'danismanlik':
        return digitalConsultingImage
      default:
        return servicesImage
    }
  }

  // WhatsApp mesajını serviceType ve dile göre oluştur
  const getWhatsAppMessage = (serviceType?: string) => {
    // Dil bilgisini al
    const currentLocale = typeof window !== 'undefined' ?
      window.location.pathname.split('/')[1] || 'tr' : 'tr'

    const messageMap = {
      tr: {
        'web-gelistirme': 'Merhaba! Web uygulaması geliştirme hizmetleri hakkında bilgi almak istiyorum.',
        'web-tasarimi': 'Merhaba! Web sitesi tasarımı hakkında bilgi almak istiyorum.',
        'seo': 'Merhaba! SEO hizmetleri hakkında bilgi almak istiyorum.',
        'sosyal-medya': 'Merhaba! Sosyal medya yönetimi hakkında bilgi almak istiyorum.',
        'dijital-pazarlama': 'Merhaba! Dijital pazarlama hizmetleri hakkında bilgi almak istiyorum.',
        'mobil-uygulama': 'Merhaba! Mobil uygulama geliştirme hizmetleri hakkında bilgi almak istiyorum.',
        'google-ads': 'Merhaba! Google Ads ve Meta Ads Yönetimi hizmetleri hakkında bilgi almak istiyorum.',
        'wordpress': 'Merhaba! WordPress CMS çözümleri ve hazır paketler hakkında bilgi almak istiyorum.',
        'logo-kimlik': 'Merhaba! Logo & Kurumsal Kimlik Tasarımı hizmeti hakkında bilgi almak istiyorum.',
        'yapay-zeka': 'Merhaba! Yapay Zeka Entegrasyonları hizmeti hakkında bilgi almak istiyorum.',
        'danismanlik': 'Merhaba! Dijital Danışmanlık hizmeti hakkında bilgi almak istiyorum.',
        'default': 'Merhaba! Hizmetleriniz hakkında bilgi almak istiyorum.'
      },
      en: {
        'web-gelistirme': 'Hello! I want to get information about web application development services.',
        'web-tasarimi': 'Hello! I want to get information about website design services.',
        'seo': 'Hello! I want to get information about SEO services.',
        'sosyal-medya': 'Hello! I want to get information about social media management services.',
        'dijital-pazarlama': 'Hello! I want to get information about digital marketing services.',
        'mobil-uygulama': 'Hello! I want to get information about mobile application development services.',
        'google-ads': 'Hello! I want to get information about Google Ads and Meta Ads Management services.',
        'wordpress': 'Hello! I want to get information about WordPress CMS solutions and ready packages.',
        'logo-kimlik': 'Hello! I want to get information about Logo & Corporate Identity Design service.',
        'yapay-zeka': 'Hello! I want to get information about Artificial Intelligence Integrations service.',
        'danismanlik': 'Hello! I want to get information about Digital Consulting service.',
        'default': 'Hello! I want to get information about your services.'
      },
      de: {
        'web-gelistirme': 'Hallo! Ich möchte Informationen zu Web-Applikationsentwicklungsdiensten erhalten.',
        'web-tasarimi': 'Hallo! Ich möchte Informationen zu Webseitendesign-Diensten erhalten.',
        'seo': 'Hallo! Ich möchte Informationen zu SEO-Diensten erhalten.',
        'sosyal-medya': 'Hallo! Ich möchte Informationen zu Social-Media-Management-Diensten erhalten.',
        'dijital-pazarlama': 'Hallo! Ich möchte Informationen zu Digital-Marketing-Diensten erhalten.',
        'mobil-uygulama': 'Hallo! Ich möchte Informationen zu Mobile-App-Entwicklungsdiensten erhalten.',
        'google-ads': 'Hallo! Ich möchte Informationen zu Google Ads und Meta Ads Management Diensten erhalten.',
        'wordpress': 'Hallo! Ich möchte Informationen zu WordPress CMS Lösungen und Fertigpaketen erhalten.',
        'logo-kimlik': 'Hallo! Ich möchte Informationen zum Logo & Corporate Identity Design Service erhalten.',
        'yapay-zeka': 'Hallo! Ich möchte Informationen zum Künstliche Intelligenz Integrationen Service erhalten.',
        'danismanlik': 'Hallo! Ich möchte Informationen zum Digital Consulting Service erhalten.',
        'default': 'Hallo! Ich möchte Informationen zu Ihren Dienstleistungen erhalten.'
      },
      fr: {
        'web-gelistirme': 'Bonjour ! Je souhaite obtenir des informations sur les services de développement d\'applications web.',
        'web-tasarimi': 'Bonjour ! Je souhaite obtenir des informations sur les services de conception de sites web.',
        'seo': 'Bonjour ! Je souhaite obtenir des informations sur les services SEO.',
        'sosyal-medya': 'Bonjour ! Je souhaite obtenir des informations sur les services de gestion des réseaux sociaux.',
        'dijital-pazarlama': 'Bonjour ! Je souhaite obtenir des informations sur les services de marketing digital.',
        'mobil-uygulama': 'Bonjour ! Je souhaite obtenir des informations sur les services de développement d\'applications mobiles.',
        'google-ads': 'Bonjour ! Je souhaite obtenir des informations sur les services Google Ads et Meta Ads Management.',
        'wordpress': 'Bonjour ! Je souhaite obtenir des informations sur les solutions WordPress CMS et les paquets prêts.',
        'logo-kimlik': 'Bonjour ! Je souhaite obtenir des informations sur le service Logo & Design d\'Identité d\'Entreprise.',
        'yapay-zeka': 'Bonjour ! Je souhaite obtenir des informations sur le service Intégrations d\'Intelligence Artificielle.',
        'danismanlik': 'Bonjour ! Je souhaite obtenir des informations sur le service Conseil Numérique.',
        'default': 'Bonjour ! Je souhaite obtenir des informations sur vos services.'
      },
      ru: {
        'web-gelistirme': 'Здравствуйте! Я хочу получить информацию об услугах разработки веб-приложений.',
        'web-tasarimi': 'Здравствуйте! Я хочу получить информацию об услугах дизайна веб-сайтов.',
        'seo': 'Здравствуйте! Я хочу получить информацию об услугах SEO.',
        'sosyal-medya': 'Здравствуйте! Я хочу получить информацию об услугах управления социальными сетями.',
        'dijital-pazarlama': 'Здравствуйте! Я хочу получить информацию об услугах цифрового маркетинга.',
        'mobil-uygulama': 'Здравствуйте! Я хочу получить информацию об услугах разработки мобильных приложений.',
        'google-ads': 'Здравствуйте! Я хочу получить информацию об услугах Google Ads и Meta Ads Management.',
        'wordpress': 'Здравствуйте! Я хочу получить информацию о решениях WordPress CMS и готовых пакетах.',
        'logo-kimlik': 'Здравствуйте! Я хочу получить информацию об услуге Дизайн Логотипа и Корпоративной Идентичности.',
        'yapay-zeka': 'Здравствуйте! Я хочу получить информацию об услуге Интеграции Искусственного Интеллекта.',
        'danismanlik': 'Здравствуйте! Я хочу получить информацию об услуге Цифрового Консалтинга.',
        'default': 'Здравствуйте! Я хочу получить информацию о ваших услугах.'
      },
      ar: {
        'web-gelistirme': 'مرحبا! أريد الحصول على معلومات حول خدمات تطوير تطبيقات الويب.',
        'web-tasarimi': 'مرحبا! أريد الحصول على معلومات حول خدمات تصميم المواقع.',
        'seo': 'مرحبا! أريد الحصول على معلومات حول خدمات تحسين محركات البحث.',
        'sosyal-medya': 'مرحبا! أريد الحصول على معلومات حول خدمات إدارة وسائل التواصل الاجتماعي.',
        'dijital-pazarlama': 'مرحبا! أريد الحصول على معلومات حول خدمات التسويق الرقمي.',
        'mobil-uygulama': 'مرحبا! أريد الحصول على معلومات حول خدمات تطوير تطبيقات الهواتف المحمولة.',
        'google-ads': 'مرحبا! أريد الحصول على معلومات حول خدمات Google Ads وإدارة Meta Ads.',
        'wordpress': 'مرحبا! أريد الحصول على معلومات حول حلول WordPress CMS والحزم الجاهزة.',
        'logo-kimlik': 'مرحبا! أريد الحصول على معلومات حول خدمة تصميم الشعار والهوية المؤسسية.',
        'yapay-zeka': 'مرحبا! أريد الحصول على معلومات حول خدمة تكاملات الذكاء الاصطناعي.',
        'danismanlik': 'مرحبا! أريد الحصول على معلومات حول خدمة الاستشارات الرقمية.',
        'default': 'مرحبا! أريد الحصول على معلومات حول خدماتكم.'
      }
    }

    const currentMessages = messageMap[currentLocale as keyof typeof messageMap] || messageMap.tr
    return encodeURIComponent(currentMessages[serviceType as keyof typeof currentMessages] || currentMessages.default)
  }

  // Başlığı satır sayısına göre gradient uygulama fonksiyonu
  const renderTitleWithGradient = (title: string) => {
    // Manuel satır sonu kontrolü
    if (title.includes('\n')) {
      const parts = title.split('\n')
      if (parts.length === 2) {
        return (
          <>
            <span className="text-neutral-900 dark:text-white">{parts[0]}</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {parts[1]}
            </span>
          </>
        )
      }
    }
    
    const words = title.split(' ')
    
    // Özel durumlar için kontrol
    if (title === "Yapay Zeka Entegrasyonları") {
      return (
        <>
          <span className="text-neutral-900 dark:text-white">Yapay Zeka</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Entegrasyonları
          </span>
        </>
      )
    }
    
    if (title === "SEO Optimizasyonu") {
      return (
        <>
          <span className="text-neutral-900 dark:text-white">SEO </span>
          <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Optimizasyonu
          </span>
        </>
      )
    }
    
    if (title === "WordPress & CMS Çözümleri") {
      return (
        <>
          <span className="text-neutral-900 dark:text-white">WordPress & CMS</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Çözümleri
          </span>
        </>
      )
    }
    
    if (title === "Logo & Kurumsal Kimlik Tasarımı") {
      return (
        <>
          <span className="text-neutral-900 dark:text-white">Logo & Kurumsal</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Kimlik Tasarımı
          </span>
        </>
      )
    }
    
    if (title === "No-Code / Low-Code Çözümleri") {
      return (
        <>
          <span className="text-neutral-900 dark:text-white">No-Code /</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Low-Code Çözümleri
          </span>
        </>
      )
    }
    
    // Çok kısa başlıklar (≤2 kelime) - son kelimeyi gradient yap
    if (words.length <= 2) {
      const lastWord = words.slice(-1).join(' ')
      const firstWords = words.slice(0, -1).join(' ')
      
      return (
        <>
          {firstWords && <span className="text-neutral-900 dark:text-white">{firstWords} </span>}
          <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            {lastWord}
          </span>
        </>
      )
    }
    
    // Kısa başlıklar (3 kelime) - karakter uzunluğuna göre karar ver
    if (words.length === 3) {
      const totalLength = title.length
      
      // Eğer başlık çok uzunsa (≥25 karakter), iki satıra böl
      if (totalLength >= 25) {
        const firstLine = words.slice(0, 2).join(' ')
        const secondLine = words.slice(2).join(' ')
        
        return (
          <>
            <span className="text-neutral-900 dark:text-white">{firstLine}</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {secondLine}
            </span>
          </>
        )
      } else {
        // Kısa başlıklar için son kelimeyi gradient yap
        const lastWord = words.slice(-1).join(' ')
        const firstWords = words.slice(0, -1).join(' ')
        
        return (
          <>
            <span className="text-neutral-900 dark:text-white">{firstWords} </span>
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {lastWord}
            </span>
          </>
        )
      }
    }
    
    // Orta uzunlukta başlıklar (4-5 kelime) - son 2 kelimeyi gradient yap
    if (words.length <= 5) {
      const lastTwoWords = words.slice(-2).join(' ')
      const firstWords = words.slice(0, -2).join(' ')
      
      return (
        <>
          <span className="text-neutral-900 dark:text-white">{firstWords} </span>
          <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            {lastTwoWords}
          </span>
        </>
      )
    }
    
    // Uzun başlıklar (≥6 kelime) - ikinci satırdaki tüm kelimeleri gradient yap
    // İlk yarısı normal, ikinci yarısı gradient
    const midPoint = Math.floor(words.length / 2)
    const firstLine = words.slice(0, midPoint).join(' ')
    const secondLine = words.slice(midPoint).join(' ')
    
    return (
      <>
        <span className="text-neutral-900 dark:text-white">{firstLine}</span>
        <br />
        <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          {secondLine}
        </span>
      </>
    )
  }

  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[size:20px_20px]"></div>
        
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 via-blue-500/20 to-cyan-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
        
        {/* Additional gradient orbs for depth */}
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-gradient-to-bl from-sky-500/15 via-cyan-500/15 to-transparent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-gradient-to-tr from-blue-500/15 via-cyan-500/15 to-transparent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl opacity-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-10 w-48 h-48 bg-gradient-to-l from-indigo-500/20 via-blue-500/20 to-transparent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        
        {/* Background icons */}
        <div className="absolute top-1/6 left-1/6 opacity-5">
          <Globe className="h-12 w-12 text-cyan-500" />
        </div>
        <div className="absolute top-1/3 right-1/6 opacity-5">
          <Code className="h-10 w-10 text-blue-500" />
        </div>
        <div className="absolute bottom-1/3 left-1/5 opacity-5">
          <Palette className="h-14 w-14 text-cyan-400" />
        </div>
        <div className="absolute bottom-1/6 right-1/5 opacity-5">
          <Search className="h-8 w-8 text-blue-400" />
        </div>
        <div className="absolute top-1/4 left-1/4 opacity-5">
          <Shield className="h-6 w-6 text-cyan-300" />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-5">
          <Target className="h-8 w-8 text-blue-300" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-5">
          <Zap className="h-10 w-10 text-cyan-200" />
        </div>
        <div className="absolute top-2/3 left-1/2 opacity-5">
          <Star className="h-16 w-16 text-blue-200" />
        </div>
        <div className="absolute top-1/5 right-1/3 opacity-5">
          <Sparkles className="h-7 w-7 text-cyan-100" />
        </div>
        <div className="absolute bottom-1/5 right-1/3 opacity-5">
          <Users className="h-9 w-9 text-blue-100" />
        </div>
        <div className="absolute top-3/4 left-1/4 opacity-5">
          <Award className="h-11 w-11 text-cyan-50" />
        </div>
        <div className="absolute bottom-1/2 right-1/2 opacity-5">
          <Clock className="h-13 w-13 text-blue-50" />
        </div>
        <div className="absolute top-1/8 left-1/8 opacity-5">
          <Globe className="h-5 w-5 text-cyan-400" />
        </div>
        <div className="absolute top-5/6 right-1/8 opacity-5">
          <Code className="h-7 w-7 text-blue-400" />
        </div>
        <div className="absolute bottom-1/8 left-1/8 opacity-5">
          <Palette className="h-9 w-9 text-cyan-300" />
        </div>
        <div className="absolute top-1/2 left-1/8 opacity-5">
          <Search className="h-6 w-6 text-blue-300" />
        </div>
        <div className="absolute top-1/12 left-1/12 opacity-5">
          <Shield className="h-8 w-8 text-cyan-400" />
        </div>
        <div className="absolute top-1/12 right-1/12 opacity-5">
          <Target className="h-7 w-7 text-blue-400" />
        </div>
        <div className="absolute top-1/8 right-1/3 opacity-5">
          <Zap className="h-9 w-9 text-cyan-300" />
        </div>
        <div className="absolute top-1/6 right-1/2 opacity-5">
          <Star className="h-6 w-6 text-blue-300" />
        </div>
        <div className="absolute top-1/4 left-1/6 opacity-5">
          <Sparkles className="h-8 w-8 text-cyan-200" />
        </div>
        <div className="absolute top-1/5 left-1/2 opacity-5">
          <Users className="h-7 w-7 text-blue-200" />
        </div>
        <div className="absolute top-1/3 left-1/12 opacity-5">
          <Award className="h-9 w-9 text-cyan-100" />
        </div>
        <div className="absolute top-1/4 right-1/6 opacity-5">
          <Clock className="h-8 w-8 text-blue-100" />
        </div>
        <div className="absolute top-1/6 left-1/3 opacity-5">
          <Globe className="h-6 w-6 text-cyan-50" />
        </div>
        <div className="absolute top-1/8 left-1/2 opacity-5">
          <Code className="h-7 w-7 text-blue-50" />
        </div>
        <div className="absolute top-1/5 right-1/5 opacity-5">
          <Palette className="h-5 w-5 text-cyan-300" />
        </div>
        <div className="absolute top-1/7 left-1/5 opacity-5">
          <Search className="h-6 w-6 text-blue-300" />
        </div>
        <div className="absolute top-1/9 right-1/7 opacity-5">
          <Shield className="h-7 w-7 text-cyan-200" />
        </div>
        <div className="absolute top-1/10 left-1/7 opacity-5">
          <Target className="h-5 w-5 text-blue-200" />
        </div>
      </div>
      
      {/* Hero Content Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-20 pb-4 lg:pt-32 lg:pb-8">
        {/* Mobile Layout - Alt Alta */}
        <div className="lg:hidden text-center">
          {/* Page Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center space-x-2 rounded-full px-4 py-2 shadow-modern mb-4 w-fit mx-auto"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            {(() => {
              switch (data.serviceType) {
                case 'web-gelistirme':
                return <Code className="h-5 w-5 text-cyan-500" />
                case 'web-tasarimi':
                return <Globe className="h-5 w-5 text-cyan-500" />
                case 'mobil-uygulama':
                return <Smartphone className="h-5 w-5 text-cyan-500" />
                case 'seo':
                return <Search className="h-5 w-5 text-cyan-500" />
                case 'google-ads':
                return <Target className="h-5 w-5 text-cyan-500" />
                case 'wordpress':
                return <FileText className="h-5 w-5 text-cyan-500" />
                case 'logo-kimlik':
                return <Palette className="h-5 w-5 text-cyan-500" />
                case 'sosyal-medya':
                return <Share2 className="h-5 w-5 text-cyan-500" />
                case 'yapay-zeka':
                return <Bot className="h-5 w-5 text-cyan-500" />
                case 'danismanlik':
                return <Users className="h-5 w-5 text-cyan-500" />
                default:
                return <Globe className="h-5 w-5 text-cyan-500" />
              }
            })()}
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {data.subtitle}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {renderTitleWithGradient(data.title)}
          </motion.h1>
          
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 space-y-2"
          >
            <p>{data.description}</p>
          </motion.div>
      
          {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.a
              href={`/${typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'tr'}/iletisim`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600"
            >
              <span>{t('serviceHero.startNow', 'Hemen Başlayın')}</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>

            <motion.a
              href={`https://wa.me/905411883045?text=${getWhatsAppMessage(data.serviceType)}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>{t('serviceHero.whatsappChat', 'WhatsApp Sohbet')}</span>
            </motion.a>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              <Image
                src={getServiceImage(data.serviceType)}
                alt={data.title}
                width={400}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout - Yan Yana */}
        <div className="hidden lg:flex items-center justify-between min-h-[60vh]">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
            className="flex-1 text-left lg:max-w-3xl xl:max-w-4xl"
        >
            {/* Page Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center space-x-2 rounded-full px-4 py-2 shadow-modern mb-4 w-fit"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              {(() => {
                switch (data.serviceType) {
                  case 'web-gelistirme':
                  return <Code className="h-5 w-5 text-cyan-500" />
                  case 'web-tasarimi':
                  return <Globe className="h-5 w-5 text-cyan-500" />
                  case 'mobil-uygulama':
                  return <Smartphone className="h-5 w-5 text-cyan-500" />
                  case 'seo':
                  return <Search className="h-5 w-5 text-cyan-500" />
                  case 'google-ads':
                  return <Target className="h-5 w-5 text-cyan-500" />
                  case 'wordpress':
                  return <FileText className="h-5 w-5 text-cyan-500" />
                  case 'logo-kimlik':
                  return <Palette className="h-5 w-5 text-cyan-500" />
                  case 'sosyal-medya':
                  return <Share2 className="h-5 w-5 text-cyan-500" />
                  case 'yapay-zeka':
                  return <Bot className="h-5 w-5 text-cyan-500" />
                  return <Zap className="h-5 w-5 text-cyan-500" />
                  case 'danismanlik':
                  return <Users className="h-5 w-5 text-cyan-500" />
                  default:
                  return <Globe className="h-5 w-5 text-cyan-500" />
                }
              })()}
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                {data.subtitle}
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight">
              {renderTitleWithGradient(data.title)}
            </h1>
            
            {/* Description */}
            <div className="text-lg lg:text-xl text-gray-300 mb-10 space-y-2">
              <p>{data.description}</p>
            </div>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              <motion.button
                onClick={(e) => {
                  e.preventDefault();

                  // Element yüklenene kadar bekle ve scroll yap
                  const scrollToServiceDetails = () => {
                    const serviceDetailsElement = document.getElementById('service-details');
                    if (serviceDetailsElement) {
                      // Element bulundu, scroll yap
                      serviceDetailsElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                      });
                      return true;
                    }
                    return false;
                  };

                  // Hemen dene
                  if (!scrollToServiceDetails()) {
                    // Element yoksa, yüklenene kadar bekle (maksimum 5 saniye)
                    let attempts = 0;
                    const maxAttempts = 50; // 50 * 100ms = 5 saniye
                    const interval = setInterval(() => {
                      attempts++;
                      if (scrollToServiceDetails()) {
                        clearInterval(interval);
                      } else if (attempts >= maxAttempts) {
                        clearInterval(interval);
                        console.warn('Service details element not found after 5 seconds');
                      }
                    }, 100);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 cursor-pointer"
              >
                <span>{t('serviceHero.startNow', 'Hemen Başlayın')}</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
                
              <motion.a
                href={`https://wa.me/905411883045?text=${getWhatsAppMessage(data.serviceType)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{t('serviceHero.whatsappChat', 'WhatsApp Sohbet')}</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Service Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-none lg:max-w-md xl:max-w-lg flex justify-end"
          >
            <div className="relative w-full max-w-xl xl:max-w-2xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
              <Image
                src={getServiceImage(data.serviceType)}
                alt={data.title}
                width={800}
                height={800}
                className="w-full h-auto object-contain lg:translate-x-4 xl:translate-x-6 scale-110 lg:scale-125 xl:scale-135"
                priority
              />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Service Features Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.features.map((feature, index) => {
            // Icon mapping for all service types
            const getIcon = (title: string) => {
              switch (title) {
                case "Özel Çözüm":
                  return Code
                case "Entegrasyon Kabiliyeti":
                  return Layers
                case "Ölçeklenebilirlik":
                  return TrendingUp
                case "Güvenlik & Hız":
                  return Shield
                // Web development translations
                case "Custom Solution":
                  return Code
                case "Integrations":
                  return Layers
                case "Scalability":
                  return TrendingUp
                case "Security & Speed":
                  return Shield
                case "Maßgeschneiderte Lösung":
                  return Code
                case "Integrationen":
                  return Layers
                case "Skalierbarkeit":
                  return TrendingUp
                case "Sicherheit & Geschwindigkeit":
                  return Shield
                case "Solution sur mesure":
                  return Code
                case "Intégrations":
                  return Layers
                case "Scalabilité":
                  return TrendingUp
                case "Sécurité & Vitesse":
                  return Shield
                case "Кастомное решение":
                  return Code
                case "Интеграции":
                  return Layers
                case "Масштабируемость":
                  return TrendingUp
                case "Безопасность и скорость":
                  return Shield
                case "حل مخصص":
                  return Code
                case "تكاملات":
                  return Layers
                case "قابلية التوسع":
                  return TrendingUp
                case "الأمان والسرعة":
                  return Shield
                case "7-14 Gün İçinde Yayında":
                  return Zap
                case "Mobil Uyumlu & Hızlı":
                  return Smartphone
                case "SEO Altyapısı Hazır":
                  return Target
                case "Revizyon Hakkı":
                  return Star
                // English translations - Website Design features
                case "Live in 7-14 Days":
                  return Zap
                case "Mobile Friendly & Fast":
                  return Smartphone
                case "SEO Infrastructure Ready":
                  return Target
                case "Revision Rights":
                  return Star
                // French translations - Website Design features
                case "En Ligne en 7-14 Jours":
                  return Zap
                case "Adapté Mobile & Rapide":
                  return Smartphone
                case "Infrastructure SEO Prête":
                  return Target
                case "Droits de Révision":
                  return Star
                // German translations - Website Design features
                case "Live in 7-14 Tagen":
                  return Zap
                case "Mobile-Freundlich & Schnell":
                  return Smartphone
                case "SEO-Infrastruktur Bereit":
                  return Target
                case "Revisionsrechte":
                  return Star
                // Russian translations - Website Design features
                case "Запуск за 7-14 Дней":
                  return Zap
                case "Адаптивный & Быстрый":
                  return Smartphone
                case "SEO-инфраструктура Готова":
                  return Target
                case "Права на Ревизию":
                  return Star
                // Arabic translations - Website Design features
                case "مباشر خلال 7-14 يوم":
                  return Zap
                case "متوافق مع الهواتف & سريع":
                  return Smartphone
                case "البنية التحتية لـ SEO جاهزة":
                  return Target
                case "حقوق المراجعة":
                  return Star
                // Database Integration icon translations
                case "Database Integration":
                  return Database
                case "Datenbank-Integration":
                  return Database
                case "Intégration Base de Données":
                  return Database
                case "Интеграция БД":
                  return Database
                case "تكامل قاعدة البيانات":
                  return Database
                // API First Approach icon translations
                case "API First Approach":
                  return Search
                case "API-First-Ansatz":
                  return Search
                case "Approche API First":
                  return Search
                case "API‑First подход":
                  return Search
                case "نهج API First":
                  return Search
                // Mobil uygulama özellikleri
                case "Hızlı MVP":
                  return Zap
                case "Tek Kod Tabanı":
                  return Code
                case "Özelleştirilebilir":
                  return Target
                case "Uzun Vadeli Destek":
                  return Shield
                // Mobile app translations
                case "Fast MVP":
                  return Zap
                case "Single Codebase":
                  return Code
                case "Customizable":
                  return Target
                case "Long-term Support":
                  return Shield
                case "Schnelles MVP":
                  return Zap
                case "Einzige Codebasis":
                  return Code
                case "Anpassbar":
                  return Target
                case "Langfristiger Support":
                  return Shield
                case "MVP Rapide":
                  return Zap
                case "Base de Code Unique":
                  return Code
                case "Personnalisable":
                  return Target
                case "Support Long Terme":
                  return Shield
                case "Быстрый MVP":
                  return Zap
                case "Единая кодовая база":
                  return Code
                case "Настраиваемый":
                  return Target
                case "Долгосрочная поддержка":
                  return Shield
                case "MVP سريع":
                  return Zap
                case "قاعدة كود واحدة":
                  return Code
                case "قابل للتخصيص":
                  return Target
                case "دعم طويل الأمد":
                  return Shield
                // SEO özellikleri
                case "Google Rank Artışı":
                  return TrendingUp
                case "Organik Trafik Kazanımı":
                  return BarChart3
                case "Rakip Analizi":
                  return Target
                case "ROI Odaklı Sonuç":
                  return Zap
                // SEO translations
                case "Google Rank Increase":
                  return TrendingUp
                case "Organic Traffic Gain":
                  return BarChart3
                case "Competitor Analysis":
                  return Target
                case "ROI-Focused Results":
                  return Zap
                case "Google-Ranking-Steigerung":
                  return TrendingUp
                case "Organischer Traffic-Gewinn":
                  return BarChart3
                case "Wettbewerbsanalyse":
                  return Target
                case "ROI-orientierte Ergebnisse":
                  return Zap
                case "Amélioration du classement Google":
                  return TrendingUp
                case "Gain de trafic organique":
                  return BarChart3
                case "Analyse concurrentielle":
                  return Target
                case "Résultats axés ROI":
                  return Zap
                case "Рост позиций в Google":
                  return TrendingUp
                case "Прирост органического трафика":
                  return BarChart3
                case "Анализ конкурентов":
                  return Target
                case "Результаты с фокусом на ROI":
                  return Zap
                case "زيادة الترتيب في Google":
                  return TrendingUp
                case "زيادة الزيارات العضوية":
                  return BarChart3
                case "تحليل المنافسين":
                  return Target
                case "نتائج تركز على ROI":
                  return Zap
                // Google Ads özellikleri
                case "Hedefli Kampanyalar":
                 	return Target
                case "ROI Artış Garantisi":
                  return TrendingUp
                case "Gerçek Zamanlı Optimizasyon":
                  return Zap
                case "Profesyonel Tasarım":
                 	return Palette
                // Google Ads translations
                case "Targeted Campaigns":
                  return Target
                case "ROI Increase Guarantee":
                  return TrendingUp
                case "Real-time Optimization":
                  return Zap
                case "Professional Design":
                  return Palette
                case "Zielgerichtete Kampagnen":
                  return Target
                case "ROI-Steigerungsgarantie":
                  return TrendingUp
                case "Echtzeitoptimierung":
                  return Zap
                case "Professionelles Design":
                  return Palette
                case "Campagnes Ciblées":
                  return Target
                case "Garantie d'augmentation du ROI":
                  return TrendingUp
                case "Optimisation en Temps Réel":
                  return Zap
                case "Design Professionnel":
                  return Palette
                case "Целевые Кампании":
                  return Target
                case "Гарантия Роста ROI":
                  return TrendingUp
                case "Оптимизация в Реальном Времени":
                  return Zap
                case "Профессиональный Дизайн":
                  return Palette
                case "حملات مستهدفة":
                  return Target
                case "ضمان زيادة ROI":
                  return TrendingUp
                case "التحسين في الوقت الفعلي":
                  return Zap
                case "تصميم احترافي":
                  return Palette
                // WordPress CMS özellikleri
                case "Kolay Yönetim":
                  return Settings
                case "Plugin Entegrasyonu":
                  return Layers
                case "Güvenlik":
                  return Shield
                case "SEO Hazır":
                  return Search
                // WordPress translations
                case "Easy Management":
                  return Settings
                case "Plugin Integration":
                  return Layers
                case "Security":
                  return Shield
                case "SEO Ready":
                  return Search
                case "Einfache Verwaltung":
                  return Settings
                case "Plugin-Integration":
                  return Layers
                case "Sicherheit":
                  return Shield
                case "SEO-Bereit":
                  return Search
                case "Gestion Facile":
                  return Settings
                case "Intégration de Plugins":
                  return Layers
                case "Sécurité":
                  return Shield
                case "SEO Prêt":
                  return Search
                case "Простое Управление":
                  return Settings
                case "Интеграция Плагинов":
                  return Layers
                case "Безопасность":
                  return Shield
                case "SEO Готов":
                  return Search
                case "إدارة سهلة":
                  return Settings
                case "تكامل الإضافات":
                  return Layers
                case "الأمان":
                  return Shield
                case "SEO جاهز":
                  return Search
                // Logo & Kurumsal Kimlik özellikleri
                case "Özgün Logo Tasarımı":
                  return Palette
                case "Kurumsal Renk Paleti":
                  return Layers
                case "Tipografi Seçimi":
                  return FileText
                case "Brandbook Kılavuzu":
                  return BookOpen
                // Logo & Corporate Identity translations
                case "Custom Logo Design":
                  return Palette
                case "Brand Identity":
                  return Layers
                case "Typography":
                  return FileText
                case "Brandbook Guide":
                  return BookOpen
                case "Logo-Design":
                  return Palette
                case "Markenidentität":
                  return Layers
                case "Typografie":
                  return FileText
                case "Brandbook Leitfaden":
                  return BookOpen
                case "Design de Logo":
                  return Palette
                case "Identité de Marque":
                  return Layers
                case "Typographie":
                  return FileText
                case "Guide Brandbook":
                  return BookOpen
                case "Дизайн Логотипа":
                  return Palette
                case "Фирменный Стиль":
                  return Layers
                case "Типографика":
                  return FileText
                case "Гайд Brandbook":
                  return BookOpen
                case "تصميم الشعار":
                  return Palette
                case "هوية العلامة":
                  return Layers
                case "الخطوط":
                  return FileText
                case "دليل Brandbook":
                  return BookOpen
                // Sosyal Medya özellikleri
                case "İçerik Üretimi":
                case "Content Production":
                case "Content-Produktion":
                case "Production de Contenu":
                case "Создание Контента":
                case "إنتاج المحتوى":
                  return Share2
                case "Görsel Tasarım":
                case "Visual Design":
                case "Visuelles Design":
                case "Design Visuel":
                case "Визуальный Дизайн":
                case "التصميم المرئي":
                  return Palette
                case "Topluluk Yönetimi":
                case "Community Management":
                case "Community-Management":
                case "Gestion Communautaire":
                case "Управление Сообществом":
                case "إدارة المجتمع":
                  return Users
                case "Analiz & Raporlama":
                case "Analytics & Reporting":
                case "Analyse & Berichterstattung":
                case "Analyse & Rapports":
                case "Анализ & Отчеты":
                case "التحليل & التقارير":
                  return BarChart3
                case "Strateji Geliştirme":
                case "Strategy Development":
                case "Strategieentwicklung":
                case "Développement Stratégique":
                case "Разработка Стратегии":
                case "تطوير الاستراتيجية":
                  return Target
                case "Hızlı Yayın":
                case "Fast Publishing":
                case "Schnelle Veröffentlichung":
                case "Publication Rapide":
                case "Быстрая Публикация":
                case "النشر السريع":
                  return Zap
                // Yapay Zeka özellikleri
                case "Chatbot Geliştirme":
                case "Chatbot Development":
                case "Chatbot-Entwicklung":
                case "Développement de Chatbot":
                case "Разработка Чатбота":
                case "تطوير الدردشة":
                  return Bot
                case "Makine Öğrenmesi":
                case "Machine Learning":
                case "Maschinelles Lernen":
                case "Apprentissage Automatique":
                case "Машинное Обучение":
                case "التعلم الآلي":
                  return Database
                case "Doğal Dil İşleme":
                case "Natural Language Processing":
                case "Natürliche Sprachverarbeitung":
                case "Traitement du Langage Naturel":
                case "Обработка Естественного Языка":
                case "معالجة اللغة الطبيعية":
                  return FileText
                case "İş Süreci Otomasyonu":
                case "Business Process Automation":
                case "Geschäftsprozessautomatisierung":
                case "Automatisation des Processus":
                case "Автоматизация Бизнес-Процессов":
                case "أتمتة العمليات":
                  return Settings
                case "Görüntü İşleme":
                case "Image Processing":
                case "Bildverarbeitung":
                case "Traitement d'Image":
                case "Обработка Изображений":
                case "معالجة الصور":
                  return Eye
                case "Gerçek Zamanlı Analiz":
                case "Real-time Analysis":
                case "Echtzeitanalyse":
                case "Analyse en Temps Réel":
                case "Анализ в Реальном Времени":
                case "التحليل في الوقت الفعلي":
                  return Zap
                case "Süreç Analizi":
                  return Search
                case "API Entegrasyonları":
                  return Layers
                case "Workflow Tasarımı":
                  return FileText
                case "Monitoring":
                  return BarChart3
                // Danışmanlık özellikleri
                case "Strateji Geliştirme":
                case "Strategy Development":
                case "Strategieentwicklung":
                case "Développement Stratégique":
                case "Разработка Стратегии":
                case "تطوير الإستراتيجية":
                  return Target
                case "Teknoloji Seçimi":
                case "Technology Selection":
                case "Technologieauswahl":
                case "Choix Technologique":
                case "Выбор Технологий":
                case "اختيار التقنية":
                  return Settings
                case "Süreç İyileştirme":
                case "Process Improvement":
                case "Prozessoptimierung":
                case "Amélioration des Processus":
                case "Оптимизация Процессов":
                case "تحسين العمليات":
                  return TrendingUp
                case "Eğitim & Mentorluk":
                case "Training & Mentoring":
                case "Schulung & Mentoring":
                case "Formation & Mentorat":
                case "Обучение & Менторство":
                case "التدريب والإرشاد":
                  return Users
                // No-code özellikleri
                case "Hızlı Geliştirme":
                  return Zap
                case "Maliyet Etkin":
                  return DollarSign
                case "Kolay Yönetim":
                  return Users
                case "Hızlı İterasyon":
                  return RefreshCw
                // Eğitim özellikleri
                case "Kişiselleştirilmiş Eğitim":
                  return Users
                case "Uygulamalı Öğrenme":
                  return Wrench
                case "1:1 Mentorluk":
                  return Target
                case "Sertifika Programı":
                  return Award
                default:
                  return CheckCircle
              }
            }
            
            const IconComponent = getIcon(feature.title)
            const getIconColor = (title: string) => {
              switch (title) {
                case "Özel Çözüm":
                  return "from-blue-600 to-purple-600"
                case "Entegrasyon Kabiliyeti":
                  return "from-emerald-500 to-teal-600"
                case "Ölçeklenebilirlik":
                  return "from-amber-500 to-orange-600"
                case "Güvenlik & Hız":
                  return "from-red-500 to-pink-600"
                // Web development translations colors
                case "Custom Solution":
                  return "from-blue-600 to-purple-600"
                case "Integrations":
                  return "from-emerald-500 to-teal-600"
                case "Scalability":
                  return "from-amber-500 to-orange-600"
                case "Security & Speed":
                  return "from-red-500 to-pink-600"
                case "Maßgeschneiderte Lösung":
                  return "from-blue-600 to-purple-600"
                case "Integrationen":
                  return "from-emerald-500 to-teal-600"
                case "Skalierbarkeit":
                  return "from-amber-500 to-orange-600"
                case "Sicherheit & Geschwindigkeit":
                  return "from-red-500 to-pink-600"
                case "Solution sur mesure":
                  return "from-blue-600 to-purple-600"
                case "Intégrations":
                  return "from-emerald-500 to-teal-600"
                case "Scalabilité":
                  return "from-amber-500 to-orange-600"
                case "Sécurité & Vitesse":
                  return "from-red-500 to-pink-600"
                case "Кастомное решение":
                  return "from-blue-600 to-purple-600"
                case "Интеграции":
                  return "from-emerald-500 to-teal-600"
                case "Масштабируемость":
                  return "from-amber-500 to-orange-600"
                case "Безопасность и скорость":
                  return "from-red-500 to-pink-600"
                case "حل مخصص":
                  return "from-blue-600 to-purple-600"
                case "تكاملات":
                  return "from-emerald-500 to-teal-600"
                case "قابلية التوسع":
                  return "from-amber-500 to-orange-600"
                case "الأمان والسرعة":
                  return "from-red-500 to-pink-600"
                // Database Integration colors
                case "Database Integration":
                  return "from-indigo-500 to-blue-500"
                case "Datenbank-Integration":
                  return "from-indigo-500 to-blue-500"
                case "Intégration Base de Données":
                  return "from-indigo-500 to-blue-500"
                case "Интеграция БД":
                  return "from-indigo-500 to-blue-500"
                case "تكامل قاعدة البيانات":
                  return "from-indigo-500 to-blue-500"
                // API First Approach colors
                case "API First Approach":
                  return "from-purple-500 to-violet-500"
                case "API-First-Ansatz":
                  return "from-purple-500 to-violet-500"
                case "Approche API First":
                  return "from-purple-500 to-violet-500"
                case "API‑First подход":
                  return "from-purple-500 to-violet-500"
                case "نهج API First":
                  return "from-purple-500 to-violet-500"
                // Mobile app feature colors
                case "Hızlı MVP":
                  return "from-yellow-500 to-orange-500"
                case "Tek Kod Tabanı":
                  return "from-blue-500 to-indigo-600"
                case "Özelleştirilebilir":
                  return "from-purple-500 to-pink-500"
                case "Uzun Vadeli Destek":
                  return "from-green-500 to-teal-500"
                case "Fast MVP":
                  return "from-yellow-500 to-orange-500"
                case "Single Codebase":
                  return "from-blue-500 to-indigo-600"
                case "Customizable":
                  return "from-purple-500 to-pink-500"
                case "Long-term Support":
                  return "from-green-500 to-teal-500"
                case "Schnelles MVP":
                  return "from-yellow-500 to-orange-500"
                case "Einzige Codebasis":
                  return "from-blue-500 to-indigo-600"
                case "Anpassbar":
                  return "from-purple-500 to-pink-500"
                case "Langfristiger Support":
                  return "from-green-500 to-teal-500"
                case "MVP Rapide":
                  return "from-yellow-500 to-orange-500"
                case "Base de Code Unique":
                  return "from-blue-500 to-indigo-600"
                case "Personnalisable":
                  return "from-purple-500 to-pink-500"
                case "Support Long Terme":
                  return "from-green-500 to-teal-500"
                case "Быстрый MVP":
                  return "from-yellow-500 to-orange-500"
                case "Единая кодовая база":
                  return "from-blue-500 to-indigo-600"
                case "Настраиваемый":
                  return "from-purple-500 to-pink-500"
                case "Долгосрочная поддержка":
                  return "from-green-500 to-teal-500"
                case "MVP سريع":
                  return "from-yellow-500 to-orange-500"
                case "قاعدة كود واحدة":
                  return "from-blue-500 to-indigo-600"
                case "قابل للتخصيص":
                  return "from-purple-500 to-pink-500"
                case "دعم طويل الأمد":
                  return "from-green-500 to-teal-500"
                // SEO feature colors
                case "Google Rank Artışı":
                  return "from-orange-500 to-red-500"
                case "Organik Trafik Kazanımı":
                  return "from-blue-500 to-cyan-500"
                case "Rakip Analizi":
                  return "from-purple-500 to-pink-500"
                case "ROI Odaklı Sonuç":
                  return "from-green-500 to-emerald-500"
                case "Google Rank Increase":
                  return "from-orange-500 to-red-500"
                case "Organic Traffic Gain":
                  return "from-blue-500 to-cyan-500"
                case "Competitor Analysis":
                  return "from-purple-500 to-pink-500"
                case "ROI-Focused Results":
                  return "from-green-500 to-emerald-500"
                case "Google-Ranking-Steigerung":
                  return "from-orange-500 to-red-500"
                case "Organischer Traffic-Gewinn":
                  return "from-blue-500 to-cyan-500"
                case "Wettbewerbsanalyse":
                  return "from-purple-500 to-pink-500"
                case "ROI-orientierte Ergebnisse":
                  return "from-green-500 to-emerald-500"
                case "Amélioration du classement Google":
                  return "from-orange-500 to-red-500"
                case "Gain de trafic organique":
                  return "from-blue-500 to-cyan-500"
                case "Analyse concurrentielle":
                  return "from-purple-500 to-pink-500"
                case "Résultats axés ROI":
                  return "from-green-500 to-emerald-500"
                case "Рост позиций в Google":
                  return "from-orange-500 to-red-500"
                case "Прирост органического трафика":
                  return "from-blue-500 to-cyan-500"
                case "Анализ конкурентов":
                  return "from-purple-500 to-pink-500"
                case "Результаты с фокусом на ROI":
                  return "from-green-500 to-emerald-500"
                case "زيادة الترتيب في Google":
                  return "from-orange-500 to-red-500"
                case "زيادة الزيارات العضوية":
                  return "from-blue-500 to-cyan-500"
                case "تحليل المنافسين":
                  return "from-purple-500 to-pink-500"
                case "نتائج تركز على ROI":
                  return "from-green-500 to-emerald-500"
                // Google Ads feature colors
                case "Hedefli Kampanyalar":
                  return "from-red-500 to-pink-500"
                case "ROI Artış Garantisi":
                  return "from-green-500 to-emerald-500"
                case "Gerçek Zamanlı Optimizasyon":
                  return "from-yellow-500 to-orange-500"
                case "Profesyonel Tasarım":
                  return "from-purple-500 to-pink-500"
                case "Targeted Campaigns":
                  return "from-red-500 to-pink-500"
                case "ROI Increase Guarantee":
                  return "from-green-500 to-emerald-500"
                case "Real-time Optimization":
                  return "from-yellow-500 to-orange-500"
                case "Professional Design":
                  return "from-purple-500 to-pink-500"
                case "Zielgerichtete Kampagnen":
                  return "from-red-500 to-pink-500"
                case "ROI-Steigerungsgarantie":
                  return "from-green-500 to-emerald-500"
                case "Echtzeitoptimierung":
                  return "from-yellow-500 to-orange-500"
                case "Professionelles Design":
                  return "from-purple-500 to-pink-500"
                case "Campagnes Ciblées":
                  return "from-red-500 to-pink-500"
                case "Garantie d'augmentation du ROI":
                  return "from-green-500 to-emerald-500"
                case "Optimisation en Temps Réel":
                  return "from-yellow-500 to-orange-500"
                case "Design Professionnel":
                  return "from-purple-500 to-pink-500"
                case "Целевые Кампании":
                  return "from-red-500 to-pink-500"
                case "Гарантия Роста ROI":
                  return "from-green-500 to-emerald-500"
                case "Оптимизация в Реальном Времени":
                  return "from-yellow-500 to-orange-500"
                case "Профессиональный Дизайн":
                  return "from-purple-500 to-pink-500"
                case "حملات مستهدفة":
                  return "from-red-500 to-pink-500"
                case "ضمان زيادة ROI":
                  return "from-green-500 to-emerald-500"
                case "التحسين في الوقت الفعلي":
                  return "from-yellow-500 to-orange-500"
                case "تصميم احترافي":
                  return "from-purple-500 to-pink-500"
                // WordPress feature colors
                case "Kolay Yönetim":
                  return "from-orange-500 to-red-500"
                case "Plugin Entegrasyonu":
                  return "from-purple-500 to-violet-500"
                case "Güvenlik":
                  return "from-red-500 to-pink-500"
                case "SEO Hazır":
                  return "from-green-500 to-emerald-500"
                case "Easy Management":
                  return "from-orange-500 to-red-500"
                case "Plugin Integration":
                  return "from-purple-500 to-violet-500"
                case "Security":
                  return "from-red-500 to-pink-500"
                case "SEO Ready":
                  return "from-green-500 to-emerald-500"
                case "Einfache Verwaltung":
                  return "from-orange-500 to-red-500"
                case "Plugin-Integration":
                  return "from-purple-500 to-violet-500"
                case "Sicherheit":
                  return "from-red-500 to-pink-500"
                case "SEO-Bereit":
                  return "from-green-500 to-emerald-500"
                case "Gestion Facile":
                  return "from-orange-500 to-red-500"
                case "Intégration de Plugins":
                  return "from-purple-500 to-violet-500"
                case "Sécurité":
                  return "from-red-500 to-pink-500"
                case "SEO Prêt":
                  return "from-green-500 to-emerald-500"
                case "Простое Управление":
                  return "from-orange-500 to-red-500"
                case "Интеграция Плагинов":
                  return "from-purple-500 to-violet-500"
                case "Безопасность":
                  return "from-red-500 to-pink-500"
                case "SEO Готов":
                  return "from-green-500 to-emerald-500"
                case "إدارة سهلة":
                  return "from-orange-500 to-red-500"
                case "تكامل الإضافات":
                  return "from-purple-500 to-violet-500"
                case "الأمان":
                  return "from-red-500 to-pink-500"
                case "SEO جاهز":
                  return "from-green-500 to-emerald-500"
                case "7-14 Gün İçinde Yayında":
                  return "from-orange-500 to-red-500"
                case "Mobil Uyumlu & Hızlı":
                  return "from-blue-500 to-cyan-500"
                case "SEO Altyapısı Hazır":
                  return "from-green-500 to-emerald-500"
                case "Revizyon Hakkı":
                  return "from-purple-500 to-pink-500"
                // English translations - Website Design colors
                case "Live in 7-14 Days":
                  return "from-orange-500 to-red-500"
                case "Mobile Friendly & Fast":
                  return "from-blue-500 to-cyan-500"
                case "SEO Infrastructure Ready":
                  return "from-green-500 to-emerald-500"
                case "Revision Rights":
                  return "from-purple-500 to-pink-500"
                // French translations - Website Design colors
                case "En Ligne en 7-14 Jours":
                  return "from-orange-500 to-red-500"
                case "Adapté Mobile & Rapide":
                  return "from-blue-500 to-cyan-500"
                case "Infrastructure SEO Prête":
                  return "from-green-500 to-emerald-500"
                case "Droits de Révision":
                  return "from-purple-500 to-pink-500"
                // German translations - Website Design colors
                case "Live in 7-14 Tagen":
                  return "from-orange-500 to-red-500"
                case "Mobile-Freundlich & Schnell":
                  return "from-blue-500 to-cyan-500"
                case "SEO-Infrastruktur Bereit":
                  return "from-green-500 to-emerald-500"
                case "Revisionsrechte":
                  return "from-purple-500 to-pink-500"
                // Russian translations - Website Design colors
                case "Запуск за 7-14 Дней":
                  return "from-orange-500 to-red-500"
                case "Адаптивный & Быстрый":
                  return "from-blue-500 to-cyan-500"
                case "SEO-инфраструктура Готова":
                  return "from-green-500 to-emerald-500"
                case "Права на Ревизию":
                  return "from-purple-500 to-pink-500"
                // Arabic translations - Website Design colors
                case "مباشر خلال 7-14 يوم":
                  return "from-orange-500 to-red-500"
                case "متوافق مع الهواتف & سريع":
                  return "from-blue-500 to-cyan-500"
                case "البنية التحتية لـ SEO جاهزة":
                  return "from-green-500 to-emerald-500"
                case "حقوق المراجعة":
                  return "from-purple-500 to-pink-500"
                // Mobil uygulama özellikleri için renkler
                case "Hızlı MVP":
                  return "from-yellow-500 to-orange-500"
                case "Tek Kod Tabanı":
                  return "from-blue-500 to-indigo-600"
                case "Özelleştirilebilir":
                  return "from-purple-500 to-pink-500"
                case "Uzun Vadeli Destek":
                  return "from-green-500 to-teal-500"
                // SEO renkleri
                case "Google Rank Artışı":
                  return "from-emerald-500 to-green-600"
                case "Organik Trafik Kazanımı":
                  return "from-blue-500 to-cyan-600"
                case "Rakip Analizi":
                  return "from-orange-500 to-red-500"
                case "ROI Odaklı Sonuç":
                  return "from-yellow-500 to-orange-500"
                // Google Ads renkleri
                case "Hedefli Kampanyalar":
                  return "from-red-500 to-pink-500"
                case "ROI Artış Garantisi":
                  return "from-green-500 to-emerald-500"
                case "Gerçek Zamanlı Optimizasyon":
                  return "from-blue-500 to-indigo-500"
                case "Profesyonel Tasarım":
                  return "from-purple-500 to-violet-500"
                // WordPress CMS renkleri
                case "Kolay Yönetim":
                  return "from-orange-500 to-red-500"
                case "Plugin Entegrasyonu":
                  return "from-purple-500 to-violet-500"
                case "Güvenlik":
                  return "from-red-500 to-pink-500"
                case "SEO Hazır":
                  return "from-green-500 to-emerald-500"
                // Logo & Kurumsal Kimlik renkleri
                case "Özgün Logo Tasarımı":
                  return "from-purple-500 to-pink-500"
                case "Kurumsal Renk Paleti":
                  return "from-blue-500 to-indigo-500"
                case "Tipografi Seçimi":
                  return "from-emerald-500 to-teal-500"
                case "Brandbook Kılavuzu":
                  return "from-orange-500 to-red-500"
                // Logo & Corporate Identity translations - colors
                case "Custom Logo Design":
                  return "from-purple-500 to-pink-500"
                case "Brand Identity":
                  return "from-blue-500 to-indigo-500"
                case "Typography":
                  return "from-emerald-500 to-teal-500"
                case "Brandbook Guide":
                  return "from-orange-500 to-red-500"
                case "Logo-Design":
                  return "from-purple-500 to-pink-500"
                case "Markenidentität":
                  return "from-blue-500 to-indigo-500"
                case "Typografie":
                  return "from-emerald-500 to-teal-500"
                case "Brandbook Leitfaden":
                  return "from-orange-500 to-red-500"
                case "Design de Logo":
                  return "from-purple-500 to-pink-500"
                case "Identité de Marque":
                  return "from-blue-500 to-indigo-500"
                case "Typographie":
                  return "from-emerald-500 to-teal-500"
                case "Guide Brandbook":
                  return "from-orange-500 to-red-500"
                case "Дизайн Логотипа":
                  return "from-purple-500 to-pink-500"
                case "Фирменный Стиль":
                  return "from-blue-500 to-indigo-500"
                case "Типографика":
                  return "from-emerald-500 to-teal-500"
                case "Гайд Brandbook":
                  return "from-orange-500 to-red-500"
                case "تصميم الشعار":
                  return "from-purple-500 to-pink-500"
                case "هوية العلامة":
                  return "from-blue-500 to-indigo-500"
                case "الخطوط":
                  return "from-emerald-500 to-teal-500"
                case "دليل Brandbook":
                  return "from-orange-500 to-red-500"
                // Sosyal Medya renkleri
                case "İçerik Üretimi":
                case "Content Production":
                case "Content-Produktion":
                case "Production de Contenu":
                case "Создание Контента":
                case "إنتاج المحتوى":
                  return "from-pink-500 to-rose-500"
                case "Görsel Tasarım":
                case "Visual Design":
                case "Visuelles Design":
                case "Design Visuel":
                case "Визуальный Дизайн":
                case "التصميم المرئي":
                  return "from-purple-500 to-violet-500"
                case "Topluluk Yönetimi":
                case "Community Management":
                case "Community-Management":
                case "Gestion Communautaire":
                case "Управление Сообществом":
                case "إدارة المجتمع":
                  return "from-blue-500 to-indigo-500"
                case "Analiz & Raporlama":
                case "Analytics & Reporting":
                case "Analyse & Berichterstattung":
                case "Analyse & Rapports":
                case "Анализ & Отчеты":
                case "التحليل & التقارير":
                  return "from-green-500 to-emerald-500"
                case "Strateji Geliştirme":
                case "Strategy Development":
                case "Strategieentwicklung":
                case "Développement Stratégique":
                case "Разработка Стратегии":
                case "تطوير الاستراتيجية":
                  return "from-orange-500 to-red-500"
                case "Hızlı Yayın":
                case "Fast Publishing":
                case "Schnelle Veröffentlichung":
                case "Publication Rapide":
                case "Быстрая Публикация":
                case "النشر السريع":
                  return "from-yellow-500 to-orange-500"
                // Yapay Zeka renkleri
                case "Chatbot Geliştirme":
                case "Chatbot Development":
                case "Chatbot-Entwicklung":
                case "Développement de Chatbot":
                case "Разработка Чатбота":
                case "تطوير الدردشة":
                  return "from-blue-500 to-cyan-500"
                case "Makine Öğrenmesi":
                case "Machine Learning":
                case "Maschinelles Lernen":
                case "Apprentissage Automatique":
                case "Машинное Обучение":
                case "التعلم الآلي":
                  return "from-purple-500 to-violet-500"
                case "Doğal Dil İşleme":
                case "Natural Language Processing":
                case "Natürliche Sprachverarbeitung":
                case "Traitement du Langage Naturel":
                case "Обработка Естественного Языка":
                case "معالجة اللغة الطبيعية":
                  return "from-green-500 to-emerald-500"
                case "İş Süreci Otomasyonu":
                case "Business Process Automation":
                case "Geschäftsprozessautomatisierung":
                case "Automatisation des Processus":
                case "Автоматизация Бизнес-Процессов":
                case "أتمتة العمليات":
                  return "from-orange-500 to-red-500"
                case "Görüntü İşleme":
                case "Image Processing":
                case "Bildverarbeitung":
                case "Traitement d'Image":
                case "Обработка Изображений":
                case "معالجة الصور":
                  return "from-indigo-500 to-blue-500"
                case "Gerçek Zamanlı Analiz":
                case "Real-time Analysis":
                case "Echtzeitanalyse":
                case "Analyse en Temps Réel":
                case "Анализ в Реальном Времени":
                case "التحليل في الوقت الفعلي":
                  return "from-yellow-500 to-orange-500"
                case "Süreç Analizi":
                  return "from-blue-500 to-indigo-500"
                case "API Entegrasyonları":
                  return "from-purple-500 to-violet-500"
                case "Workflow Tasarımı":
                  return "from-green-500 to-emerald-500"
                case "Monitoring":
                  return "from-orange-500 to-red-500"
                // Danışmanlık renkleri
                case "Strateji Geliştirme":
                case "Strategy Development":
                case "Strategieentwicklung":
                case "Développement Stratégique":
                case "Разработка Стратегии":
                case "تطوير الإستراتيجية":
                  return "from-blue-500 to-indigo-500"
                case "Teknoloji Seçimi":
                case "Technology Selection":
                case "Technologieauswahl":
                case "Choix Technologique":
                case "Выбор Технологий":
                case "اختيار التقنية":
                  return "from-purple-500 to-violet-500"
                case "Süreç İyileştirme":
                case "Process Improvement":
                case "Prozessoptimierung":
                case "Amélioration des Processus":
                case "Оптимизация Процессов":
                case "تحسين العمليات":
                  return "from-green-500 to-emerald-500"
                case "Eğitim & Mentorluk":
                case "Training & Mentoring":
                case "Schulung & Mentoring":
                case "Formation & Mentorat":
                case "Обучение & Менторство":
                case "التدريب والإرشاد":
                  return "from-orange-500 to-red-500"
                // No-code renkleri
                case "Hızlı Geliştirme":
                  return "from-blue-500 to-indigo-500"
                case "Maliyet Etkin":
                  return "from-purple-500 to-violet-500"
                case "Kolay Yönetim":
                  return "from-green-500 to-emerald-500"
                case "Hızlı İterasyon":
                  return "from-orange-500 to-red-500"
                // Eğitim renkleri
                case "Kişiselleştirilmiş Eğitim":
                  return "from-blue-500 to-indigo-500"
                case "Uygulamalı Öğrenme":
                  return "from-purple-500 to-violet-500"
                case "1:1 Mentorluk":
                  return "from-green-500 to-emerald-500"
                case "Sertifika Programı":
                  return "from-orange-500 to-red-500"
                default:
                  return "from-cyan-500 to-cyan-600"
              }
            }
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                className="group bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${getIconColor(feature.title)} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-400 font-medium mb-1 text-lg">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}