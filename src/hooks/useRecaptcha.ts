"use client"

import { useCallback, useEffect, useState } from 'react'
import { RECAPTCHA_CONFIG, RECAPTCHA_ACTIONS, isReCAPTCHAEnabled } from '@/config/recaptcha'

declare global {
  interface Window {
    grecaptcha: any
  }
}

export const useRecaptcha = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // ReCAPTCHA script'ini yükle
  useEffect(() => {
    if (typeof window === 'undefined') return

    // ReCAPTCHA sadece production'da çalışır
    if (!isReCAPTCHAEnabled()) {
      setIsLoaded(true)
      setIsReady(true)
      return
    }

    // Eğer zaten yüklenmişse
    if (window.grecaptcha && window.grecaptcha.ready) {
      setIsLoaded(true)
      window.grecaptcha.ready(() => {
        setIsReady(true)
      })
      return
    }

    // Mevcut script'i kontrol et
    const existingScript = document.querySelector(`script[src*="recaptcha"]`)
    if (existingScript) {
      setIsLoaded(true)
      // Script yükleniyor, ready event'ini bekle
      const checkReady = () => {
        if (window.grecaptcha && window.grecaptcha.ready) {
          window.grecaptcha.ready(() => {
            setIsReady(true)
          })
        } else {
          setTimeout(checkReady, 100)
        }
      }
      checkReady()
      return
    }

    // Script'i yükle
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_CONFIG.siteKey}`
    script.async = true
    script.defer = true
    
    script.onload = () => {
      setIsLoaded(true)
      
      // ReCAPTCHA hazır olduğunda
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          setIsReady(true)
        })
      } else {
        // Fallback: 1 saniye bekle ve tekrar dene
        setTimeout(() => {
          if (window.grecaptcha && window.grecaptcha.ready) {
            window.grecaptcha.ready(() => {
              setIsReady(true)
            })
          } else {
            setIsReady(true) // Hata durumunda devam et
          }
        }, 1000)
      }
    }

    script.onerror = () => {
      console.error('ReCAPTCHA yüklenemedi')
      setIsLoaded(true)
      setIsReady(true)
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup sadece gerekirse
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  // Token al
  const executeRecaptcha = useCallback(async (action: keyof typeof RECAPTCHA_ACTIONS): Promise<string | null> => {
    if (!isReCAPTCHAEnabled() || !isReady) {
      return null
    }

    // ReCAPTCHA'nın hazır olduğundan emin ol
    if (!window.grecaptcha || !window.grecaptcha.execute) {
      return null
    }

    try {
      // ReCAPTCHA ready durumunu kontrol et
      await new Promise<void>((resolve) => {
        if (window.grecaptcha && window.grecaptcha.ready) {
          window.grecaptcha.ready(() => resolve())
        } else {
          resolve() // Hata durumunda devam et
        }
      })

      const token = await window.grecaptcha.execute(RECAPTCHA_CONFIG.siteKey, {
        action: RECAPTCHA_ACTIONS[action]
      })
      return token
    } catch (error) {
      console.error('ReCAPTCHA token alınamadı:', error)
      return null
    }
  }, [isReady])

  return {
    isLoaded,
    isReady,
    isEnabled: isReCAPTCHAEnabled(),
    executeRecaptcha
  }
}
