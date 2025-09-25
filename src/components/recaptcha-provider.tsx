"use client"

import React, { useEffect, useState } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { getRecaptchaConfig, isRecaptchaAvailable } from '@/lib/recaptcha'

interface RecaptchaProviderProps {
  children: React.ReactNode
}

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const config = getRecaptchaConfig()

  useEffect(() => {
    // reCAPTCHA'nın yüklenip yüklenmediğini kontrol et
    if (config.enabled && config.siteKey) {
      setIsLoaded(true)
    } else {
      // Development'ta veya site key yoksa hemen yükle
      setIsLoaded(true)
    }
  }, [config.enabled, config.siteKey])

  // reCAPTCHA kullanılabilir değilse children'ı direkt render et
  if (!isRecaptchaAvailable()) {
    return <>{children}</>
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={config.siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
      useRecaptchaNet={false}
      useEnterprise={false}
      container={{
        element: undefined,
        parameters: {
          badge: 'bottomright',
          theme: 'dark',
        },
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
