"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  Home,
  MessageSquare,
  Calendar,
  Image,
  Search,
  Shield,
  Database,
  Mail,
  HelpCircle,
  ChevronRight,
  X,
  ChevronLeft
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCurrentUser } from "@/hooks/use-current-user"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ isOpen, onClose, collapsed, onToggle }: SidebarProps) {
  const { user, loading: userLoading } = useCurrentUser()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(collapsed || false)
  const pathname = usePathname()

  // Parent'tan gelen collapsed state'i kullan
  React.useEffect(() => {
    if (collapsed !== undefined) {
      setSidebarCollapsed(collapsed)
    }
  }, [collapsed])

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: pathname === '/dashboard'
    },
    {
      name: 'Blog Yazıları',
      href: '/dashboard/blogs',
      icon: FileText,
      current: pathname.startsWith('/dashboard/blogs')
    },
    {
      name: 'Yeni Blog',
      href: '/dashboard/blogs/new',
      icon: Plus,
      current: pathname === '/dashboard/blogs/new'
    },
    {
      name: 'Medya Kütüphanesi',
      href: '/dashboard/media',
      icon: Image,
      current: pathname.startsWith('/dashboard/media')
    },
    {
      name: 'İstatistikler',
      href: '/dashboard/stats',
      icon: BarChart3,
      current: pathname.startsWith('/dashboard/stats')
    },
    {
      name: 'Kullanıcılar',
      href: '/dashboard/users',
      icon: Users,
      current: pathname.startsWith('/dashboard/users')
    },
    {
      name: 'Yorumlar',
      href: '/dashboard/comments',
      icon: MessageSquare,
      current: pathname.startsWith('/dashboard/comments')
    },
    {
      name: 'Takvim',
      href: '/dashboard/calendar',
      icon: Calendar,
      current: pathname.startsWith('/dashboard/calendar')
    }
  ]

  const tools = [
    {
      name: 'Arama Optimizasyonu',
      href: '/dashboard/seo',
      icon: Search,
      current: pathname.startsWith('/dashboard/seo')
    },
    {
      name: 'Güvenlik',
      href: '/dashboard/security',
      icon: Shield,
      current: pathname.startsWith('/dashboard/security')
    },
    {
      name: 'Veritabanı',
      href: '/dashboard/database',
      icon: Database,
      current: pathname.startsWith('/dashboard/database')
    },
    {
      name: 'Site Ayarları',
      href: '/dashboard/settings',
      icon: Settings,
      current: pathname.startsWith('/dashboard/settings')
    }
  ]

  const external = [
    {
      name: 'Ana Site',
      href: '/',
      icon: Home,
      external: true
    },
    {
      name: 'İletişim',
      href: '/iletisim',
      icon: Mail,
      external: true
    },
    {
      name: 'Yardım',
      href: '/help',
      icon: HelpCircle,
      external: true
    }
  ]

  const handleLogout = () => {
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

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ 
          x: isOpen ? 0 : -300,
          width: sidebarCollapsed ? 80 : 256
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed inset-y-0 left-0 z-50 glass border-r border-white/50 dark:border-white/40 backdrop-blur-lg lg:translate-x-0 lg:static lg:inset-0 lg:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'justify-between px-6'} py-6 border-b border-white/20`}>
            <div className={`flex items-center ${sidebarCollapsed ? '' : 'space-x-3'}`}>
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-modern">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <h1 className="text-xl font-bold text-white">Softiel Admin</h1>
                  <p className="text-xs text-neutral-400">Yönetim Paneli</p>
                </motion.div>
              )}
            </div>
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onToggle || (() => setSidebarCollapsed(!sidebarCollapsed))}
                  className="p-2 glass rounded-lg hover:bg-white/10 transition-colors shadow-modern"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  title="Sidebar'ı Kapat"
                >
                  <motion.div
                    animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </motion.div>
                </button>
                <button
                  onClick={onClose}
                  className="lg:hidden p-2 glass rounded-lg hover:bg-white/10 transition-colors shadow-modern"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            )}
            {sidebarCollapsed && (
              <button
                onClick={onToggle || (() => setSidebarCollapsed(!sidebarCollapsed))}
                className="p-2 glass rounded-lg hover:bg-white/10 transition-colors shadow-modern"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                title="Sidebar'ı Aç"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className={`flex-1 overflow-y-auto ${sidebarCollapsed ? 'px-2' : 'px-4'} py-6`}>
            {/* Main Navigation */}
            <div className="space-y-2 mb-8">
              {!sidebarCollapsed && (
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                  Ana Menü
                </h3>
              )}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-3'} py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    item.current
                      ? 'bg-white/20 text-white shadow-modern'
                      : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                  }`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <div className={`flex items-center ${sidebarCollapsed ? '' : 'space-x-3'}`}>
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="overflow-hidden whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {item.current && !sidebarCollapsed && (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Link>
              ))}
            </div>

            {/* Tools Section */}
            <div className="space-y-2 mb-8">
              {!sidebarCollapsed && (
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                  Araçlar
                </h3>
              )}
              {tools.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-3'} py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    item.current
                      ? 'bg-white/20 text-white shadow-modern'
                      : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                  }`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <div className={`flex items-center ${sidebarCollapsed ? '' : 'space-x-3'}`}>
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="overflow-hidden whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {item.current && !sidebarCollapsed && (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Link>
              ))}
            </div>

            {/* External Links */}
            <div className="space-y-2">
              {!sidebarCollapsed && (
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                  Dış Bağlantılar
                </h3>
              )}
              {external.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={`group flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-3'} py-3 text-sm font-medium rounded-xl transition-all duration-200 text-neutral-300 hover:bg-white/10 hover:text-white`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <div className={`flex items-center ${sidebarCollapsed ? '' : 'space-x-3'}`}>
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="overflow-hidden whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {!sidebarCollapsed && (
                    <div className="w-2 h-2 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* User Info and Logout */}
          <div className={`${sidebarCollapsed ? 'px-2' : 'px-4'} py-6 border-t border-white/20`}>
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="/transparent.webp" 
                    alt="Admin Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-white">
                    {userLoading ? 'Yükleniyor...' : (user?.displayName || 'Admin')}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {userLoading ? '...' : (user?.email || 'admin@softiel.com')}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-3 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-200`}
              title={sidebarCollapsed ? "Çıkış Yap" : undefined}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="overflow-hidden whitespace-nowrap">
                  Çıkış Yap
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
