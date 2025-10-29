import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Разработка веб‑приложений - Softiel",
  description: "Современные веб‑приложения на React, Next.js и Node.js. Профессиональная веб‑разработка.",
}

export const dynamic = 'force-static'

export default function WebDevRuPage() {
  const serviceData = {
    title: "Разработка веб‑приложений",
    subtitle: "Решения под ваши задачи",
    description: "Мы создаём кастомные веб‑приложения на современных технологиях. Удобные, быстрые и безопасные решения для бизнеса.",
    detailDescription: "Веб‑приложения — важный инструмент для бизнеса. С правильным подходом и технологиями вы повышаете удовлетворённость клиентов и эффективность процессов.",
    icon: "💻",
    serviceType: "web-gelistirme",
    labels: {
      detailsBadge: "Детали услуги",
      whyPrefix: "Почему",
      processBadge: "Процесс",
      processHeadingBefore: "Как",
      processHeadingGradient: "мы работаем",
      processSubtitle: "Реализуем проект поэтапно с постоянными тестами и обратной связью.",
      timelineAverage: "Среднее время",
      timelineSupport: "Поддержка",
      timelineSatisfaction: "Удовлетворённость",
      pricingBadge: "Цены",
      pricingHeadingBefore: "Выгодные",
      pricingHeadingGradient: "цены",
      pricingSubtitle: "Выберите подходящий пакет. Также делаем индивидуальные предложения.",
      popularBadge: "Самый популярный",
      ctaGetOffer: "Получить предложение",
      ctaOfferMessageTemplate: "Здравствуйте! Хотел(а) бы получить информацию о тарифе {planName} для услуги {serviceTitle}.",
      domainNotice: "Домены + SSL + хостинг не включены в стоимость",
      addOnsBadge: "Дополнительные услуги",
      addOnsHeadingBefore: "Дополнительные",
      addOnsHeadingGradient: "услуги",
      addOnsSubtitle: "Улучшите проект с помощью опций. Мы предлагаем гибкие решения.",
      ctaGetDetails: "Подробнее",
      ctaAddOnMessageTemplate: "Здравствуйте! Хотел(а) бы получить информацию о доп. опции {addOnName} для услуги {serviceTitle}.",
      featuresWebDevelopment: [
        { title: "Кастомное решение", description: "Точно под ваши требования" },
        { title: "Интеграции", description: "ERP, CRM, платежи, API" },
        { title: "Масштабируемость", description: "Готовность к росту" },
        { title: "Безопасность и скорость", description: "Современные фреймворки, высокая производительность" },
        { title: "Интеграция БД", description: "Полная совместимость со всеми системами баз данных" },
        { title: "API‑First подход", description: "Микросервисная архитектура и REST API для перспективной разработки" },
      ],
    },
    features: [
      { title: "Кастомное решение", description: "Точно под ваши требования", icon: "🎯" },
      { title: "Интеграции", description: "ERP, CRM, платежи, API", icon: "🔗" },
      { title: "Масштабируемость", description: "Готовность к росту", icon: "📈" },
      { title: "Безопасность и скорость", description: "Современные фреймворки, высокая производительность", icon: "⚡" },
    ],
    process: [
      { step: "1", title: "Анализ требований", description: "Анализируем бизнес‑потребности и формируем объём работ." },
      { step: "2", title: "Выбор стека", description: "Подбираем оптимальные технологии и проектируем архитектуру." },
      { step: "3", title: "Agile‑разработка", description: "Итеративная разработка с постоянными тестами и обратной связью." },
      { step: "4", title: "Деплой и поддержка", description: "Публикация в прод и долгосрочная поддержка." },
    ],
    pricing: [
      { name: "Starter", price: "$1,500", period: "начиная с", features: [
        "Простые CRUD‑приложения",
        "Аутентификация и роли",
        "Адаптивный интерфейс",
        "Базовые отчёты (таблицы, графики)",
        "1 интеграция (например, e‑mail или SMS API)",
        "1 раунд правок",
      ], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
      { name: "Pro", price: "$2,750", period: "начиная с", features: [
        "Расширенная админка и модули",
        "Мультироли и права доступа",
        "Продвинутые отчёты (графики, фильтры, экспорт)",
        "2–3 интеграции (ERP, CRM, платежи)",
        "Усиленная безопасность (2FA, логирование)",
        "2 раунда правок",
      ], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
      { name: "Enterprise", price: "$4,500", period: "начиная с", features: [
        "Крупные корпоративные решения",
        "Мультипользовательская поддержка",
        "Расширенный контроль доступа (RBAC, LDAP, SSO)",
        "Микросервисы / API‑first",
        "Масштабирование (балансировка, кеш)",
        "Интеграция CI/CD",
        "SLA + 3–6 месяцев поддержки",
        "3 раунда правок",
      ], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
    ],
    addOnServices: [
      { name: "Доп. модуль", description: "Модули под ваши процессы", price: "$300" },
      { name: "Progressive Web App", description: "Оффлайн‑приложение для мобильных", price: "$400" },
      { name: "Analytics / BI", description: "Интеграция BI", price: "$300" },
      { name: "Расширенная безопасность", description: "Пентест и логирование", price: "$300" },
      { name: "CI/CD‑настройка", description: "Pipeline GitHub Actions", price: "$200" },
      { name: "Бэкап / Мониторинг", description: "Автоматические бэкапы и мониторинг", price: "$150/месяц" },
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black dark:from-slate-800 dark:via-slate-900 dark:via-slate-950 dark:via-black dark:to-black">
      <Header />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-200 dark:bg-cyan-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-200 dark:bg-sky-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <ServiceHero data={serviceData} />
        <ServiceDetails data={serviceData} />
        <ServiceProcess data={serviceData} duration="2 - 4 недели" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} serviceType="web-gelistirme" />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


