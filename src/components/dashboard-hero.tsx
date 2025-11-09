"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Users, FileText, ArrowRight, Calendar, Clock, MessageSquare, Eye } from "lucide-react"
import { getBlogStats } from "@/lib/blog-service"
import { getCommentStats } from "@/lib/comment-service"
import { getUserStats } from "@/lib/user-service"

interface DashboardStats {
  blogs: {
    total: number
    published: number
    draft: number
    archived: number
    totalViews: number
    totalLikes: number
    totalComments: number
  }
  comments: {
    total: number
    approved: number
    pending: number
    rejected: number
    replies: number
  }
  users: {
    total: number
    active: number
    inactive: number
    byRole: Record<string, number>
  }
}

export function DashboardHero() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Firestore cache bug workaround - Hataları yakala ve devam et
        let blogStats: any
        let commentStats: any
        let userStats: any
        
        try {
          blogStats = await getBlogStats()
        } catch (err) {
          console.warn('Blog stats error (using defaults):', err)
          blogStats = { total: 0, published: 0, draft: 0, archived: 0, totalViews: 0, totalLikes: 0, totalComments: 0 }
        }
        
        try {
          commentStats = await getCommentStats()
        } catch (err) {
          console.warn('Comment stats error (using defaults):', err)
          commentStats = { total: 0, approved: 0, pending: 0, rejected: 0, replies: 0 }
        }
        
        try {
          userStats = await getUserStats()
        } catch (err) {
          console.warn('User stats error (using defaults):', err)
          userStats = { total: 0, active: 0, inactive: 0, byRole: {} }
        }

        setStats({
          blogs: blogStats,
          comments: commentStats,
          users: userStats
        })
      } catch (err) {
        // Dashboard veri yükleme hatası sessizce işlendi
        console.error('Dashboard data error:', err)
        setError('Veriler yüklenirken bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])
  return (
    <section className="relative py-6 lg:py-8">
      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 lg:mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <BarChart3 className="h-5 w-5 text-cyan-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Admin Paneli
            </span>
          </motion.div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Hoş Geldiniz,{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Admin
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed">
            Softiel web sitesi yönetim paneline hoş geldiniz. Buradan tüm içerikleri yönetebilir, 
            istatistikleri takip edebilir ve site performansını optimize edebilirsiniz.
          </p>
          
          {/* Current Date & Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <div className="flex items-center space-x-2 glass px-4 py-2 rounded-xl"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <Calendar className="h-4 w-4 text-cyan-500" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {new Date().toLocaleDateString('tr-TR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2 glass px-4 py-2 rounded-xl"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {new Date().toLocaleTimeString('tr-TR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {loading ? (
            // Loading state
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass rounded-xl p-4 lg:p-5 shadow-modern border border-white/50 dark:border-white/40 text-center backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-300 dark:bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-modern animate-pulse">
                  <div className="h-5 w-5 lg:h-6 lg:w-6 bg-gray-400 dark:bg-gray-500 rounded"></div>
                </div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </motion.div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full text-center py-8">
              <div className="text-red-400 mb-4">Veriler yüklenirken hata oluştu</div>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Tekrar Dene
              </button>
            </div>
          ) : stats ? [
            {
              icon: FileText,
              title: "Toplam Blog",
              value: stats.blogs.total.toString(),
              change: `${stats.blogs.published} yayında`,
              changeType: "positive",
              color: "from-blue-500 to-blue-600",
              description: `${stats.blogs.draft} taslak`
            },
            {
              icon: Eye,
              title: "Görüntülenme",
              value: stats.blogs.totalViews.toLocaleString(),
              change: `${stats.blogs.totalLikes} beğeni`,
              changeType: "positive",
              color: "from-cyan-500 to-cyan-600",
              description: "Toplam"
            },
            {
              icon: MessageSquare,
              title: "Yorumlar",
              value: stats.comments.total.toString(),
              change: `${stats.comments.approved} onaylı`,
              changeType: "positive",
              color: "from-sky-500 to-sky-600",
              description: `${stats.comments.pending} beklemede`
            },
            {
              icon: Users,
              title: "Kullanıcılar",
              value: stats.users.total.toString(),
              change: `${stats.users.active} aktif`,
              changeType: "positive",
              color: "from-purple-500 to-purple-600",
              description: `${stats.users.inactive} pasif`
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass rounded-xl p-4 lg:p-5 shadow-modern border border-white/50 dark:border-white/40 text-center group cursor-pointer backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-modern`}>
                <item.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-neutral-900 dark:text-white mb-1 lg:mb-2">
                {item.title}
              </h3>
              <p className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {item.value}
              </p>
              <div className="flex items-center justify-center space-x-1">
                <span className={`text-xs font-medium ${
                  item.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {item.change}
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </span>
              </div>
            </motion.div>
          )) : null}
        </div>
      </div>
    </section>
  )
}
