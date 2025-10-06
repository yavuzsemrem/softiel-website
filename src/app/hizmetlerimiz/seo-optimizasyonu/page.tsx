"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SEOOptimizasyonuRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Türkçe sayfaya yönlendir
    router.replace('/tr/hizmetlerimiz/seo-optimizasyonu')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Yönlendiriliyor...</p>
      </div>
    </div>
  )
}
