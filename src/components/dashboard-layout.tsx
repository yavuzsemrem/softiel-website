"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { DashboardNavbar } from "./dashboard-navbar"
import { DashboardSidebar } from "./dashboard-sidebar"
import { getUserById } from "@/lib/firestore-auth"
import { sessionService } from "@/lib/session"
import { ToastProvider } from "./toast"
import { useCurrentUser } from "@/hooks/use-current-user"
import { NotificationProvider } from "@/contexts/notification-context"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()
  const { user: currentUser } = useCurrentUser()

  // Logout function
  const handleLogout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userName')
      localStorage.removeItem('userId')
      
      // Clear session service
      if (typeof window !== 'undefined') {
        const { sessionService } = await import('@/lib/session')
        sessionService.clearSession()
      }
      
      // Set auth state to false immediately
      setIsAuthenticated(false)
      setUserRole(null)
      
      // Redirect to login page
      router.push('/admin-panel-secure-access-2024')
    } catch (error) {
      // Logout hatası sessizce işlendi
      // Even if there's an error, still redirect
      router.push('/admin-panel-secure-access-2024')
    }
  }

  // Responsive layout kontrolü
  useEffect(() => {
    const handleResize = () => {
      // Sadece gerekli durumlarda overflow kontrolü
      if (window.innerWidth < 768) {
        document.body.style.overflowX = 'hidden'
      } else {
        document.body.style.overflowX = 'auto'
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        
        // Check localStorage for session data
        const isAuth = localStorage.getItem('isAuthenticated')
        const userRole = localStorage.getItem('userRole')
        const userId = localStorage.getItem('userId')
        
        if (isAuth === 'true' && userRole && userId) {
          // Verify user still exists and is active in Firestore
          const userData = await getUserById(userId)
          
          if (userData && userData.isActive) {
            const allowedRoles = ['admin', 'editor', 'author', 'viewer']
            if (allowedRoles.includes(userData.role)) {
              setUserRole(userData.role)
              setIsAuthenticated(true)
              setIsLoading(false)
              return
            }
          }
        }

        // If we get here, authentication failed
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userRole')
        localStorage.removeItem('userEmail')
        localStorage.removeItem('userName')
        localStorage.removeItem('userId')
        router.push('/admin-panel-secure-access-2024')
      } catch (error) {
        // Auth check failed, redirect to login
        localStorage.clear()
        router.push('/admin-panel-secure-access-2024')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Logo with Multiple Effects */}
          <motion.div 
            className="relative mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-32 h-32 mx-auto relative">
              {/* Outer rotating ring */}
              <motion.div 
                className="absolute inset-0 border-2 border-cyan-400/40 border-t-cyan-400 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Middle pulsing ring */}
              <motion.div 
                className="absolute inset-2 border border-cyan-500/60 rounded-full"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Inner glow effect */}
              <motion.div 
                className="absolute inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Logo with floating animation */}
              <motion.img 
                src="/transparent.png" 
                alt="Softiel Logo" 
                className="w-full h-full object-contain relative z-10"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9],
                  y: [0, -2, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Floating particles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: '0 0'
                  }}
                  animate={{
                    x: [0, Math.cos(i * Math.PI / 2) * 60, 0],
                    y: [0, Math.sin(i * Math.PI / 2) * 60, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Loading dots - closer to logo */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }


  // Redirect if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <NotificationProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black dark:from-slate-800 dark:via-slate-900 dark:via-slate-950 dark:via-black dark:to-black">
          <div className="flex min-h-screen overflow-hidden">
            {/* Sidebar */}
            <DashboardSidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
              user={currentUser}
            />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${
              sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
            }`}>
              {/* Navbar */}
              <DashboardNavbar 
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                sidebarCollapsed={sidebarCollapsed}
                onLogout={handleLogout}
              />

              {/* Page Content */}
              <main className="flex-1 relative overflow-y-auto overflow-x-hidden pt-20">
                <div className="px-4 sm:px-6 lg:px-8 py-4">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      </ToastProvider>
    </NotificationProvider>
  )
}
