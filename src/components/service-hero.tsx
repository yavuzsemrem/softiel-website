"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, CheckCircle, Star, Users, Clock, Award, Palette, Smartphone, Search, Zap, Target, Globe, Code, Layers, Shield, TrendingUp, FileText, Share2, Bot, Wrench, BookOpen, BarChart3, Settings, Database, DollarSign, RefreshCw, Sparkles, Headphones, MessageCircle } from "lucide-react"

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
  // WhatsApp mesajını serviceType'a göre oluştur
  const getWhatsAppMessage = (serviceType?: string) => {
    const messages = {
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
    }
    
    return encodeURIComponent(messages[serviceType as keyof typeof messages] || messages.default)
  }

  // Başlığı satır sayısına göre gradient uygulama fonksiyonu
  const renderTitleWithGradient = (title: string) => {
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
              href="/tr/iletisim"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600"
            >
              <span>Hemen Başlayın</span>
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
              <span>WhatsApp Sohbet</span>
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
                src={`/images/${data.serviceType === 'web-tasarimi' ? 'website-design' : data.serviceType === 'web-gelistirme' ? 'web-application-development' : data.serviceType === 'mobil-uygulama' ? 'mobile-application-development' : data.serviceType === 'seo' ? 'seo-optimization' : data.serviceType === 'google-ads' ? 'google-ads-and-meta-ads-management' : data.serviceType === 'wordpress' ? 'wordpress-solutions' : data.serviceType === 'logo-kimlik' ? 'logo-and-corporate-identity' : data.serviceType === 'sosyal-medya' ? 'social-media-management' : data.serviceType === 'yapay-zeka' ? 'artificial-intelligence-integration' : data.serviceType === 'otomasyon' ? 'automation-and-integration' : data.serviceType === 'danismanlik' ? 'digital-consulting' : data.serviceType || 'website-design'}.webp`}
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
              <motion.a
                href="/tr/iletisim"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600"
              >
                <span>Hemen Başlayın</span>
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
                <span>WhatsApp Sohbet</span>
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
                  src={`/images/${data.serviceType === 'web-tasarimi' ? 'website-design' : data.serviceType === 'web-gelistirme' ? 'web-application-development' : data.serviceType === 'mobil-uygulama' ? 'mobile-application-development' : data.serviceType === 'seo' ? 'seo-optimization' : data.serviceType === 'google-ads' ? 'google-ads-and-meta-ads-management' : data.serviceType === 'wordpress' ? 'wordpress-solutions' : data.serviceType === 'logo-kimlik' ? 'logo-and-corporate-identity' : data.serviceType === 'sosyal-medya' ? 'social-media-management' : data.serviceType === 'yapay-zeka' ? 'artificial-intelligence-integration' : data.serviceType === 'otomasyon' ? 'automation-and-integration' : data.serviceType === 'danismanlik' ? 'digital-consulting' : data.serviceType || 'website-design'}.webp`}
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
                case "7-14 Gün İçinde Yayında":
                  return Zap
                case "Mobil Uyumlu & Hızlı":
                  return Smartphone
                case "SEO Altyapısı Hazır":
                  return Target
                case "Revizyon Hakkı":
                  return Star
                // Mobil uygulama özellikleri
                case "Hızlı MVP":
                  return Zap
                case "Tek Kod Tabanı":
                  return Code
                case "Özelleştirilebilir":
                  return Target
                case "Uzun Vadeli Destek":
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
                // Google Ads özellikleri
                case "Hedefli Kampanyalar":
                 	return Target
                case "ROI Artış Garantisi":
                  return TrendingUp
                case "Gerçek Zamanlı Optimizasyon":
                  return Zap
                case "Profesyonel Tasarım":
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
                // Logo & Kurumsal Kimlik özellikleri
                case "Özgün Logo Tasarımı":
                  return Palette
                case "Kurumsal Renk Paleti":
                  return Layers
                case "Tipografi Seçimi":
                  return FileText
                case "Brandbook Kılavuzu":
                  return BookOpen
                // Sosyal Medya özellikleri
                case "İçerik Üretimi":
                  return Share2
                case "Görsel Tasarım":
                  return Palette
                case "Topluluk Yönetimi":
                  return Users
                case "Analiz & Raporlama":
                  return BarChart3
                // Yapay Zeka özellikleri
                case "Chatbot Geliştirme":
                  return Bot
                case "Makine Öğrenmesi":
                  return Database
                case "Doğal Dil İşleme":
                  return FileText
                case "İş Süreci Otomasyonu":
                  return Settings
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
                  return Target
                case "Teknoloji Seçimi":
                  return Settings
                case "Süreç İyileştirme":
                  return TrendingUp
                case "Eğitim & Mentorluk":
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
                case "7-14 Gün İçinde Yayında":
                  return "from-orange-500 to-red-500"
                case "Mobil Uyumlu & Hızlı":
                  return "from-blue-500 to-cyan-500"
                case "SEO Altyapısı Hazır":
                  return "from-green-500 to-emerald-500"
                case "Revizyon Hakkı":
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
                // Sosyal Medya renkleri
                case "İçerik Üretimi":
                  return "from-pink-500 to-rose-500"
                case "Görsel Tasarım":
                  return "from-purple-500 to-violet-500"
                case "Topluluk Yönetimi":
                  return "from-blue-500 to-indigo-500"
                case "Analiz & Raporlama":
                  return "from-green-500 to-emerald-500"
                // Yapay Zeka renkleri
                case "Chatbot Geliştirme":
                  return "from-blue-500 to-cyan-500"
                case "Makine Öğrenmesi":
                  return "from-purple-500 to-violet-500"
                case "Doğal Dil İşleme":
                  return "from-green-500 to-emerald-500"
                case "İş Süreci Otomasyonu":
                  return "from-orange-500 to-red-500"
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
                  return "from-blue-500 to-indigo-500"
                case "Teknoloji Seçimi":
                  return "from-purple-500 to-violet-500"
                case "Süreç İyileştirme":
                  return "from-green-500 to-emerald-500"
                case "Eğitim & Mentorluk":
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
                className="bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${getIconColor(feature.title)} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="h-6 w-6 text-white" />
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