 "use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bell,
  User,
  LogOut,
  Home,
  MessageSquare,
   BarChart3,
  ChevronDown,
  Menu,
  Search,
  X,
  FileText,
  Users,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { getAllBlogs, BlogPost } from "@/lib/blog-service"
import { getAllComments, Comment } from "@/lib/comment-service"
import { getUsers, User as UserType } from "@/lib/user-service"
import { useCurrentUser } from "@/hooks/use-current-user"
import { getRecentActivities, Activity, markActivityAsRead } from "@/lib/activity-service"
import { useNotifications } from "@/contexts/notification-context"

interface DashboardNavbarProps {
  onMenuClick?: () => void
  onSidebarToggle?: () => void
  sidebarCollapsed?: boolean
  onLogout?: () => void
}

export function DashboardNavbar({ onMenuClick, onSidebarToggle, sidebarCollapsed, onLogout }: DashboardNavbarProps) {
  const { user, loading: userLoading } = useCurrentUser()
  const { unreadCount, updateUnreadCount, markAsRead } = useNotifications()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<{
    blogs: BlogPost[]
    comments: Comment[]
    users: UserType[]
  }>({ blogs: [], comments: [], users: [] })
  const [isSearching, setIsSearching] = useState(false)
  const [activities, setActivities] = useState<Activity[]>([])
  const [activitiesLoading, setActivitiesLoading] = useState(false)
  
  const notificationsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)


  const handleLogout = () => {
    // Logout işlemi - gerçek uygulamada token temizleme vs. yapılacak
    window.location.href = '/admin-panel-secure-access-2024'
  }

  const handleProfileSettings = () => {
    // Kullanıcılar sayfasına yönlendir
    window.location.href = '/dashboard/users'
  }

  const handleViewAllNotifications = () => {
    // Tüm bildirimleri gör sayfasına yönlendir
    window.location.href = '/dashboard/notifications'
  }

  // Bildirim dropdown açıldığında sayıyı güncelle
  const handleNotificationsToggle = async () => {
    const newOpenState = !notificationsOpen
    setNotificationsOpen(newOpenState)
    
    if (newOpenState) {
      // Dropdown açılıyorsa sayıyı güncelle
      await updateUnreadCount()
      
      // Dropdown'daki tüm bildirimleri "görüldü" olarak işaretle
      await markAllDropdownActivitiesAsRead()
    }
  }

  // Bildirime tıklandığında okundu olarak işaretle
  const handleActivityClick = async (activityId: string) => {
    try {
      await markAsRead(activityId)
    } catch (error) {
      console.error('Bildirim okundu olarak işaretlenemedi:', error)
    }
  }

  // Dropdown'daki tüm bildirimleri "görüldü" olarak işaretle
  const markAllDropdownActivitiesAsRead = async () => {
    try {
      // Dropdown'da gösterilen tüm okunmamış aktiviteleri işaretle
      const unreadActivities = activities.filter(activity => !activity.isRead)
      
      if (unreadActivities.length > 0) {
        // Her bir aktiviteyi okundu olarak işaretle
        for (const activity of unreadActivities) {
          if (activity.id) {
            await markAsRead(activity.id)
          }
        }
      }
    } catch (error) {
      console.error('Dropdown aktiviteleri okundu olarak işaretlenemedi:', error)
    }
  }

  // Arama fonksiyonu
  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults({ blogs: [], comments: [], users: [] })
      return
    }
    
    try {
      setIsSearching(true)
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
        blogs: blogs.slice(0, 5),
        comments: filteredComments.slice(0, 5),
        users: filteredUsers.slice(0, 5)
      })
    } catch (err) {
      // Arama hatası sessizce işlendi
    } finally {
      setIsSearching(false)
    }
  }

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Aktiviteleri yükle
  useEffect(() => {
    const loadActivities = async () => {
      try {
        setActivitiesLoading(true)
        const activitiesData = await getRecentActivities(5) // Son 5 aktivite
        setActivities(activitiesData)
      } catch (error) {
        console.error('Aktiviteler yüklenirken hata:', error)
      } finally {
        setActivitiesLoading(false)
      }
    }

    loadActivities()
  }, [])


  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 z-40 border-b border-white/20 backdrop-blur-lg transition-all duration-300 left-0 ${
        sidebarCollapsed ? 'lg:left-16' : 'lg:left-64'
      }`}
      style={{ 
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 40
      }}
    >
      <div className="w-full h-16 flex items-center justify-between px-4 sm:px-6">
        {/* Left Side - Menu Button & Logo */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-200 relative z-50"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            aria-label="Menüyü Aç"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop Sidebar Toggle Button */}
          <button
            onClick={onSidebarToggle}
            className="hidden lg:flex p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-200 relative z-50"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            title={sidebarCollapsed ? "Sidebar'ı Aç" : "Sidebar'ı Kapat"}
            aria-label={sidebarCollapsed ? "Sidebar'ı Aç" : "Sidebar'ı Kapat"}
          >
            <Menu className={`h-5 w-5 transition-transform duration-300 ${
              sidebarCollapsed ? 'rotate-0' : 'rotate-90'
            }`} />
          </button>

        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-lg mx-4 hidden md:block">
          <div className="relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Blog, yorum veya kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  handleSearch(e.target.value)
                }}
                onFocus={() => setSearchOpen(true)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border-0 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSearchResults({ blogs: [], comments: [], users: [] })
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchOpen && (searchTerm || searchResults.blogs.length > 0 || searchResults.comments.length > 0 || searchResults.users.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-12 left-0 right-0 glass rounded-lg shadow-modern border border-white/20 backdrop-blur-lg z-[70]"
                  style={{ 
                    background: 'rgba(15, 23, 42, 0.98)',
                    maxHeight: '400px',
                    overflowY: 'auto'
                  }}
                >
                  {isSearching ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
                    </div>
                  ) : (
                    <div className="p-4 space-y-4">
                      {/* Blog Sonuçları */}
                      {searchResults.blogs.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-blue-400" />
                            Blog Yazıları ({searchResults.blogs.length})
                          </h4>
                          <div className="space-y-2">
                            {searchResults.blogs.map((blog) => (
                              <Link
                                key={blog.id}
                                href={`/dashboard/blogs/${blog.id}/view`}
                                className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                onClick={() => setSearchOpen(false)}
                              >
                                <h5 className="text-white font-medium text-sm">{blog.title}</h5>
                                <p className="text-neutral-400 text-xs mt-1 line-clamp-2">{blog.excerpt}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Yorum Sonuçları */}
                      {searchResults.comments.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2 text-purple-400" />
                            Yorumlar ({searchResults.comments.length})
                          </h4>
                          <div className="space-y-2">
                            {searchResults.comments.map((comment) => (
                              <div key={comment.id} className="p-3 bg-white/5 rounded-lg">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-white font-medium text-sm">{comment.authorName}</span>
                                  <span className="text-neutral-400 text-xs">{comment.authorEmail}</span>
                                </div>
                                <p className="text-neutral-300 text-xs line-clamp-2">{comment.content}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Kullanıcı Sonuçları */}
                      {searchResults.users.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <Users className="h-4 w-4 mr-2 text-green-400" />
                            Kullanıcılar ({searchResults.users.length})
                          </h4>
                          <div className="space-y-2">
                            {searchResults.users.map((user) => (
                              <div key={user.id} className="p-3 bg-white/5 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h5 className="text-white font-medium text-sm">{user.name}</h5>
                                    <p className="text-neutral-400 text-xs">{user.email}</p>
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
                      
                      {searchTerm && searchResults.blogs.length === 0 && searchResults.comments.length === 0 && searchResults.users.length === 0 && !isSearching && (
                        <div className="text-center py-8 text-neutral-400">
                          "{searchTerm}" için sonuç bulunamadı
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Mobile Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2.5 rounded-lg text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-200"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Home Link */}
          <Link 
            href="/"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-white/20"
          >
            <Home className="h-5 w-5 text-neutral-300 hover:text-white" />
            <span className="text-sm text-neutral-300 hover:text-white hidden lg:inline">Ana Site</span>
          </Link>

          {/* Notifications */}
          <div className="relative flex-shrink-0" ref={notificationsRef}>
            <button
              onClick={handleNotificationsToggle}
              className="relative p-2.5 rounded-lg text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-200"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="fixed top-20 right-4 glass rounded-md shadow-modern border border-white/20 backdrop-blur-lg z-[70] w-80 max-w-[calc(100vw-2rem)]"
                style={{ 
                  background: 'rgba(15, 23, 42, 0.98)',
                  maxHeight: 'min(300px, calc(100vh - 6rem))',
                  minWidth: '280px'
                }}
              >
                <div className="p-2 border-b border-white/20">
                  <h3 className="text-xs font-semibold text-white">Son Aktiviteler</h3>
                </div>
                <div className="overflow-y-auto max-h-48">
                  {activitiesLoading ? (
                    <div className="p-3 text-center">
                      <Loader2 className="w-4 h-4 animate-spin mx-auto text-cyan-400" />
                      <p className="text-xs text-neutral-400 mt-2">Yükleniyor...</p>
                    </div>
                  ) : activities.length > 0 ? (
                    activities.map((activity) => (
                      <div
                        key={activity.id}
                        onClick={() => activity.id && handleActivityClick(activity.id)}
                        className={`p-3 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors ${
                          !activity.isRead ? 'bg-cyan-500/10 border-cyan-500/20' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center bg-cyan-100 dark:bg-cyan-900/20">
                            <span className="text-xs">
                              {activity.type === 'blog_liked' ? '❤️' : 
                               activity.type === 'comment_liked' ? '👍' : 
                               activity.type === 'comment_added' ? '💬' : 
                               activity.type === 'blog_created' ? '📝' : 
                               activity.type === 'blog_updated' ? '✏️' : 
                               activity.type === 'blog_published' ? '🚀' : 
                               activity.type === 'user_login' ? '🔐' : 
                               activity.type === 'seo_optimized' ? '🔍' : '📋'}
                            </span>
                            {!activity.isRead && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm text-white font-medium leading-relaxed">
                                {activity.description}
                              </p>
                              {!activity.isRead && (
                                <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                                  YENİ
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-400 mt-1">
                              {new Date(activity.createdAt.seconds * 1000).toLocaleString('tr-TR')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center">
                      <p className="text-xs text-neutral-400">Henüz aktivite yok</p>
                    </div>
                  )}
                </div>
                <div className="p-3 text-center border-t border-white/20">
                  <button 
                    onClick={handleViewAllNotifications}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                  >
                    Tümünü gör
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative flex-shrink-0" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-white/20"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shadow-modern bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
                <img 
                  src="/transparent.webp" 
                  alt="Admin Avatar" 
                  className="w-5 h-5 object-cover"
                />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white">
                  {userLoading ? 'Yükleniyor...' : (user?.displayName || 'Admin')}
                </p>
                <p className="text-xs text-neutral-400">
                  {userLoading ? '...' : (user?.email || 'admin@softiel.com')}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-neutral-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-12 right-0 glass rounded-md shadow-modern border border-white/20 backdrop-blur-lg z-[70]"
                style={{ 
                  background: 'rgba(15, 23, 42, 0.98)',
                  width: '240px',
                  maxWidth: 'calc(100vw - 2rem)',
                  minWidth: '200px'
                }}
              >
                <div className="p-3 border-b border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shadow-modern bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
                      <img 
                        src="/transparent.webp" 
                        alt="Admin Avatar" 
                        className="w-5 h-5 object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">
                        {userLoading ? 'Yükleniyor...' : (user?.displayName || 'Admin')}
                      </p>
                      <p className="text-xs text-neutral-400 truncate">
                        {userLoading ? '...' : (user?.email || 'admin@softiel.com')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <button 
                    onClick={handleProfileSettings}
                    className="w-full text-left px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/20 hover:text-white transition-colors flex items-center space-x-3"
                  >
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span>Profil Ayarları</span>
                  </button>
                  <hr className="my-1 border-white/20" />
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors flex items-center space-x-3"
                  >
                    <LogOut className="h-4 w-4 flex-shrink-0" />
                    <span>Çıkış Yap</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20 md:hidden"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="w-full max-w-sm bg-slate-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl max-h-[70vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Arama</h3>
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-neutral-400 hover:text-white" />
                  </button>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Blog, yorum veya kullanıcı ara..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      handleSearch(e.target.value)
                    }}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border-0 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                    autoFocus
                  />
                </div>
              </div>
              
              <div className="p-4 overflow-y-auto max-h-[50vh]">
                <div className="space-y-4">
                  {/* Blog Sonuçları */}
                  {searchResults.blogs.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-blue-400" />
                        Blog Yazıları ({searchResults.blogs.length})
                      </h4>
                      <div className="space-y-2">
                        {searchResults.blogs.map((blog) => (
                          <Link
                            key={blog.id}
                            href={`/dashboard/blogs/${blog.id}/view`}
                            className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5"
                            onClick={() => setSearchOpen(false)}
                          >
                            <h5 className="text-white font-medium text-sm">{blog.title}</h5>
                            <p className="text-neutral-400 text-xs mt-1 line-clamp-2">{blog.excerpt}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                
                  {/* Yorum Sonuçları */}
                  {searchResults.comments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-purple-400" />
                        Yorumlar ({searchResults.comments.length})
                      </h4>
                      <div className="space-y-2">
                        {searchResults.comments.map((comment) => (
                          <div key={comment.id} className="p-3 bg-white/5 rounded-lg border border-white/5">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-white font-medium text-sm">{comment.authorName}</span>
                              <span className="text-neutral-400 text-xs">{comment.authorEmail}</span>
                            </div>
                            <p className="text-neutral-300 text-xs line-clamp-2">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                
                  {/* Kullanıcı Sonuçları */}
                  {searchResults.users.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-green-400" />
                        Kullanıcılar ({searchResults.users.length})
                      </h4>
                      <div className="space-y-2">
                        {searchResults.users.map((user) => (
                          <div key={user.id} className="p-3 bg-white/5 rounded-lg border border-white/5">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="text-white font-medium text-sm">{user.name}</h5>
                                <p className="text-neutral-400 text-xs">{user.email}</p>
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
                  
                  {searchTerm && searchResults.blogs.length === 0 && searchResults.comments.length === 0 && searchResults.users.length === 0 && !isSearching && (
                    <div className="text-center py-6 text-neutral-400">
                      <p className="text-sm">"{searchTerm}" için sonuç bulunamadı</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
