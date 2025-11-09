"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { 
  FileText, 
  Calendar, 
  Eye, 
  TrendingUp,
  Clock,
  User,
  Loader2,
  AlertCircle
} from "lucide-react"
import { getBlogs, getBlogStats, BlogPost } from "@/lib/blog-service"
import { getRecentActivities, Activity, getActivityDisplayInfo } from "@/lib/activity-service"
import { getTotalCommentsCount } from "@/lib/comment-service"

export function DashboardRecentContent() {
  const router = useRouter()
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [blogStats, setBlogStats] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    averageReadTime: '3:24'
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  // Load data function - useCallback ile optimize edildi
  const loadData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)
      
      // Load recent blogs
      const blogsResult = await getBlogs({}, { page: 1, limit: 4 })
      setRecentBlogs(prevBlogs => {
        // Sadece blog listesi değiştiyse güncelle
        if (JSON.stringify(prevBlogs) === JSON.stringify(blogsResult.blogs)) {
          return prevBlogs
        }
        return blogsResult.blogs
      })
      
      // Load recent activities
      const recentActivities = await getRecentActivities(4)
      setActivities(prevActivities => {
        // Sadece aktivite listesi değiştiyse güncelle
        if (JSON.stringify(prevActivities) === JSON.stringify(recentActivities)) {
          return prevActivities
        }
        return recentActivities
      })
      
      // Load blog stats
      const stats = await getBlogStats()
      const totalComments = await getTotalCommentsCount()
      
      // Sadece değerler değiştiyse state'i güncelle
      setBlogStats(prevStats => {
        const newStats = {
          totalViews: stats.totalViews,
          totalLikes: stats.totalLikes,
          totalComments: totalComments,
          averageReadTime: '3:24' // This could be calculated from actual data
        }
        
        // Eğer değerler aynıysa state'i güncelleme
        if (
          prevStats.totalViews === newStats.totalViews &&
          prevStats.totalLikes === newStats.totalLikes &&
          prevStats.totalComments === newStats.totalComments &&
          prevStats.averageReadTime === newStats.averageReadTime
        ) {
          return prevStats
        }
        
        return newStats
      })
      
    } catch (err) {
      setError('Veriler yüklenirken bir hata oluştu')
      console.error('Dashboard data loading error:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, []) // Boş bağımlılık dizisi - sadece component mount'ta çalışsın

  // Load data on component mount - loadData artık stable olduğu için güvenli
  useEffect(() => {
    loadData()
  }, [loadData])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'pending':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Yayında'
      case 'draft':
        return 'Taslak'
      case 'pending':
        return 'Beklemede'
      default:
        return 'Bilinmiyor'
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Tarih yok"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  const formatTimeAgo = (timestamp: any) => {
    if (!timestamp) return "Bilinmiyor"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} dakika önce`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} saat önce`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} gün önce`
    }
  }

  const handleBlogClick = (blog: BlogPost) => {
    if (blog.id) {
      router.push(`/dashboard/blogs/${blog.id}/view`)
    }
  }

  return (
    <section className="relative py-6 lg:py-8">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            Son{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              İçerikler
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            En son oluşturulan ve düzenlenen blog yazılarınızı görüntüleyin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Recent Blogs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Son Blog Yazıları
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                  <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">Bloglar yükleniyor...</span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-8">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                  <span className="ml-2 text-sm text-red-500">{error}</span>
                </div>
              ) : recentBlogs.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Henüz blog yazısı bulunmuyor</p>
                </div>
              ) : (
                recentBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    onClick={() => handleBlogClick(blog)}
                    className="p-4 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-200 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {blog.title}
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-2 break-words overflow-hidden">
                          {blog.excerpt}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(blog.status)} flex-shrink-0`}>
                        {getStatusText(blog.status)}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{blog.views || 0}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/dashboard/blogs')}
              className="w-full mt-6 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Tüm blog yazılarını görüntüle →
            </motion.button>
          </motion.div>

          {/* Analytics Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Performance Card */}
            <div className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Performans Özeti
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Toplam Görüntülenme</span>
                  <span className="text-lg font-bold text-neutral-900 dark:text-white">
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      blogStats.totalViews.toLocaleString('tr-TR')
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Toplam Beğeni</span>
                  <span className="text-lg font-bold text-neutral-900 dark:text-white">
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      blogStats.totalLikes.toLocaleString('tr-TR')
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Toplam Yorum</span>
                  <span className="text-lg font-bold text-green-500">
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      blogStats.totalComments.toLocaleString('tr-TR')
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-2xl p-6 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                 style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Son Aktiviteler
                  </h3>
                </div>
                <button
                  onClick={() => loadData(true)}
                  disabled={refreshing}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
                  title="Aktiviteleri Yenile"
                >
                  <Loader2 className={`h-4 w-4 text-neutral-600 dark:text-neutral-400 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              <div className="space-y-3">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                    <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">Aktiviteler yükleniyor...</span>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center py-8">
                    <AlertCircle className="h-6 w-6 text-red-500" />
                    <span className="ml-2 text-sm text-red-500">{error}</span>
                  </div>
                ) : activities.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Henüz aktivite bulunmuyor</p>
                  </div>
                ) : (
                  activities.map((activity, index) => {
                    const displayInfo = getActivityDisplayInfo(activity.type)
                    
                    return (
                      <motion.div
                        key={activity.id || index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        className="flex items-center space-x-3 p-3 rounded-xl transition-colors hover:bg-white/5 dark:hover:bg-gray-800/30"
                      >
                        <div className={`w-8 h-8 ${displayInfo.bgColor} rounded-full flex items-center justify-center`}>
                          <span className="text-sm">{displayInfo.icon}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">
                            {activity.title}
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-1">
                            {activity.description}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {formatTimeAgo(activity.createdAt)} • {activity.userName}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
