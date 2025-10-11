"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { m, LazyMotion } from "framer-motion"
import { BookOpen, ArrowRight, Calendar, User, MessageCircle, Loader2, Star, Globe } from "lucide-react"
import { getBlogStats, getBlogs } from "@/lib/blog-service"
import { useI18n } from "@/contexts/i18n-context"

// domAnimation'ı async yükle - Lighthouse unused JS optimizasyonu
const loadFeatures = () => import("framer-motion").then(mod => mod.domAnimation)

export function BlogHero() {
  const { t } = useI18n()
  const [stats, setStats] = useState({
    monthlyVisitors: 0,
    averageReadTime: '0 dk',
    weeklyUpdates: 0,
    satisfaction: 0
  })
  const [loading, setLoading] = useState(true)
  const [isDecorReady, setIsDecorReady] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = () => { if (!cancelled) loadStats() }
    if (typeof window !== 'undefined' && (window as any).requestIdleCallback) {
      ;(window as any).requestIdleCallback(run)
    } else {
      setTimeout(run, 200)
    }
    return () => { cancelled = true }
  }, [])

  // Ağır arka plan/dekor öğelerini ilk boyamadan sonra ve sadece desktop'ta yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(min-width: 1024px)')
      setIsDesktop(media.matches)
      const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
      if (media.addEventListener) media.addEventListener('change', onChange)
      else if ((media as any).addListener) (media as any).addListener(onChange)

      const idleCallback = (cb: () => void) => {
        const ric = (window as any).requestIdleCallback as undefined | ((cb: () => void) => number)
        if (ric) ric(cb)
        else setTimeout(cb, 350)
      }
      idleCallback(() => setIsDecorReady(true))

      return () => {
        if (media.removeEventListener) media.removeEventListener('change', onChange)
        else if ((media as any).removeListener) (media as any).removeListener(onChange)
      }
    }
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      
      // Defer non-critical Firestore calls - reduce network chain
      const loadData = async () => {
        // Blog istatistiklerini al
        const blogStats = await getBlogStats()
        
        // Tüm blogları al (okuma süresi hesaplamak için)
        const allBlogs = await getBlogs({}, { page: 1, limit: 1000 })
        
        // Aylık ziyaretçi sayısı (toplam görüntülenme sayısının %30'u)
        const monthlyVisitors = Math.round(blogStats.totalViews * 0.3)
        
        // Ortalama okuma süresi hesapla
        const averageReadTime = calculateAverageReadTime(allBlogs.blogs)
        
        // Haftalık güncelleme sayısı (son 7 günde yayınlanan blog sayısı)
        const weeklyUpdates = calculateWeeklyUpdates(allBlogs.blogs)
        
        setStats({
          monthlyVisitors,
          averageReadTime,
          weeklyUpdates,
          satisfaction: 98 // Sabit %98 memnuniyet oranı
        })
        setLoading(false)
      }
      
      // Use requestIdleCallback to defer Firestore calls
      if (typeof window !== 'undefined' && (window as any).requestIdleCallback) {
        (window as any).requestIdleCallback(loadData, { timeout: 2000 })
      } else {
        setTimeout(loadData, 100)
      }
    } catch (error) {
      // Hata durumunda varsayılan değerler
      setStats({
        monthlyVisitors: 0,
        averageReadTime: '0 dk',
        weeklyUpdates: 0,
        satisfaction: 98 // Sabit %98 memnuniyet oranı
      })
      setLoading(false)
    }
  }

  const calculateAverageReadTime = (blogs: any[]): string => {
    if (!blogs || blogs.length === 0) return '0 dk'
    
    const validBlogs = blogs.filter(blog => blog.content && blog.content.length > 0)
    if (validBlogs.length === 0) return '0 dk'
    
    const totalMinutes = validBlogs.reduce((sum, blog) => {
      const wordCount = blog.content.split(' ').length
      const readTimeMinutes = Math.ceil(wordCount / 200) // Ortalama 200 kelime/dakika
      return sum + readTimeMinutes
    }, 0)
    
    const average = Math.round(totalMinutes / validBlogs.length)
    return `${average} dk`
  }

  const calculateWeeklyUpdates = (blogs: any[]): number => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    
    return blogs.filter(blog => {
      if (!blog.publishedAt) return false
      
      const publishedDate = blog.publishedAt.toDate ? 
        blog.publishedAt.toDate() : 
        new Date(blog.publishedAt)
      
      return publishedDate >= oneWeekAgo && blog.status === 'published'
    }).length
  }

  return (
    <LazyMotion features={loadFeatures}>
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[size:20px_20px]"></div>
        
        {/* Ağır dekor öğeleri: sadece desktop ve idle sonrasında yükle */}
        {isDesktop && isDecorReady && (
          <>
            {/* Main gradient orbs (azaltılmış adet) */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 via-blue-500/20 to-cyan-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
            
            {/* Floating geometric shapes (azaltılmış adet) */}
            <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
            <div className="absolute bottom-32 left-32 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="absolute bottom-20 right-20 w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
            
            {/* Background icons (azaltılmış adet) */}
            <div className="absolute top-1/6 left-1/6 opacity-5">
              <BookOpen className="h-12 w-12 text-cyan-500" />
            </div>
            <div className="absolute bottom-1/3 left-1/5 opacity-5">
              <MessageCircle className="h-14 w-14 text-cyan-400" />
            </div>
            <div className="absolute top-2/3 left-1/2 opacity-5">
              <Globe className="h-16 w-16 text-blue-200" />
            </div>
            <div className="absolute top-3/4 left-1/4 opacity-5">
              <Star className="h-11 w-11 text-cyan-50" />
            </div>
          </>
        )}
      </div>
      
      {/* Hero Content Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-20 pb-4 lg:pt-32 lg:pb-8">
        {/* Mobile Layout - Alt Alta */}
        <div className="lg:hidden text-center">
          {/* Page Indicator */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center space-x-2 rounded-full px-4 py-2 shadow-modern mb-4 w-fit mx-auto"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <BookOpen className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {t('blog.badge', 'Blog & İçerikler')}
            </span>
          </m.div>

          {/* Main Heading */}
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Dijital{" "}
            <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Blog Yazıları
            </span>
          </m.h1>
          
          {/* Description */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 space-y-2"
          >
            <p>{t('blog.hero.description', 'Dijital dünyadaki son gelişmeler ve uzman görüşlerimizi keşfedin.')}</p>
          </m.div>
      
          {/* CTA Buttons */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <m.button
              onClick={(e) => {
                e.preventDefault();
                
                // Element yüklenene kadar bekle ve scroll yap
                const scrollToBlogPosts = () => {
                  const blogPostsElement = document.getElementById('blog-posts');
                  if (blogPostsElement) {
                    blogPostsElement.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                    return true;
                  }
                  return false;
                };

                // Hemen dene
                if (!scrollToBlogPosts()) {
                  // Element yoksa, yüklenene kadar bekle (maksimum 3 saniye)
                  let attempts = 0;
                  const maxAttempts = 30; // 30 * 100ms = 3 saniye
                  const interval = setInterval(() => {
                    attempts++;
                    if (scrollToBlogPosts() || attempts >= maxAttempts) {
                      clearInterval(interval);
                    }
                  }, 100);
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 cursor-pointer"
            >
              <span>{t('blog.hero.cta', 'Blog Yazılarını Keşfet')}</span>
              <ArrowRight className="h-5 w-5" />
            </m.button>
          </m.div>

          {/* Hero Image */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              <Image
                src="/images/blog-new.webp"
                alt="Blog"
                width={896}
                height={896}
                priority
                quality={70}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 600px"
                className="w-full h-auto object-contain"
              />
            </div>
          </m.div>
        </div>

        {/* Desktop Layout - Yan Yana */}
        <div className="hidden lg:flex items-center justify-between min-h-[60vh]">
          {/* Left Side - Text Content */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-left lg:max-w-3xl xl:max-w-4xl"
          >
            {/* Page Indicator */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center space-x-2 rounded-full px-4 py-2 shadow-modern mb-4 w-fit"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <BookOpen className="h-5 w-5 text-cyan-500 fill-current" />
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                {t('blog.badge', 'Blog & İçerikler')}
              </span>
            </m.div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-tight">
              Dijital{" "}
              <br />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Blog Yazıları
              </span>
            </h1>
            
            {/* Description */}
            <div className="text-lg lg:text-xl text-gray-300 mb-10 space-y-2">
              <p dangerouslySetInnerHTML={{ 
                __html: t('blog.hero.description', 'Dijital dünyadaki son gelişmeler ve uzman görüşlerimizi keşfedin.').replace(/\n/g, '<br/>')
              }} />
            </div>
        
            {/* CTA Buttons */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              <m.button
                onClick={(e) => {
                  e.preventDefault();
                  
                  // Element yüklenene kadar bekle ve scroll yap
                  const scrollToBlogPosts = () => {
                    const blogPostsElement = document.getElementById('blog-posts');
                    if (blogPostsElement) {
                      blogPostsElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                      return true;
                    }
                    return false;
                  };

                  // Hemen dene
                  if (!scrollToBlogPosts()) {
                    // Element yoksa, yüklenene kadar bekle (maksimum 3 saniye)
                    let attempts = 0;
                    const maxAttempts = 30; // 30 * 100ms = 3 saniye
                    const interval = setInterval(() => {
                      attempts++;
                      if (scrollToBlogPosts() || attempts >= maxAttempts) {
                        clearInterval(interval);
                      }
                    }, 100);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-2 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 cursor-pointer"
              >
                <span>{t('blog.hero.cta', 'Blog Yazılarını Keşfet')}</span>
                <ArrowRight className="h-5 w-5" />
              </m.button>
            </m.div>
          </m.div>

          {/* Right Side - Image */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex-none lg:max-w-md xl:max-w-lg flex justify-end"
          >
            <div className="relative w-full max-w-xl xl:max-w-2xl">
              <Image
                src="/images/blog-new.webp"
                alt="Blog"
                width={1024}
                height={1024}
                priority
                quality={70}
                sizes="(max-width: 1024px) 80vw, (max-width: 1280px) 700px, 896px"
                className="w-full h-auto object-contain lg:translate-x-4 xl:translate-x-6 scale-110 lg:scale-125 xl:scale-135"
              />
            </div>
          </m.div>
        </div>
      </div>

      {/* Blog Stats Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <User className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Aylık Ziyaretçi</h3>
            <p className="text-blue-400 font-medium mb-1 text-lg">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : `${stats.monthlyVisitors.toLocaleString()}`}
            </p>
            <p className="text-gray-400 text-sm">Blog Okuyucuları</p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Ortalama Okuma</h3>
            <p className="text-blue-400 font-medium mb-1 text-lg">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : stats.averageReadTime}
            </p>
            <p className="text-gray-400 text-sm">Süre</p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Haftalık Güncelleme</h3>
            <p className="text-blue-400 font-medium mb-1 text-lg">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : stats.weeklyUpdates}
            </p>
            <p className="text-gray-400 text-sm">Yeni İçerik</p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="bg-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-600/50 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Memnuniyet</h3>
            <p className="text-blue-400 font-medium mb-1 text-lg">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : `%${stats.satisfaction}`}
            </p>
            <p className="text-gray-400 text-sm">Oranı</p>
          </m.div>
        </div>
      </div>
    </section>
    </LazyMotion>
  )
}