"use client"

import React from "react"
import { 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Globe,
  Code,
  Smartphone,
  Search,
  Palette,
  Sparkles,
  Star
} from "lucide-react"

export function NotFoundContent() {
  const popularPages = [
    {
      title: "Ana Sayfa",
      description: "Softiel'in ana sayfasına dönün",
      icon: Home,
      href: "/",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Hakkımızda",
      description: "Ekibimizi ve değerlerimizi keşfedin",
      icon: User,
      href: "/hakkimizda",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Hizmetlerimiz",
      description: "Sunduğumuz dijital hizmetleri inceleyin",
      icon: Briefcase,
      href: "/hizmetlerimiz",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "İletişim",
      description: "Bizimle iletişime geçin",
      icon: Mail,
      href: "/iletisim",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Fiyatlandırma",
      description: "Hizmet fiyatlarımızı görün",
      icon: Phone,
      href: "/fiyatlandirma",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Blog",
      description: "Dijital dünyadan haberler ve ipuçları",
      icon: Globe,
      href: "/blog",
      color: "from-pink-500 to-pink-600"
    }
  ]

  const services = [
    {
      title: "Web Tasarım",
      description: "Modern ve responsive web siteleri",
      icon: Palette,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Web Geliştirme",
      description: "Özel web uygulamaları",
      icon: Code,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Mobil Uygulama",
      description: "iOS ve Android uygulamaları",
      icon: Smartphone,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "SEO Optimizasyonu",
      description: "Arama motoru optimizasyonu",
      icon: Search,
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section className="relative py-8 lg:py-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Popular Pages */}
        <div className="mb-20 animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8 animate-slide-up" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <Star className="h-5 w-5 text-cyan-500 fill-current" />
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Popüler Sayfalar
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6 animate-slide-up">
              Belki{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Bunları Arıyorsunuz
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              En çok ziyaret edilen sayfalarımıza göz atın ve aradığınızı bulun.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPages.map((page, index) => {
              const IconComponent = page.icon
              return (
                <a
                  key={page.title}
                  href={page.href}
                  className="group relative overflow-hidden glass rounded-2xl p-6 shadow-modern hover:shadow-modern-lg transition-all duration-300 border border-white/20 hover:scale-105 hover:-translate-y-1 animate-slide-up"
                  style={{ 
                    background: 'rgba(148, 148, 148, 0.1)',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${page.color} shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {page.title}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {page.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Services Section */}
        <div className="animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8 animate-slide-up" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <Sparkles className="h-5 w-5 text-purple-500 fill-current" />
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Hizmetlerimiz
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6 animate-slide-up">
              Sunduğumuz{" "}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Dijital Hizmetler
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Profesyonel dijital çözümlerimizle işinizi bir üst seviyeye taşıyın.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div
                  key={service.title}
                  className="group relative overflow-hidden glass rounded-2xl p-6 shadow-modern hover:shadow-modern-lg transition-all duration-300 border border-white/20 hover:scale-105 hover:-translate-y-1 animate-slide-up"
                  style={{ 
                    background: 'rgba(148, 148, 148, 0.1)',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} shadow-lg mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center animate-fade-in">
          <div className="glass rounded-3xl p-8 lg:p-12 shadow-modern border border-white/20" style={{ background: 'rgba(148, 148, 148, 0.1)' }}>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Hala Aradığınızı Bulamadınız mı?
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Uzman ekibimizle iletişime geçin, size en uygun çözümü birlikte bulalım.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tr/iletisim"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Mail className="h-5 w-5" />
                <span>İletişime Geç</span>
              </a>
              <a
                href="tel:+905551234567"
                className="inline-flex items-center space-x-2 glass px-8 py-4 rounded-2xl font-semibold text-lg text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: 'rgba(148, 148, 148, 0.1)' }}
              >
                <Phone className="h-5 w-5" />
                <span>Hemen Ara</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


