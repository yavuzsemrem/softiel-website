"use client"

import React from "react"
import { Home, ArrowLeft, AlertTriangle } from "lucide-react"

export function NotFoundHero() {
  return (
    <section className="relative pt-20 pb-8 lg:pt-32 lg:pb-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8 animate-slide-up" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <AlertTriangle className="h-5 w-5 text-red-500 fill-current" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              404 Hata
            </span>
          </div>

          {/* 404 Number */}
          <div className="mb-8 animate-scale-in">
            <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-display font-bold text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text leading-none">
              404
            </h1>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-900 dark:text-white mb-6 leading-tight animate-slide-up">
            Sayfa{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Bulunamadı
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Ana sayfaya dönmek için aşağıdaki seçenekleri kullanabilirsiniz.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <a
              href="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Home className="h-5 w-5" />
              <span>Ana Sayfaya Dön</span>
            </a>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 glass px-8 py-4 rounded-2xl font-semibold text-lg text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: 'rgba(148, 148, 148, 0.1)' }}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Geri Git</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
