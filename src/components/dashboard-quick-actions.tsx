"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  Search,
  Edit,
  Trash2,
  Eye,
  Share2,
  MessageSquare,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Calendar,
  Tag,
  FolderOpen
} from "lucide-react"
import Link from "next/link"
import { getAllBlogs, deleteBlog, BlogPost } from "@/lib/blog-service"
import { getAllComments, deleteComment, Comment } from "@/lib/comment-service"
import { getUsers, deleteUser, User } from "@/lib/user-service"

export function DashboardQuickActions() {
  // State'ler
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([])
  const [recentComments, setRecentComments] = useState<Comment[]>([])
  const [recentUsers, setRecentUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Modal state'leri
  const [showBlogModal, setShowBlogModal] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<{
    blogs: BlogPost[]
    comments: Comment[]
    users: User[]
  }>({ blogs: [], comments: [], users: [] })
  
  // Silme state'leri
  const [deletingItem, setDeletingItem] = useState<{
    type: 'blog' | 'comment' | 'user'
    id: string
    title: string
  } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  

  // Modal açıkken body scroll'unu engelle
  useEffect(() => {
    const isAnyModalOpen = showBlogModal || showCommentModal || showUserModal || showSearchModal || deletingItem
    
    if (isAnyModalOpen) {
      // Mevcut scroll pozisyonunu kaydet
      const scrollY = window.scrollY
      
      // Body'yi sabitle ve scroll pozisyonunu koru
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      // Scroll pozisyonunu geri yükleme fonksiyonu
      const restoreScroll = () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
      
      // Cleanup function
      return () => {
        restoreScroll()
      }
    } else {
      // Modal kapandığında scroll'u geri aç
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [showBlogModal, showCommentModal, showUserModal, showSearchModal, deletingItem])

  // Verileri yükle
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const [blogs, comments, users] = await Promise.all([
          getAllBlogs(),
          getAllComments(),
          getUsers()
        ])
        
        setRecentBlogs(blogs.slice(0, 5))
        setRecentComments(comments.slice(0, 5))
        setRecentUsers(users.slice(0, 5))
        
      } catch (err) {
        // Veri yükleme hatası sessizce işlendi
        setError('Veriler yüklenirken bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Arama fonksiyonu
  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults({ blogs: [], comments: [], users: [] })
      return
    }
    
    try {
      const [blogs, comments, users] = await Promise.all([
        getAllBlogs({ search: term }),
        getAllComments(),
        getUsers()
      ])
      
      const filteredComments = comments.filter((comment: Comment) => 
        comment.content.toLowerCase().includes(term.toLowerCase()) ||
        comment.authorName.toLowerCase().includes(term.toLowerCase())
      )
      
      const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
      )
      
      setSearchResults({
        blogs: blogs,
        comments: filteredComments,
        users: filteredUsers
      })
    } catch (err) {
      // Arama hatası sessizce işlendi
    }
  }

  // Silme fonksiyonu
  const handleDelete = async () => {
    if (!deletingItem) return
    
    try {
      setIsDeleting(true)
      
      switch (deletingItem.type) {
        case 'blog':
          await deleteBlog(deletingItem.id)
          setRecentBlogs(prev => prev.filter(blog => blog.id !== deletingItem.id))
          break
        case 'comment':
          await deleteComment(deletingItem.id)
          setRecentComments(prev => prev.filter(comment => comment.id !== deletingItem.id))
          break
        case 'user':
          await deleteUser(deletingItem.id)
          setRecentUsers(prev => prev.filter(user => user.id !== deletingItem.id))
          break
      }
      
      setDeletingItem(null)
    } catch (err) {
      // Silme hatası sessizce işlendi
      setError('Silme işlemi başarısız oldu')
    } finally {
      setIsDeleting(false)
    }
  }


  const quickActions = [
    {
      title: "Yeni Blog Yazısı",
      description: "Yeni bir blog yazısı oluştur",
      icon: Plus,
      href: "/content-management-system-2024/blogs/new",
      color: "from-blue-500 to-blue-600",
      bgColor: "rgba(59, 130, 246, 0.1)",
      action: () => window.location.href = "/content-management-system-2024/blogs/new"
    },
    {
      title: "Son Blog Yazıları",
      description: "Son eklenen blog yazılarını görüntüle",
      icon: FileText,
      href: "#",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "rgba(6, 182, 212, 0.1)",
      action: () => setShowBlogModal(true)
    },
    {
      title: "Son Yorumlar",
      description: "Son yapılan yorumları görüntüle",
      icon: MessageSquare,
      href: "#",
      color: "from-purple-500 to-purple-600",
      bgColor: "rgba(168, 85, 247, 0.1)",
      action: () => setShowCommentModal(true)
    },
    {
      title: "Kullanıcılar",
      description: "Kullanıcıları görüntüle ve yönet",
      icon: Users,
      href: "#",
      color: "from-green-500 to-green-600",
      bgColor: "rgba(34, 197, 94, 0.1)",
      action: () => setShowUserModal(true)
    },
    {
      title: "Kategoriler",
      description: "Blog kategorilerini yönet",
      icon: FolderOpen,
      href: "/content-management-system-2024/categories",
      color: "from-orange-500 to-orange-600",
      bgColor: "rgba(249, 115, 22, 0.1)",
      action: () => window.location.href = "/content-management-system-2024/categories"
    },
    {
      title: "Arama",
      description: "İçeriklerde arama yap",
      icon: Search,
      href: "#",
      color: "from-pink-500 to-pink-600",
      bgColor: "rgba(236, 72, 153, 0.1)",
      action: () => setShowSearchModal(true)
    }
  ]


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
            Hızlı{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              İşlemler
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            En sık kullanılan işlemleri hızlıca gerçekleştirin
          </p>
        </motion.div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {action.href !== "#" ? (
                <Link href={action.href}>
                  <div className="glass rounded-xl p-6 shadow-modern border border-white/50 dark:border-white/40 group cursor-pointer backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300 h-full"
                       style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center shadow-modern flex-shrink-0`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {action.description}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div 
                  onClick={action.action}
                  className="glass rounded-xl p-6 shadow-modern border border-white/50 dark:border-white/40 group cursor-pointer backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)] hover:bg-white/15 dark:hover:bg-gray-800 transition-all duration-300 h-full"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center shadow-modern flex-shrink-0`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>


        {/* Modal'lar */}
        <AnimatePresence>
          {/* Blog Modal */}
          {showBlogModal && (
            <motion.div
              key="blog-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 blog-modal-container"
              onClick={() => setShowBlogModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto blog-modal-content"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Son Blog Yazıları</h3>
                  <button
                    onClick={() => setShowBlogModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentBlogs.map((blog) => (
                      <div key={blog.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg blog-card">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 blog-icon">
                          <FileText className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0 blog-card-content">
                          <h4 className="text-lg font-semibold text-white truncate blog-title">{blog.title}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-neutral-400 blog-meta">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString('tr-TR') : 'Tarih yok'}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {blog.views} görüntülenme
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 blog-card-actions">
                          <span className={`px-2 py-1 rounded-full text-xs blog-status ${
                            blog.status === 'published' 
                              ? 'bg-green-500/20 text-green-400' 
                              : blog.status === 'draft'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {blog.status === 'published' ? 'Yayında' : 
                             blog.status === 'draft' ? 'Taslak' : 'Arşiv'}
                          </span>
                          <div className="flex space-x-2">
                          <Link href={`/content-management-system-2024/blogs/${blog.id}/edit`}>
                            <button className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors">
                              <Edit className="h-4 w-4 text-blue-400" />
                            </button>
                          </Link>
                          <Link href={`/content-management-system-2024/blogs/${blog.id}/view`}>
                            <button className="p-2 hover:bg-green-500/20 rounded-lg transition-colors">
                              <Eye className="h-4 w-4 text-green-400" />
                            </button>
                          </Link>
                          <button 
                            onClick={() => setDeletingItem({
                              type: 'blog',
                              id: blog.id!,
                              title: blog.title
                            })}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {recentBlogs.length === 0 && (
                      <div className="text-center py-8 text-neutral-400">
                        Henüz blog yazısı yok
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Comment Modal */}
          {showCommentModal && (
            <motion.div
              key="comment-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-container"
              onClick={() => setShowCommentModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto modal-content"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6 modal-header">
                  <h3 className="text-2xl font-bold text-white modal-title">Son Yorumlar</h3>
                  <button
                    onClick={() => setShowCommentModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-white modal-close" />
                  </button>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentComments.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-6 w-6 text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="text-lg font-semibold text-white">{comment.authorName}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              comment.isApproved 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {comment.isApproved ? 'Onaylı' : 'Beklemede'}
                            </span>
                          </div>
                          <p className="text-neutral-300 text-sm line-clamp-2 mb-2">{comment.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-neutral-400">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleDateString('tr-TR') : 'Tarih yok'}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              <span className="truncate">{comment.authorEmail}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setDeletingItem({
                              type: 'comment',
                              id: comment.id!,
                              title: comment.content.substring(0, 30) + '...'
                            })}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {recentComments.length === 0 && (
                      <div className="text-center py-8 text-neutral-400">
                        Henüz yorum yok
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* User Modal */}
          {showUserModal && (
            <motion.div
              key="user-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-container"
              onClick={() => setShowUserModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto modal-content"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6 modal-header">
                  <h3 className="text-2xl font-bold text-white modal-title">Kullanıcılar</h3>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-white modal-close" />
                  </button>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Users className="h-6 w-6 text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-white">{user.name}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-neutral-400">
                            <span className="truncate">{user.email}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.isActive 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {user.isActive ? 'Aktif' : 'Pasif'}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                              {user.role}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setDeletingItem({
                              type: 'user',
                              id: user.id!,
                              title: user.name
                            })}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {recentUsers.length === 0 && (
                      <div className="text-center py-8 text-neutral-400">
                        Henüz kullanıcı yok
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Search Modal */}
          {showSearchModal && (
            <motion.div
              key="search-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-container"
              onClick={() => setShowSearchModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto modal-content"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6 modal-header">
                  <h3 className="text-2xl font-bold text-white modal-title">Arama</h3>
                  <button
                    onClick={() => setShowSearchModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-white modal-close" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Blog, yorum veya kullanıcı ara..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        handleSearch(e.target.value)
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border-0 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Blog Sonuçları */}
                  {searchResults.blogs.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-400" />
                        Blog Yazıları ({searchResults.blogs.length})
                      </h4>
                      <div className="space-y-3">
                        {searchResults.blogs.map((blog) => (
                          <div key={blog.id} className="p-4 bg-white/5 rounded-lg">
                            <h5 className="text-white font-medium">{blog.title}</h5>
                            <p className="text-neutral-400 text-sm mt-1">{blog.excerpt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Yorum Sonuçları */}
                  {searchResults.comments.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-purple-400" />
                        Yorumlar ({searchResults.comments.length})
                      </h4>
                      <div className="space-y-3">
                        {searchResults.comments.map((comment) => (
                          <div key={comment.id} className="p-4 bg-white/5 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-white font-medium">{comment.authorName}</span>
                              <span className="text-neutral-400 text-sm">{comment.authorEmail}</span>
                            </div>
                            <p className="text-neutral-300 text-sm">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Kullanıcı Sonuçları */}
                  {searchResults.users.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-green-400" />
                        Kullanıcılar ({searchResults.users.length})
                      </h4>
                      <div className="space-y-3">
                        {searchResults.users.map((user) => (
                          <div key={user.id} className="p-4 bg-white/5 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="text-white font-medium">{user.name}</h5>
                                <p className="text-neutral-400 text-sm">{user.email}</p>
                              </div>
                              <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                                {user.role}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {searchTerm && searchResults.blogs.length === 0 && searchResults.comments.length === 0 && searchResults.users.length === 0 && (
                    <div className="text-center py-8 text-neutral-400">
                      "{searchTerm}" için sonuç bulunamadı
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Delete Confirmation Modal */}
          {deletingItem && (
            <motion.div
              key="delete-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-container"
              onClick={() => setDeletingItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass rounded-2xl p-6 max-w-md w-full"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Silme Onayı</h3>
                  <p className="text-neutral-300 mb-6">
                    "{deletingItem.title}" {deletingItem.type === 'blog' ? 'blog yazısını' : 
                    deletingItem.type === 'comment' ? 'yorumu' : 'kullanıcıyı'} silmek istediğinizden emin misiniz?
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setDeletingItem(null)}
                      className="flex-1 px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors"
                    >
                      İptal
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Siliniyor...
                        </>
                      ) : (
                        'Sil'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
