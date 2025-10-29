"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { useI18n } from "@/contexts/i18n-context"

// Framer Motion'ı lazy load et - main thread work azaltmak için
const MotionDiv = dynamic(() => import("framer-motion").then(mod => ({ default: mod.motion.div })), { 
  ssr: false,
  loading: () => <div />
})

import { 
  ArrowRight, 
  Play, 
  Star, 
  CheckCircle, 
  Sparkles,
  Rocket,
  Shield,
  Globe,
  Code,
  Palette,
  Search,
  Zap,
  Award,
  Target,
  Lightbulb,
  MessageCircle,
  Phone
} from "lucide-react"

export function Hero() {
  const { t, locale, getLocalizedUrl } = useI18n()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPageReady, setIsPageReady] = useState(false)
  
  // Minimal parallax - sadece arka plan için (optimized)
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Basit transform hesaplamaları
  const backgroundY = Math.min(scrollY * 0.1, 10)
  const lightBeam1Y = Math.min(scrollY * 0.05, 5)
  const lightBeam2Y = Math.min(scrollY * 0.05, 5)

  // Sayfa yükleme durumunu kontrol et - optimize edildi
  useEffect(() => {
    const handleLoad = () => {
      setIsPageReady(true)
      // Daha hızlı yükleme - 0.1 saniye
      setTimeout(() => {
        setIsLoaded(true)
      }, 100)
    }

    // Sayfa zaten yüklenmişse
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      // Sadece DOMContentLoaded dinle - daha hızlı
      document.addEventListener('DOMContentLoaded', handleLoad)
    }

    // Immediate render için hemen true yap
    handleLoad()

    return () => {
      document.removeEventListener('DOMContentLoaded', handleLoad)
    }
  }, [])

  return (
        <section
          className="relative flex items-center justify-center overflow-hidden" 
          style={{ 
            minHeight: '100vh',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        {/* Hero Image Background with Cinematic Effect */}
        <MotionDiv 
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          <Image
            src="/images/hero1.webp"
            alt="Softiel Hero"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            style={{
              filter: 'blur(5px)',
              transform: 'scale(1.1)'
            }}
          />
          
          {/* Cinematic Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
          
          {/* Film Grain Effect */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay animate-pulse bg-noise"></div>
        </MotionDiv>

        {/* Cinematic Light Beams - optimize edildi */}
        <MotionDiv
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ y: lightBeam1Y }}
          className="absolute top-0 left-1/4 w-96 h-full bg-gradient-to-b from-cyan-500/30 via-transparent to-transparent transform -skew-x-12 blur-sm"
        />
        
        <MotionDiv
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ y: lightBeam2Y }}
          className="absolute top-0 right-1/3 w-80 h-full bg-gradient-to-b from-blue-500/20 via-transparent to-transparent transform skew-x-6 blur-sm"
        />

        {/* Floating Cinematic Particles - optimize edildi */}
        {[...Array(8)].map((_, i) => (
        <MotionDiv
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0
            }}
          animate={{ 
              y: [null, -300],
              x: [null, Math.random() * 100 - 50],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
          }}
          transition={{ 
              duration: Math.random() * 5 + 4,
            repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeOut"
            }}
            className="absolute w-1 h-8 bg-gradient-to-t from-cyan-400/60 to-transparent rounded-full shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
            }}
          />
        ))}

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60"></div>
        
        {/* Animated Spotlight Effect - optimize edildi */}
        <MotionDiv
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent"
        />
      </div>

      {/* Main Content */}
          <div 
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-48 pb-8 sm:pb-12 lg:pb-16 w-full"
            style={{
              transform: 'translateZ(0)',
              willChange: 'auto'
            }}
          >
        <div className="text-center space-y-8 sm:space-y-12 lg:space-y-16" 
             style={{
               transform: 'translate3d(0, 0, 0)',
               willChange: 'auto',
               backfaceVisibility: 'hidden',
               perspective: '1000px',
               WebkitTransform: 'translate3d(0, 0, 0)',
               WebkitBackfaceVisibility: 'hidden'
             }}>

          {/* Enhanced Hero Title with Modern Design - optimize edildi */}
          <MotionDiv
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0, scale: 1 }}
            transition={{ 
              duration: 1, 
              delay: isLoaded ? 0.3 : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{ 
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
              WebkitTransform: 'translate3d(0, 0, 0)'
            }}
            className="relative"
          >
            
            <div className="relative space-y-6">
            <MotionDiv
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-white leading-[0.9] tracking-tight"
              style={{
                textShadow: '0 0 40px rgba(6, 182, 212, 0.6), 0 0 80px rgba(6, 182, 212, 0.4), 0 0 120px rgba(6, 182, 212, 0.2)',
                transform: 'translateZ(0)'
              }}
            >
              <MotionDiv
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: isLoaded ? 0.5 : 0, 
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="block"
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  willChange: 'transform'
                }}
              >
                {t('hero.mainTitle1', 'Dijital Dünyada')}
              </MotionDiv>
              <MotionDiv 
                className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: isLoaded ? 0.7 : 0,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transform: 'translate3d(0, 0, 0)',
                  willChange: 'transform'
                }}
              >
                {t('hero.mainTitle2', 'Fark Yaratın')}
              </MotionDiv>
            </MotionDiv>
            
            </div>
          </MotionDiv>

          {/* Enhanced Modern Subtitle */}
          <MotionDiv
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: isLoaded ? 0.9 : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{ 
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 100%), linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(6, 182, 212, 0.03) 50%, rgba(139, 92, 246, 0.03) 100%)'
            }}
            className="max-w-5xl mx-auto px-4 relative p-8 rounded-2xl backdrop-blur-xl"
          >
            {/* Background Blur Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-2xl blur-sm -z-10"></div>
            
            <MotionDiv 
              className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light text-center relative z-10 text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: isLoaded ? 1.1 : 0, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{
                textShadow: '0 0 30px rgba(0, 0, 0, 0.8), 0 0 60px rgba(6, 182, 212, 0.3)',
                willChange: 'opacity'
              }}
              dangerouslySetInnerHTML={{ __html: t('hero.mainDescription', 'Web tasarımından <span>yapay zeka</span> entegrasyonuna, mobil uygulamalardan <span>SEO optimizasyonuna</span> kadar tüm <span>dijital</span> ihtiyaçlarınız için <span>profesyonel çözümler</span> sunuyoruz.') }}
            />
          </MotionDiv>

          {/* Enhanced Quick Stats */}
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8, delay: isLoaded ? 1.3 : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transform: 'translate3d(0, 0, 0)' }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              { icon: Rocket, number: t('hero.stats.delivery', 'Hızlı'), label: t('hero.stats.deliveryLabel', 'Teslimat'), color: "cyan" },
              { icon: Star, number: t('hero.stats.satisfaction', '5.0'), label: t('hero.stats.satisfactionLabel', 'Müşteri Memnuniyeti'), color: "blue" },
              { icon: Shield, number: t('hero.stats.support', '24/7'), label: t('hero.stats.supportLabel', 'Teknik Destek'), color: "purple" }
            ].map((stat, index) => (
              <MotionDiv
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: isLoaded ? 1.4 + index * 0.1 : 0,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  boxShadow: `0 0 40px rgba(${stat.color === 'cyan' ? '6, 182, 212' : stat.color === 'blue' ? '59, 130, 246' : '139, 92, 246'}, 0.6)`
                }}
                className="relative backdrop-blur-xl rounded-2xl p-8 overflow-hidden group cursor-pointer"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Hover Glow Effect */}
                <MotionDiv
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${
                    stat.color === 'cyan' ? 'from-cyan-400 to-blue-500' :
                    stat.color === 'blue' ? 'from-blue-400 to-blue-600' :
                    'from-purple-400 to-pink-500'
                  }`}
                />
                
                <stat.icon 
                  className={`h-12 w-12 mx-auto mb-4 relative z-10 ${
                    stat.color === 'cyan' ? 'text-cyan-400' :
                    stat.color === 'blue' ? 'text-blue-400' :
                    'text-purple-400'
                  }`}
                  style={{
                    filter: `drop-shadow(0 0 15px rgba(${stat.color === 'cyan' ? '6, 182, 212' : stat.color === 'blue' ? '59, 130, 246' : '139, 92, 246'}, 0.8))`
                  }}
                />
                <div className="text-4xl font-bold text-white mb-2 relative z-10">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-300 relative z-10">
                  {stat.label}
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>

          {/* Enhanced Cinematic CTA Buttons */}
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8, delay: isLoaded ? 1.6 : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transform: 'translate3d(0, 0, 0)' }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <Link href={getLocalizedUrl('/iletisim')}>
              <MotionDiv
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: isLoaded ? 1.7 : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ 
                  boxShadow: '0 0 50px rgba(6, 182, 212, 0.8)',
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center space-x-3 text-white px-12 py-6 rounded-3xl font-bold text-xl overflow-hidden transition-all duration-300 cursor-pointer"
                style={{ 
                  background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                  boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)'
                }}
              >
                {/* Enhanced Button Shine Effect */}
                <MotionDiv
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-200, 300] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 4.5 }}
                />
                <span className="relative z-10">{t('hero.button1', 'Ücretsiz Teklif Al')}</span>
                <ArrowRight className="relative z-10 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </MotionDiv>
            </Link>
            
            <Link href={getLocalizedUrl('/hizmetlerimiz')}>
              <MotionDiv
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: isLoaded ? 1.8 : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(6, 182, 212, 0.8)',
                  boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center space-x-3 px-12 py-6 rounded-3xl font-bold text-xl text-white transition-all duration-300 border-2 backdrop-blur-xl cursor-pointer"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
                  borderColor: 'rgba(156, 163, 175, 0.4)'
                }}
              >
                <span>{t('hero.button2', 'Hizmetlerimizi İncele')}</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </MotionDiv>
            </Link>
          </MotionDiv>

          {/* Enhanced Cinematic Features */}
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8, delay: isLoaded ? 1.8 : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transform: 'translate3d(0, 0, 0)' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          >
            {[
              { icon: Code, text: t('hero.features.webDevelopment', 'Web Uygulaması Geliştirme'), color: "cyan" },
              { icon: Palette, text: t('hero.features.uiUx', 'UI/UX Tasarım'), color: "blue" },
              { icon: Search, text: t('hero.features.seo', 'SEO Optimizasyonu'), color: "purple" },
              { icon: Zap, text: t('hero.features.ai', 'Yapay Zeka'), color: "pink" }
            ].map((feature, index) => (
              <MotionDiv
                key={feature.text}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: isLoaded ? 1.9 + index * 0.15 : 0,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className={`relative flex flex-col items-center justify-center backdrop-blur-xl rounded-3xl p-8 transition-all duration-500 overflow-hidden group cursor-pointer hover:shadow-2xl`}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Enhanced Hover Glow Effect */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-50 transition-all duration-500 bg-gradient-to-br ${
                    feature.color === 'cyan' ? 'from-cyan-400/30 to-blue-500/30' :
                    feature.color === 'blue' ? 'from-blue-400/30 to-blue-600/30' :
                    feature.color === 'purple' ? 'from-purple-400/30 to-pink-500/30' :
                    'from-pink-400/30 to-rose-500/30'
                  }`}
                />
                
                <feature.icon 
                  className={`h-12 w-12 flex-shrink-0 relative z-10 transition-all duration-500 mb-4 ${
                    feature.color === 'cyan' ? 'text-cyan-400 group-hover:text-cyan-300' :
                    feature.color === 'blue' ? 'text-blue-400 group-hover:text-blue-300' :
                    feature.color === 'purple' ? 'text-purple-400 group-hover:text-purple-300' :
                    'text-pink-400 group-hover:text-pink-300'
                  }`}
                  style={{
                    filter: `drop-shadow(0 0 20px rgba(${feature.color === 'cyan' ? '6, 182, 212' : feature.color === 'blue' ? '59, 130, 246' : feature.color === 'purple' ? '139, 92, 246' : '236, 72, 153'}, 0.8))`
                  }}
                />
                <span className="text-lg font-bold text-white relative z-10 text-center">
                  {feature.text}
                </span>
              </MotionDiv>
            ))}
          </MotionDiv>

        </div>
      </div>
        </section>
  )
}