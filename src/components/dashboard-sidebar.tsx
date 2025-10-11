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
  X,
  Tag,
  Briefcase,
  ChevronDown
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
  const [openDropdowns, setOpenDropdowns] = React.useState<string[]>([])
  
  // Prop'tan gelen user'ı öncelikle kullan, yoksa hook'tan geleni kullan
  const user = propUser || hookUser
  
  // User data is available from props or hook

  // Alt sayfalar açıkken ilgili dropdown'ları aç (sadece yeni blog/proje sayfaları için)
  React.useEffect(() => {
    const shouldOpenDropdowns: string[] = []
    
    // Sadece alt sayfalar için dropdown aç
    if (pathname === '/content-management-system-2024/blogs/new') {
      shouldOpenDropdowns.push('Blog Yazıları')
    }
    if (pathname === '/content-management-system-2024/projects/new') {
      shouldOpenDropdowns.push('Projelerimiz')
    }
    
    setOpenDropdowns(shouldOpenDropdowns)
  }, [pathname])

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdowns(prev => 
      prev.includes(dropdownName) 
        ? prev.filter(name => name !== dropdownName)
        : [...prev, dropdownName]
    )
  }

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
      current: pathname === '/content-management-system-2024/blogs',
      hasDropdown: true,
      dropdownItems: [
        {
          name: 'Yeni Blog',
          href: '/content-management-system-2024/blogs/new',
          icon: Plus,
          current: pathname === '/content-management-system-2024/blogs/new'
        }
      ]
    },
    {
      name: 'Projelerimiz',
      href: '/content-management-system-2024/projects',
      icon: Briefcase,
      current: pathname === '/content-management-system-2024/projects',
      hasDropdown: true,
      dropdownItems: [
        {
          name: 'Yeni Proje',
          href: '/content-management-system-2024/projects/new',
          icon: Plus,
          current: pathname === '/content-management-system-2024/projects/new'
        }
      ]
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
                  src="/transparent.webp" 
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
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <div className={`group transition-all duration-200 ${
                        item.current
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white shadow-lg rounded-xl'
                          : 'text-neutral-300 hover:bg-white/10 hover:text-white hover:shadow-md rounded-xl'
                      } ${openDropdowns.includes(item.name) ? 'rounded-b-none' : ''}`}>
                        <div className="flex items-center justify-between px-4 py-3">
                          <Link
                            href={item.href}
                            className="flex items-center space-x-3 flex-1"
                          >
                            <item.icon className={`h-5 w-5 flex-shrink-0 transition-colors ${
                              item.current ? 'text-cyan-400' : 'text-neutral-400 group-hover:text-white'
                            }`} />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                          <button
                            onClick={() => toggleDropdown(item.name)}
                            className={`p-2 transition-colors ${
                              item.current
                                ? 'text-cyan-400 hover:text-white' 
                                : 'text-neutral-400 group-hover:text-white'
                            }`}
                          >
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform ${
                                openDropdowns.includes(item.name) ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                        </div>
                      </div>
                      {openDropdowns.includes(item.name) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden rounded-b-xl"
                        >
                          <div className="bg-white/5 backdrop-blur-sm">
                            {item.dropdownItems?.map((dropdownItem, index) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                                    dropdownItem.current 
                                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 shadow-lg' 
                                      : 'text-neutral-400 hover:text-cyan-400 hover:bg-white/5'
                                  }`}
                                >
                                  <dropdownItem.icon className={`h-4 w-4 transition-colors ${
                                    dropdownItem.current 
                                      ? 'text-cyan-400' 
                                      : 'text-cyan-400/70 hover:text-cyan-400'
                                  }`} />
                                <span>{dropdownItem.name}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
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
                    </Link>
                  )}
                </div>
              ))}
            </div>


          </div>

          {/* User Info and Logout */}
          <div className="px-6 py-6 border-t border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shadow-modern bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
                <img 
                  src="/transparent.webp" 
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
                    src="/transparent.webp" 
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
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      {collapsed ? (
                        <div>
                          <Link
                            href={item.href}
                            className={`group flex items-center justify-center px-1 py-3 w-full text-sm font-medium rounded-xl transition-all duration-200 ${
                              item.current
                                ? 'text-cyan-400' 
                                : 'text-neutral-300 hover:bg-white/10 hover:text-white hover:shadow-md'
                            }`}
                            title={item.name}
                          >
                            <item.icon className={`h-5 w-5 flex-shrink-0 transition-colors ${
                              item.current 
                                ? 'text-cyan-400' 
                                : 'text-neutral-400 group-hover:text-white'
                            } lg:h-6 lg:w-6`} />
                          </Link>
                          {openDropdowns.includes(item.name) && (
                            <div className="mt-1 space-y-1">
                              {item.dropdownItems?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  className={`group flex items-center justify-center px-1 py-2 w-full text-sm font-medium rounded-lg transition-all duration-200 ${
                                    dropdownItem.current
                                      ? 'text-cyan-400 bg-cyan-500/20' 
                                      : 'text-neutral-400 hover:text-cyan-400 hover:bg-white/10'
                                  }`}
                                  title={dropdownItem.name}
                                >
                                  <dropdownItem.icon className={`h-4 w-4 flex-shrink-0 transition-colors ${
                                    dropdownItem.current 
                                      ? 'text-cyan-400' 
                                      : 'text-cyan-400/70 group-hover:text-cyan-400'
                                  }`} />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className={`group transition-all duration-200 ${
                          item.current
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white shadow-lg rounded-xl'
                            : 'text-neutral-300 hover:bg-white/10 hover:text-white hover:shadow-md rounded-xl'
                        } ${openDropdowns.includes(item.name) ? 'rounded-b-none' : ''}`}>
                          <div className="flex items-center justify-between px-4 py-3">
                            <Link
                              href={item.href}
                              className="flex items-center space-x-3 flex-1"
                            >
                              <item.icon className={`h-5 w-5 flex-shrink-0 transition-colors ${
                                item.current
                                  ? 'text-cyan-400' 
                                  : 'text-neutral-400 group-hover:text-white'
                              }`} />
                              <span className="font-medium">{item.name}</span>
                            </Link>
                            <button
                              onClick={() => toggleDropdown(item.name)}
                              className={`p-2 transition-colors ${
                                item.current
                                  ? 'text-cyan-400 hover:text-white' 
                                  : 'text-neutral-400 group-hover:text-white'
                              }`}
                            >
                              <ChevronDown 
                                className={`h-4 w-4 transition-transform ${
                                  openDropdowns.includes(item.name) ? 'rotate-180' : ''
                                }`} 
                              />
                            </button>
                          </div>
                        </div>
                      )}
                      {!collapsed && openDropdowns.includes(item.name) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden rounded-b-xl"
                          >
                            <div className="bg-white/5 backdrop-blur-sm">
                              {item.dropdownItems?.map((dropdownItem, index) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                                    dropdownItem.current 
                                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 shadow-lg' 
                                      : 'text-neutral-400 hover:text-cyan-400 hover:bg-white/5'
                                  }`}
                                >
                                  <dropdownItem.icon className={`h-4 w-4 transition-colors ${
                                    dropdownItem.current 
                                      ? 'text-cyan-400' 
                                      : 'text-cyan-400/70 hover:text-cyan-400'
                                  }`} />
                                  <span>{dropdownItem.name}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                    </div>
                  ) : (
                    <Link
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
                    </Link>
                  )}
                </div>
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
                      src="/transparent.webp" 
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
                    src="/transparent.webp" 
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