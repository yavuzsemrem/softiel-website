"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getUnreadActivitiesCount, markAllActivitiesAsRead, markActivityAsRead } from '@/lib/activity-service'

interface NotificationContextType {
  unreadCount: number
  updateUnreadCount: () => Promise<void>
  markAllAsRead: () => Promise<void>
  markAsRead: (activityId: string) => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0)

  const updateUnreadCount = async () => {
    try {
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
    try {
      await markAllActivitiesAsRead()
      setUnreadCount(0)
    } catch (error) {
      console.error('Tüm bildirimler okundu olarak işaretlenemedi:', error)
    }
  }

  const markAsRead = async (activityId: string) => {
    try {
      await markActivityAsRead(activityId)
      await updateUnreadCount()
    } catch (error) {
      console.error('Bildirim okundu olarak işaretlenemedi:', error)
    }
  }


  // Sayfa yüklendiğinde sayıyı güncelle
  useEffect(() => {
    updateUnreadCount()
  }, [])

  // Periyodik güncelleme - daha az sıklıkta güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      updateUnreadCount()
    }, 30000) // 30 saniyede bir güncelle (daha az sıklıkta)

    return () => clearInterval(interval)
  }, [])

  // Custom event listener - yeni aktivite oluştuğunda güncelle
  useEffect(() => {
    const handleNotificationUpdate = () => {
      updateUnreadCount()
    }

    window.addEventListener('notification-updated', handleNotificationUpdate)
    
    return () => {
      window.removeEventListener('notification-updated', handleNotificationUpdate)
    }
  }, [])

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