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

type SupportedLang = 'tr' | 'en' | 'de' | 'fr' | 'ru' | 'ar'

type PageLink = { title: string, description: string, icon: any, href: string, color: string }
type ServiceCard = { title: string, description: string, icon: any, color: string }

const POPULAR_PAGES: Record<SupportedLang, PageLink[]> = {
  tr: [
    { title: "Ana Sayfa", description: "Softiel'in ana sayfasına dönün", icon: Home, href: "/tr", color: "from-blue-500 to-blue-600" },
    { title: "Hakkımızda", description: "Ekibimizi ve değerlerimizi keşfedin", icon: User, href: "/tr/hakkimizda", color: "from-cyan-500 to-cyan-600" },
    { title: "Hizmetlerimiz", description: "Sunduğumuz dijital hizmetleri inceleyin", icon: Briefcase, href: "/tr/hizmetlerimiz", color: "from-purple-500 to-purple-600" },
    { title: "İletişim", description: "Bizimle iletişime geçin", icon: Mail, href: "/tr/iletisim", color: "from-green-500 to-green-600" },
    { title: "Fiyatlandırma", description: "Hizmet fiyatlarımızı görün", icon: Phone, href: "/tr/fiyatlandirma", color: "from-orange-500 to-orange-600" },
    { title: "Blog", description: "Dijital dünyadan haberler ve ipuçları", icon: Globe, href: "/tr/blog", color: "from-pink-500 to-pink-600" },
  ],
  en: [
    { title: "Home", description: "Return to Softiel homepage", icon: Home, href: "/en", color: "from-blue-500 to-blue-600" },
    { title: "About", description: "Discover our team and values", icon: User, href: "/en/about", color: "from-cyan-500 to-cyan-600" },
    { title: "Services", description: "Explore our digital services", icon: Briefcase, href: "/en/services", color: "from-purple-500 to-purple-600" },
    { title: "Contact", description: "Get in touch with us", icon: Mail, href: "/en/contact", color: "from-green-500 to-green-600" },
    { title: "Pricing", description: "See our service pricing", icon: Phone, href: "/en/pricing", color: "from-orange-500 to-orange-600" },
    { title: "Blog", description: "News and tips from the digital world", icon: Globe, href: "/en/blog", color: "from-pink-500 to-pink-600" },
  ],
  de: [
    { title: "Startseite", description: "Zur Softiel-Startseite", icon: Home, href: "/de", color: "from-blue-500 to-blue-600" },
    { title: "Über uns", description: "Unser Team und unsere Werte", icon: User, href: "/de/uber-uns", color: "from-cyan-500 to-cyan-600" },
    { title: "Dienstleistungen", description: "Unsere digitalen Services", icon: Briefcase, href: "/de/dienstleistungen", color: "from-purple-500 to-purple-600" },
    { title: "Kontakt", description: "Kontaktieren Sie uns", icon: Mail, href: "/de/kontakt", color: "from-green-500 to-green-600" },
    { title: "Preise", description: "Unsere Service-Preise", icon: Phone, href: "/de/preise", color: "from-orange-500 to-orange-600" },
    { title: "Blog", description: "News und Tipps aus der digitalen Welt", icon: Globe, href: "/de/blog", color: "from-pink-500 to-pink-600" },
  ],
  fr: [
    { title: "Accueil", description: "Retour à la page d’accueil", icon: Home, href: "/fr", color: "from-blue-500 to-blue-600" },
    { title: "À propos", description: "Découvrez notre équipe et nos valeurs", icon: User, href: "/fr/a-propos", color: "from-cyan-500 to-cyan-600" },
    { title: "Services", description: "Explorez nos services digitaux", icon: Briefcase, href: "/fr/services", color: "from-purple-500 to-purple-600" },
    { title: "Contact", description: "Prenez contact avec nous", icon: Mail, href: "/fr/contact", color: "from-green-500 to-green-600" },
    { title: "Tarifs", description: "Découvrez nos tarifs", icon: Phone, href: "/fr/tarifs", color: "from-orange-500 to-orange-600" },
    { title: "Blog", description: "Actualités et conseils du monde digital", icon: Globe, href: "/fr/blog", color: "from-pink-500 to-pink-600" },
  ],
  ru: [
    { title: "Главная", description: "Вернуться на главную Softiel", icon: Home, href: "/ru", color: "from-blue-500 to-blue-600" },
    { title: "О нас", description: "Узнайте о нашей команде и ценностях", icon: User, href: "/ru/o-nas", color: "from-cyan-500 to-cyan-600" },
    { title: "Услуги", description: "Изучите наши цифровые услуги", icon: Briefcase, href: "/ru/uslugi", color: "from-purple-500 to-purple-600" },
    { title: "Контакт", description: "Свяжитесь с нами", icon: Mail, href: "/ru/kontakt", color: "from-green-500 to-green-600" },
    { title: "Цены", description: "Посмотрите цены на услуги", icon: Phone, href: "/ru/ceny", color: "from-orange-500 to-orange-600" },
    { title: "Блог", description: "Новости и советы из цифрового мира", icon: Globe, href: "/ru/blog", color: "from-pink-500 to-pink-600" },
  ],
  ar: [
    { title: "الصفحة الرئيسية", description: "العودة إلى صفحة Softiel الرئيسية", icon: Home, href: "/ar", color: "from-blue-500 to-blue-600" },
    { title: "من نحن", description: "تعرّف على فريقنا وقيمنا", icon: User, href: "/ar/about", color: "from-cyan-500 to-cyan-600" },
    { title: "الخدمات", description: "استكشف خدماتنا الرقمية", icon: Briefcase, href: "/ar/services", color: "from-purple-500 to-purple-600" },
    { title: "اتصل بنا", description: "تواصل معنا", icon: Mail, href: "/ar/contact", color: "from-green-500 to-green-600" },
    { title: "الأسعار", description: "اطلع على أسعار خدماتنا", icon: Phone, href: "/ar/pricing", color: "from-orange-500 to-orange-600" },
    { title: "المدونة", description: "أخبار ونصائح من العالم الرقمي", icon: Globe, href: "/ar/blog", color: "from-pink-500 to-pink-600" },
  ],
}

