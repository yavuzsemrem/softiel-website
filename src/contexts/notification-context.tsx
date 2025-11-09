"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface NotificationContextType {
  unreadCount: number
  updateUnreadCount: () => Promise<void>
  markAllAsRead: () => Promise<void>
  markAsRead: (activityId: string) => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0)
  const pathname = usePathname()
  
  // Sadece CMS sayfalarında Firebase'i yükle - login sayfasında YÜKLEMEyelim
  const isDashboardPage = pathname?.includes('/content-management-system-2024')

  const updateUnreadCount = async () => {
    // Dashboard sayfası değilse Firebase'i yükleme
    if (!isDashboardPage) {
      return
    }
    
    try {
      // Firebase'i sadece gerektiğinde import et
      const { getUnreadActivitiesCount } = await import('@/lib/activity-service')
      const count = await getUnreadActivitiesCount()
      
      // Sadece sayı değiştiyse state'i güncelle
      setUnreadCount(prevCount => {
        if (prevCount !== count) {
          return count
        }
        return prevCount
      })
    } catch (error) {
      console.error('Okunmamış bildirim sayısı güncellenemedi:', error)
    }
  }

  const markAllAsRead = async () => {
    if (!isDashboardPage) {
      return
    }
    
    try {
      const { markAllActivitiesAsRead } = await import('@/lib/activity-service')
      await markAllActivitiesAsRead()
      setUnreadCount(0)
    } catch (error) {
      console.error('Tüm bildirimler okundu olarak işaretlenemedi:', error)
    }
  }

  const markAsRead = async (activityId: string) => {
    if (!isDashboardPage) {
      return
    }
    
    try {
      const { markActivityAsRead } = await import('@/lib/activity-service')
      await markActivityAsRead(activityId)
      await updateUnreadCount()
    } catch (error) {
      console.error('Bildirim okundu olarak işaretlenemedi:', error)
    }
  }

  // Sadece dashboard sayfalarında Firebase'i başlat
  useEffect(() => {
    if (isDashboardPage) {
      updateUnreadCount()
    }
  }, [isDashboardPage])

  // Periyodik güncelleme - sadece dashboard sayfalarında
  useEffect(() => {
    if (!isDashboardPage) {
      return
    }
    
    const interval = setInterval(() => {
      updateUnreadCount()
    }, 30000) // 30 saniyede bir güncelle

    return () => clearInterval(interval)
  }, [isDashboardPage])

  // Custom event listener - sadece dashboard sayfalarında
  useEffect(() => {
    if (!isDashboardPage) {
      return
    }
    
    const handleNotificationUpdate = () => {
      updateUnreadCount()
    }

    window.addEventListener('notification-updated', handleNotificationUpdate)
    
    return () => {
      window.removeEventListener('notification-updated', handleNotificationUpdate)
    }
  }, [isDashboardPage])

  return (
    <NotificationContext.Provider value={{ unreadCount, updateUnreadCount, markAllAsRead, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}