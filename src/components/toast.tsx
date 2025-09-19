"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 4000
    }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto hide
    setTimeout(() => {
      hideToast(id)
    }, newToast.duration)
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onHide={hideToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

function ToastContainer({ toasts, onHide }: { toasts: Toast[], onHide: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onHide={onHide} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onHide }: { toast: Toast, onHide: (id: string) => void }) {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />
      default:
        return <Info className="h-5 w-5 text-blue-400" />
    }
  }

  const getColors = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/30'
      case 'error':
        return 'bg-red-500/20 border-red-500/30'
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/30'
      case 'info':
        return 'bg-blue-500/20 border-blue-500/30'
      default:
        return 'bg-blue-500/20 border-blue-500/30'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`glass rounded-xl p-4 border backdrop-blur-lg shadow-modern-lg max-w-sm ${getColors()}`}
      style={{ background: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white mb-1">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-xs text-neutral-300 leading-relaxed">
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={() => onHide(toast.id)}
          className="flex-shrink-0 p-1 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}