const SERVICES: Record<SupportedLang, ServiceCard[]> = {
  tr: [
    { title: "Web Tasarım", description: "Modern ve responsive web siteleri", icon: Palette, color: "from-blue-500 to-cyan-500" },
    { title: "Web Geliştirme", description: "Özel web uygulamaları", icon: Code, color: "from-purple-500 to-pink-500" },
    { title: "Mobil Uygulama", description: "iOS ve Android uygulamaları", icon: Smartphone, color: "from-green-500 to-emerald-500" },
    { title: "SEO Optimizasyonu", description: "Arama motoru optimizasyonu", icon: Search, color: "from-orange-500 to-red-500" },
  ],
  en: [
    { title: "Web Design", description: "Modern and responsive websites", icon: Palette, color: "from-blue-500 to-cyan-500" },
    { title: "Web Development", description: "Custom web applications", icon: Code, color: "from-purple-500 to-pink-500" },
    { title: "Mobile Apps", description: "iOS and Android applications", icon: Smartphone, color: "from-green-500 to-emerald-500" },
    { title: "SEO Optimization", description: "Search engine optimization", icon: Search, color: "from-orange-500 to-red-500" },
  ],
  de: [
    { title: "Webdesign", description: "Moderne und responsive Websites", icon: Palette, color: "from-blue-500 to-cyan-500" },
    { title: "Webentwicklung", description: "Individuelle Webanwendungen", icon: Code, color: "from-purple-500 to-pink-500" },
    { title: "Mobile Apps", description: "iOS- und Android-Anwendungen", icon: Smartphone, color: "from-green-500 to-emerald-500" },
    { title: "SEO-Optimierung", description: "Suchmaschinenoptimierung", icon: Search, color: "from-orange-500 to-red-500" },
  ],
  fr: [
    { title: "Design Web", description: "Sites modernes et responsives", icon: Palette, color: "from-blue-500 to-cyan-500" },
    { title: "Développement Web", description: "Applications web sur mesure", icon: Code, color: "from-purple-500 to-pink-500" },
    { title: "Applications Mobiles", description: "Applications iOS et Android", icon: Smartphone, color: "from-green-500 to-emerald-500" },
    { title: "Optimisation SEO", description: "Référencement naturel", icon: Search, color: "from-orange-500 to-red-500" },
  ],
  ru: [
    { title: "Веб-дизайн", description: "Современные и адаптивные сайты", icon: Palette, color: "from-blue-500 to-cyan-500" },
    { title: "Веб-разработка", description: "Индивидуальные веб-приложения", icon: Code, color: "from-purple-500 to-pink-500" },
    { title: "Мобильные приложения", description: "Приложения iOS и Android", icon: Smartphone, color: "from-green-500 to-emerald-500" },
    { title: "SEO-оптимизация", description: "Поисковая оптимизация", icon: Search, color: "from-orange-500 to-red-500" },
  ],
  ar: [
    { title: "تصميم الويب", description: "مواقع حديثة ومتجاوبة", icon: Palette, color: "from-blue-500 to-cyan-500" },
    { title: "تطوير الويب", description: "تطبيقات ويب مخصصة", icon: Code, color: "from-purple-500 to-pink-500" },
    { title: "تطبيقات الجوال", description: "تطبيقات iOS وAndroid", icon: Smartphone, color: "from-green-500 to-emerald-500" },
    { title: "تحسين SEO", description: "تحسين محركات البحث", icon: Search, color: "from-orange-500 to-red-500" },
  ],
}

