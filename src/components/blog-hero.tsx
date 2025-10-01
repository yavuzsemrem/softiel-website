"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen, Search, Filter, ArrowRight, Calendar, User, MessageCircle, Loader2 } from "lucide-react"
import { getBlogStats, getBlogs } from "@/lib/blog-service"
import { useI18n } from "@/contexts/i18n-context"

export function BlogHero() {
  const { t } = useI18n()
  const [stats, setStats] = useState({
    monthlyVisitors: 0,
    averageReadTime: '0 dk',
    weeklyUpdates: 0,
    satisfaction: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      
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
    } catch (error) {
      // Hata durumunda varsayılan değerler
      setStats({
        monthlyVisitors: 0,
        averageReadTime: '0 dk',
        weeklyUpdates: 0,
        satisfaction: 98 // Sabit %98 memnuniyet oranı
      })
    } finally {
      setLoading(false)
    }
  }

  const calculateAverageReadTime = (blogs: any[]): string => {
    if (blogs.length === 0) return '0 dk'
    
    let totalMinutes = 0
    let validBlogs = 0
    
    blogs.forEach(blog => {
      if (blog.readTime) {
        // "5 dk" formatından sayıyı çıkar
        const match = blog.readTime.match(/(\d+)/)
        if (match) {
          totalMinutes += parseInt(match[1])
          validBlogs++
        }
      }
    })
    
    if (validBlogs === 0) return '0 dk'
    
    const average = Math.round(totalMinutes / validBlogs)
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
    <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 via-blue-500/20 to-cyan-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
        
        {/* Additional gradient orbs for depth */}
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-gradient-to-bl from-sky-500/15 via-cyan-500/15 to-transparent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-gradient-to-tr from-blue-500/15 via-cyan-500/15 to-transparent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl opacity-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-10 w-48 h-48 bg-gradient-to-l from-indigo-500/20 via-blue-500/20 to-transparent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-500/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-blue-500/30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-blue-500/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-sky-500/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-indigo-500/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}></div>
        <div className="absolute top-3/4 right-1/5 w-3 h-3 bg-blue-500/35 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '3.8s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-2.5 h-2.5 bg-emerald-500/30 rounded-full animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '4.2s' }}></div>
        <div className="absolute bottom-1/4 right-1/6 w-4 h-4 bg-blue-500/25 rounded-full animate-bounce" style={{ animationDelay: '3s', animationDuration: '5.5s' }}></div>
        
        {/* Geometric shapes */}
        <div className="absolute bottom-24 left-1/5 w-6 h-6 border-2 border-blue-500/25 rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-sm rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Wave patterns */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/5 via-blue-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-500/5 via-cyan-500/5 to-transparent"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
          >
            <BookOpen className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {t('blog.badge', 'Blog & İçerikler')}
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-neutral-900 dark:text-white mb-8 leading-tight">
            Dijital{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Blog Yazıları
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t('blog.hero.description', 'Web tasarımından yapay zekaya, SEO\'dan mobil uygulama geliştirmeye kadar dijital dünyadaki son gelişmeler, ipuçları ve uzman görüşlerimizi keşfedin. İşinizi büyütecek stratejiler ve teknolojiler hakkında güncel içerikler.')}
          </p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center items-center"
          >
            <motion.a
              href="#blog-posts"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-200"
              style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }}
            >
              <span>{t('blog.hero.cta', 'Yazıları Keşfet')}</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Blog Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            {
              icon: Search,
              title: t('blog.stats.monthlyVisitors', 'Aylık Ziyaretçi'),
              info: loading ? <Loader2 className="h-4 w-4 animate-spin" /> : `${stats.monthlyVisitors.toLocaleString('tr-TR')}+`,
              description: t('blog.stats.activeReaders', 'Aktif Okuyucu'),
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: ArrowRight,
              title: t('blog.stats.averageRead', 'Ortalama Okuma'),
              info: loading ? <Loader2 className="h-4 w-4 animate-spin" /> : stats.averageReadTime,
              description: t('blog.stats.contentQuality', 'İçerik Kalitesi'),
              color: "from-cyan-500 to-cyan-600",
            },
            {
              icon: Calendar,
              title: t('blog.stats.weeklyUpdate', 'Haftalık Güncelleme'),
              info: loading ? <Loader2 className="h-4 w-4 animate-spin" /> : `${stats.weeklyUpdates}`,
              description: t('blog.stats.newContent', 'Yeni İçerik'),
              color: "from-sky-500 to-sky-600",
            },
            {
              icon: MessageCircle,
              title: t('blog.stats.satisfaction', 'Okuyucu Memnuniyeti'),
              info: loading ? <Loader2 className="h-4 w-4 animate-spin" /> : `%${stats.satisfaction}`,
              description: t('blog.stats.positiveFeedback', 'Pozitif Geri Bildirim'),
              color: "from-blue-500 to-blue-600",
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass rounded-xl p-4 lg:p-5 shadow-modern border border-white/50 dark:border-white/40 text-center group backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300"
              style={{ background: 'rgba(148, 148, 148, 0.1)' }}
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-modern`}>
                <item.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-neutral-900 dark:text-white mb-1 lg:mb-2">
                {item.title}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-1 text-sm lg:text-base">
                {item.info}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

