"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  Users, 
  LogOut,
  MessageSquare,
  Database,
  ChevronRight,
  X,
  Tag,
  Briefcase
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCurrentUser, CurrentUser } from "@/hooks/use-current-user"

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
  collapsed: boolean
  onToggle: () => void
  user?: CurrentUser | null
}

export function DashboardSidebar({ isOpen, onClose, collapsed, onToggle, user: propUser }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { user: hookUser, loading } = useCurrentUser()
  
  // Prop'tan gelen user'ı öncelikle kullan, yoksa hook'tan geleni kullan
  const user = propUser || hookUser
  
  // User data is available from props or hook

  const navigation = [
    {
      name: 'Dashboard',
      href: '/content-management-system-2024',
      icon: LayoutDashboard,
      current: pathname === '/content-management-system-2024' || pathname === '/content-management-system-2024/'
    },
    {
      name: 'Blog Yazıları',
      href: '/content-management-system-2024/blogs',
      icon: FileText,
      current: pathname.startsWith('/content-management-system-2024/blogs') && !pathname.startsWith('/content-management-system-2024/blogs/new')
    },
    {
      name: 'Yeni Blog',
      href: '/content-management-system-2024/blogs/new',
      icon: Plus,
      current: pathname.startsWith('/content-management-system-2024/blogs/new')
    },
    {
      name: 'Projelerimiz',
      href: '/content-management-system-2024/projects',
      icon: Briefcase,
      current: pathname.startsWith('/content-management-system-2024/projects') && !pathname.startsWith('/content-management-system-2024/projects/new')
    },
    {
      name: 'Yeni Proje',
      href: '/content-management-system-2024/projects/new',
      icon: Plus,
      current: pathname.startsWith('/content-management-system-2024/projects/new')
    },
    {
      name: 'Kategoriler',
      href: '/content-management-system-2024/categories',
      icon: Database,
      current: pathname.startsWith('/content-management-system-2024/categories')
    },
    {
      name: 'Etiketler',
      href: '/content-management-system-2024/tags',
      icon: Tag,
      current: pathname.startsWith('/content-management-system-2024/tags')
    },
    {
      name: 'Kullanıcılar',
      href: '/content-management-system-2024/users',
      icon: Users,
      current: pathname.startsWith('/content-management-system-2024/users')
    },
    {
      name: 'Yorumlar',
      href: '/content-management-system-2024/comments',
      icon: MessageSquare,
      current: pathname.startsWith('/content-management-system-2024/comments')
    }
  ]



  const handleLogout = () => {
    // Logout işlemi - gerçek uygulamada token temizleme vs. yapılacak
    window.location.href = '/admin-panel-secure-access-2024'
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/50 dark:border-white/40 backdrop-blur-lg lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)' }}
      >
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="relative px-6 py-6 border-b border-white/20">
            {/* Close Button - Top Right */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              aria-label="Menüyü Kapat"
            >
              <X className="h-5 w-5 text-white group-hover:text-red-400 transition-colors" />
            </button>
            
            {/* Logo and Title */}
            <div className="flex items-center space-x-1 pr-16">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
                <img 
                  src="/transparent.png" 
                  alt="Softiel Logo" 
                  className="w-12 h-12 sm:w-13 sm:h-13 object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h1 className="text-white leading-tight" style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '13px' }}>
                  Softiel
                </h1>
                <p className="text-xs text-cyan-300 font-medium tracking-wide mt-0.5 whitespace-nowrap">Yönetim Paneli</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Main Navigation */}
            <div className="space-y-1 mb-8">
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 px-3">
                Ana Menü
              </h3>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    item.current
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white shadow-lg '
                      : 'text-neutral-300 hover:bg-white/10 hover:text-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`h-5 w-5 flex-shrink-0 transition-colors ${
                      item.current ? 'text-cyan-400' : 'text-neutral-400 group-hover:text-white'
                    }`} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.current && (
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                  )}
                </Link>
              ))}
            </div>


          </div>

          {/* User Info and Logout */}
          <div className="px-6 py-6 border-t border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shadow-modern bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
                <img 
                  src="/transparent.png" 
                  alt="Admin Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {loading ? 'Yükleniyor...' : (user?.displayName || 'Admin')}
                </p>
                <p className="text-xs text-neutral-400">
                  {loading ? '...' : (user?.email || 'admin@softiel.com')}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-3 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-200"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 border-r border-white/50 dark:border-white/40 backdrop-blur-lg transition-all duration-300 ${
        collapsed ? 'lg:w-16' : 'lg:w-64'
      }`} style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)' }}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className={`${collapsed ? 'px-3' : 'px-6'} py-6 border-b border-white/20`}>
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'}`}>
              <div className="flex items-center space-x-0">
                <div className={`${collapsed ? 'w-12 h-12' : 'w-16 h-16'} ${collapsed ? 'rounded-xl' : 'rounded-2xl'} flex items-center justify-center overflow-hidden flex-shrink-0`}>
                  <img 
                    src="/transparent.png" 
                    alt="Softiel Logo" 
                    className={`${collapsed ? 'w-7 h-7' : 'w-12 h-12'} object-cover`}
                  />
                </div>
                {!collapsed && (
                  <div className="transition-opacity duration-300 flex flex-col justify-center">
                    <h1 className="text-white leading-tight" style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '13px' }}>
                      Softiel
                    </h1>
                    <p className="text-xs text-cyan-300 font-medium tracking-wide mt-0.5 whitespace-nowrap">Yönetim Paneli</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Main Navigation */}
            <div className="space-y-1 mb-8">
              {!collapsed && (
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 px-3">
                  Ana Menü
                </h3>
              )}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center ${
                    collapsed ? 'justify-center px-1 py-3 w-full' : 'justify-between px-4 py-3'
                  } text-sm font-medium rounded-xl transition-all duration-200 ${
                    item.current
                      ? collapsed 
                        ? 'text-cyan-400' 
                        : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white shadow-lg '
                      : 'text-neutral-300 hover:bg-white/10 hover:text-white hover:shadow-md'
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <div className={`flex items-center ${collapsed ? '' : 'space-x-3'}`}>
                    <item.icon className={`h-5 w-5 flex-shrink-0 transition-colors ${
                      item.current 
                        ? 'text-cyan-400' 
                        : 'text-neutral-400 group-hover:text-white'
                    } ${collapsed ? 'lg:h-6 lg:w-6' : ''}`} />
                    {!collapsed && <span className="font-medium">{item.name}</span>}
                  </div>
                  {!collapsed && item.current && (
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                  )}
                </Link>
              ))}
            </div>


          </div>

          {/* User Info and Logout */}
          <div className={`px-4 py-6 border-t border-white/20 ${collapsed ? 'px-2' : ''}`}>
            {!collapsed ? (
              <>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src="/transparent.png" 
                      alt="Admin Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {loading ? 'Yükleniyor...' : (user?.displayName || 'Admin')}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {loading ? '...' : (user?.email || 'admin@softiel.com')}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-3 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-200"
                >
                  <LogOut className={`h-5 w-5 flex-shrink-0 ${collapsed ? 'lg:h-6 lg:w-6' : ''}`} />
                  <span>Çıkış Yap</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="/transparent.png" 
                    alt="Admin Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={handleLogout}
                  className={`p-2 rounded-xl text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 ${
                    collapsed ? 'w-full' : ''
                  }`}
                  title="Çıkış Yap"
                >
                  <LogOut className={`h-5 w-5 flex-shrink-0 ${collapsed ? 'lg:h-6 lg:w-6' : ''}`} />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}