const TEXTS = {
  tr: {
    popularBadge: "Popüler Sayfalar",
    popularTitlePart1: "Belki",
    popularTitlePart2: "Bunları Arıyorsunuz",
    popularSubtitle: "En çok ziyaret edilen sayfalarımıza göz atın ve aradığınızı bulun.",
    servicesBadge: "Hizmetlerimiz",
    servicesTitlePart1: "Sunduğumuz",
    servicesTitlePart2: "Dijital Hizmetler",
    contactTitle: "Hala Aradığınızı Bulamadınız mı?",
    contactDesc: "Uzman ekibimizle iletişime geçin, size en uygun çözümü birlikte bulalım.",
    contactBtn: "İletişime Geç",
    contactHref: "/tr/iletisim",
    callNow: "Hemen Ara",
  },
  en: {
    popularBadge: "Popular Pages",
    popularTitlePart1: "Maybe",
    popularTitlePart2: "You’re Looking For These",
    popularSubtitle: "Browse our most visited pages and find what you need.",
    servicesBadge: "Our Services",
    servicesTitlePart1: "Our",
    servicesTitlePart2: "Digital Services",
    contactTitle: "Still can’t find what you need?",
    contactDesc: "Contact our expert team and we’ll find the best solution together.",
    contactBtn: "Contact Us",
    contactHref: "/en/contact",
    callNow: "Call Now",
  },
  de: {
    popularBadge: "Beliebte Seiten",
    popularTitlePart1: "Vielleicht",
    popularTitlePart2: "Suchen Sie das",
    popularSubtitle: "Sehen Sie sich unsere meistbesuchten Seiten an und finden Sie wonach Sie suchen.",
    servicesBadge: "Unsere Leistungen",
    servicesTitlePart1: "Unsere",
    servicesTitlePart2: "Digitalen Services",
    contactTitle: "Nicht gefunden, was Sie brauchen?",
    contactDesc: "Kontaktieren Sie unser Expertenteam – gemeinsam finden wir die beste Lösung.",
    contactBtn: "Kontakt aufnehmen",
    contactHref: "/de/kontakt",
    callNow: "Jetzt anrufen",
  },
  fr: {
    popularBadge: "Pages Populaires",
    popularTitlePart1: "Peut-être",
    popularTitlePart2: "Cherchez-vous ceci",
    popularSubtitle: "Parcourez nos pages les plus visitées et trouvez ce qu’il vous faut.",
    servicesBadge: "Nos Services",
    servicesTitlePart1: "Nos",
    servicesTitlePart2: "Services Digitaux",
    contactTitle: "Vous ne trouvez toujours pas ?",
    contactDesc: "Contactez notre équipe d’experts, nous trouverons ensemble la meilleure solution.",
    contactBtn: "Nous contacter",
    contactHref: "/fr/contact",
    callNow: "Appeler maintenant",
  },
  ru: {
    popularBadge: "Популярные страницы",
    popularTitlePart1: "Возможно",
    popularTitlePart2: "Вы Ищете Это",
    popularSubtitle: "Просмотрите самые посещаемые страницы и найдите нужное.",
    servicesBadge: "Наши услуги",
    servicesTitlePart1: "Наши",
    servicesTitlePart2: "Цифровые услуги",
    contactTitle: "Все еще не нашли нужное?",
    contactDesc: "Свяжитесь с нашей командой экспертов, вместе мы найдём лучшее решение.",
    contactBtn: "Связаться",
    contactHref: "/ru/kontakt",
    callNow: "Позвонить",
  },
  ar: {
    popularBadge: "صفحات شائعة",
    popularTitlePart1: "ربما",
    popularTitlePart2: "تبحث عن هذه",
    popularSubtitle: "تصفّح أكثر صفحاتنا زيارة واعثر على ما تحتاجه.",
    servicesBadge: "خدماتنا",
    servicesTitlePart1: "خدماتنا",
    servicesTitlePart2: "الرقمية",
    contactTitle: "ما زلت لا تجد ما تريد؟",
    contactDesc: "تواصل مع فريق خبرائنا وسنجد الحل الأنسب معًا.",
    contactBtn: "تواصل معنا",
    contactHref: "/ar/contact",
    callNow: "اتصل الآن",
  },
} as const

