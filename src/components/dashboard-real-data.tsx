"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  FileText, 
  Users, 
  MessageSquare, 
  Eye, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Calendar,
  Tag,
  Database,
  Plus,
  Edit,
  ArrowRight,
  Trash2,
  ThumbsUp,
  Reply
} from "lucide-react"
import Link from "next/link"
import { getBlogStats } from "@/lib/blog-service"
import { getCommentStats, getComments } from "@/lib/comment-service"
import { getUserStats } from "@/lib/user-service"
import { getBlogs } from "@/lib/blog-service"

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

interface RecentContent {
  blogs: Array<{
    id: string
    title: string
    status: string
    createdAt: any
    views: number
    excerpt?: string
  }>
  comments: Array<{
    id: string
    authorName: string
    authorEmail?: string
    content: string
    isApproved: boolean
    createdAt: any
    likes?: number
    blogTitle?: string
  }>
}

export function DashboardRealData() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentContent, setRecentContent] = useState<RecentContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Paralel olarak tüm verileri getir
        const [blogStats, commentStats, userStats, recentBlogs, recentComments] = await Promise.all([
          getBlogStats(),
          getCommentStats(),
          getUserStats(),
          getBlogs({}, { page: 1, limit: 5 }).then(result => result.blogs),
          getComments({}, { page: 1, limit: 5 }).then(result => result.comments)
        ])

        setStats({
          blogs: blogStats,
          comments: commentStats,
          users: userStats
        })

        setRecentContent({
          blogs: recentBlogs.map(blog => ({
            id: blog.id || '',
            title: blog.title,
            status: blog.status,
            createdAt: blog.createdAt,
            views: blog.views || 0,
            excerpt: blog.excerpt
          })),
          comments: recentComments.map(comment => ({
            id: comment.id || '',
            authorName: comment.authorName,
            authorEmail: comment.authorEmail,
            content: comment.content,
            isApproved: comment.isApproved,
            createdAt: comment.createdAt,
            likes: comment.likes,
            blogTitle: comment.blogId
          }))
        })
      } catch (err) {
        // Dashboard veri yükleme hatası sessizce işlendi
        setError('Veriler yüklenirken bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Bilinmeyen tarih'
    
    let date: Date
    if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate()
    } else {
      date = new Date(timestamp)
    }
    
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-neutral-400">Dashboard verileri yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  }

  if (!stats || !recentContent) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Ana İstatistikler */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Blog İstatistikleri */}
        <div className="glass rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
            <span className="text-sm text-neutral-400">Blog Yazıları</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">{stats.blogs.total}</h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-green-400">
                <CheckCircle className="h-4 w-4 inline mr-1" />
                {stats.blogs.published} Yayında
              </span>
              <span className="text-yellow-400">
                <Clock className="h-4 w-4 inline mr-1" />
                {stats.blogs.draft} Taslak
              </span>
            </div>
            <div className="text-xs text-neutral-400">
              {stats.blogs.totalViews.toLocaleString()} görüntülenme
            </div>
          </div>
        </div>

        {/* Yorum İstatistikleri */}
        <div className="glass rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-400" />
            </div>
            <span className="text-sm text-neutral-400">Yorumlar</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">{stats.comments.total}</h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-green-400">
                <CheckCircle className="h-4 w-4 inline mr-1" />
                {stats.comments.approved} Onaylı
              </span>
              <span className="text-yellow-400">
                <Clock className="h-4 w-4 inline mr-1" />
                {stats.comments.pending} Beklemede
              </span>
            </div>
            <div className="text-xs text-neutral-400">
              {stats.comments.replies} yanıt
            </div>
          </div>
        </div>

        {/* Kullanıcı İstatistikleri */}
        <div className="glass rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <span className="text-sm text-neutral-400">Kullanıcılar</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">{stats.users.total}</h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-green-400">
                <CheckCircle className="h-4 w-4 inline mr-1" />
                {stats.users.active} Aktif
              </span>
              <span className="text-red-400">
                <XCircle className="h-4 w-4 inline mr-1" />
                {stats.users.inactive} Pasif
              </span>
            </div>
            <div className="text-xs text-neutral-400">
              {Object.keys(stats.users.byRole).length} farklı rol
            </div>
          </div>
        </div>

        {/* Genel İstatistikler */}
        <div className="glass rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-lg">
              <BarChart3 className="h-6 w-6 text-cyan-400" />
            </div>
            <span className="text-sm text-neutral-400">Genel</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">{stats.blogs.totalViews.toLocaleString()}</h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-blue-400">
                <Eye className="h-4 w-4 inline mr-1" />
                Toplam Görüntülenme
              </span>
            </div>
            <div className="text-xs text-neutral-400">
              {stats.blogs.totalLikes} beğeni, {stats.comments.total} yorum
            </div>
          </div>
        </div>
      </motion.div>

      {/* Son İçerikler */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Son Blog Yazıları */}
        <div className="glass rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Son Blog Yazıları</h3>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-neutral-400">({recentContent.blogs.length})</span>
            </div>
          </div>
          <div className="space-y-4">
            {recentContent.blogs.length > 0 ? (
              recentContent.blogs.map((blog, index) => (
                <Link 
                  key={blog.id} 
                  href={`/dashboard/blogs/${blog.id}/view`}
                  className="block"
                >
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                        {blog.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          blog.status === 'published' 
                            ? 'bg-green-500/20 text-green-400' 
                            : blog.status === 'draft'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {blog.status === 'published' ? 'Yayında' : 
                           blog.status === 'draft' ? 'Taslak' : 'Arşiv'}
                        </span>
                        <span className="text-xs text-neutral-400">{blog.views || 0} görüntülenme</span>
                        {blog.excerpt && (
                          <span className="text-xs text-neutral-500 truncate max-w-32">
                            {blog.excerpt.substring(0, 30)}...
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <div className="text-xs text-neutral-500">
                        {formatDate(blog.createdAt)}
                      </div>
                      <div className="flex space-x-1">
                        <Link 
                          href={`/dashboard/blogs/${blog.id}/edit`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 hover:bg-blue-500/20 rounded transition-colors"
                          title="Düzenle"
                        >
                          <Edit className="h-3 w-3 text-blue-400" />
                        </Link>
                        <Link 
                          href={`/dashboard/blogs/${blog.id}/view`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 hover:bg-green-500/20 rounded transition-colors"
                          title="Görüntüle"
                        >
                          <Eye className="h-3 w-3 text-green-400" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-neutral-600 mx-auto mb-3" />
                <p className="text-neutral-400 mb-4">Henüz blog yazısı yok</p>
                <Link 
                  href="/dashboard/blogs/new"
                  className="inline-flex items-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  İlk Blog Yazısını Oluştur
                </Link>
              </div>
            )}
          </div>
          
          {recentContent.blogs.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link 
                href="/dashboard/blogs"
                className="flex items-center justify-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Tüm Blog Yazılarını Görüntüle
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )}
        </div>

        {/* Son Yorumlar */}
        <div className="glass rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Son Yorumlar</h3>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-400" />
              <span className="text-sm text-neutral-400">({recentContent.comments.length})</span>
            </div>
          </div>
          <div className="space-y-4">
            {recentContent.comments.length > 0 ? (
              recentContent.comments.map((comment, index) => (
                <div key={comment.id} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-white">{comment.authorName}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        comment.isApproved 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {comment.isApproved ? 'Onaylı' : 'Beklemede'}
                      </span>
                      {comment.likes && comment.likes > 0 && (
                        <span className="text-xs text-neutral-400 flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {comment.likes}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-300 line-clamp-2 mb-2">{comment.content}</p>
                    <div className="flex items-center space-x-2 text-xs text-neutral-500">
                      <span>{comment.authorEmail}</span>
                      {comment.blogTitle && (
                        <span>• {comment.blogTitle}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <div className="text-xs text-neutral-500">
                      {formatDate(comment.createdAt)}
                    </div>
                    <div className="flex space-x-1">
                      <button 
                        className="p-1 hover:bg-green-500/20 rounded transition-colors"
                        title="Onayla/Reddet"
                      >
                        {comment.isApproved ? (
                          <XCircle className="h-3 w-3 text-red-400" />
                        ) : (
                          <CheckCircle className="h-3 w-3 text-green-400" />
                        )}
                      </button>
                      <button 
                        className="p-1 hover:bg-blue-500/20 rounded transition-colors"
                        title="Yanıtla"
                      >
                        <Reply className="h-3 w-3 text-blue-400" />
                      </button>
                      <button 
                        className="p-1 hover:bg-red-500/20 rounded transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="h-3 w-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-neutral-600 mx-auto mb-3" />
                <p className="text-neutral-400 mb-4">Henüz yorum yok</p>
                <p className="text-xs text-neutral-500">Blog yazılarınız yayınlandığında yorumlar burada görünecek</p>
              </div>
            )}
          </div>
          
          {recentContent.comments.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link 
                href="/dashboard/comments"
                className="flex items-center justify-center text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                Tüm Yorumları Görüntüle
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