export function NotFoundContent({ lang }: { lang: SupportedLang }) {
  const popularPages = POPULAR_PAGES[lang]
  const services = SERVICES[lang]
  const t = TEXTS[lang]
  const isRTL = lang === 'ar'

  return (
    <section className="relative py-8 lg:py-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Popular Pages */}
        <div className="mb-20 animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8 animate-slide-up" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <Star className="h-5 w-5 text-cyan-500 fill-current" />
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{t.popularBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6 animate-slide-up" dir={isRTL ? 'rtl' : undefined}>
              {t.popularTitlePart1}{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">{t.popularTitlePart2}</span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed animate-slide-up" dir={isRTL ? 'rtl' : undefined}>
              {t.popularSubtitle}
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
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{t.servicesBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-6 animate-slide-up" dir={isRTL ? 'rtl' : undefined}>
              {t.servicesTitlePart1}{" "}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">{t.servicesTitlePart2}</span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed animate-slide-up" dir={isRTL ? 'rtl' : undefined}>
              {/* Basit bir ortak alt başlık; yakında i18n dosyalarına alınabilir */}
              {lang === 'tr' && 'Profesyonel dijital çözümlerimizle işinizi bir üst seviyeye taşıyın.'}
              {lang === 'en' && 'Take your business to the next level with our professional digital solutions.'}
              {lang === 'de' && 'Bringen Sie Ihr Unternehmen mit unseren digitalen Lösungen auf das nächste Level.'}
              {lang === 'fr' && 'Faites passer votre activité au niveau supérieur avec nos solutions digitales.'}
              {lang === 'ru' && 'Поднимите ваш бизнес на новый уровень с нашими цифровыми решениями.'}
              {lang === 'ar' && 'ارتقِ بعملك إلى المستوى التالي مع حلولنا الرقمية الاحترافية.'}
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
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-4" dir={isRTL ? 'rtl' : undefined}>{t.contactTitle}</h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto" dir={isRTL ? 'rtl' : undefined}>{t.contactDesc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={t.contactHref}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-600 hover:via-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-modern hover:shadow-modern-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Mail className="h-5 w-5" />
                <span>{t.contactBtn}</span>
              </a>
              <a
                href="tel:+905551234567"
                className="inline-flex items-center space-x-2 glass px-8 py-4 rounded-2xl font-semibold text-lg text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: 'rgba(148, 148, 148, 0.1)' }}
              >
                <Phone className="h-5 w-5" />
                <span>{t.callNow}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
