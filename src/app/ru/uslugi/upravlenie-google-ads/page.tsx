import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Управление Google Ads - Softiel",
  description: "Эффективное управление рекламными кампаниями на Google Ads и Meta Ads. Высокие показатели конверсии при низких затратах.",
}

export const dynamic = 'force-static'

export default function UpravlenieGoogleAdsPage() {
  const serviceData = {
    title: "Управление\nGoogle Ads",
    subtitle: "Целевые Рекламные Кампании",
    description: "Управляем эффективными рекламными кампаниями на Google Ads и Meta Ads. Помогаем достичь высоких показателей конверсии при низких затратах.",
    detailDescription: "Интернет-реклама теперь жизненно важна для бизнеса. С правильной стратегией платформы и управлением кампаниями вы можете напрямую достичь клиентов и увеличить продажи.",
    icon: "📢",
    serviceType: "google-ads",
    labels: {
      detailsBadge: "Детали услуги",
      whyPrefix: "Почему",
      processBadge: "Процесс",
      processHeadingBefore: "Как",
      processHeadingGradient: "мы работаем",
      processSubtitle: "Реализуем проект поэтапно. На каждом этапе остаёмся на связи, чтобы добиться лучшего результата.",
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
      featuresGoogleAds: [
        { title: "Целевая Реклама", description: "Достигайте нужной аудитории с точным таргетингом" },
        { title: "Стратегии с Фокусом на ROI", description: "Высокая отдача от каждой запущенной кампании" },
        { title: "Оптимизация в Реальном Времени", description: "Отслеживание и улучшение производительности 7/24" },
        { title: "Управление Мульти-Платформой", description: "Google Ads, Meta Ads и LinkedIn под одной крышей" },
        { title: "Быстрая Настройка Кампании", description: "Активные кампании в течение 24 часов" },
        { title: "Детальный Анализ Производительности", description: "Результаты кампаний с ежемесячными отчётами" },
      ],
    },
    features: [
      { title: "Целевые Кампании", description: "Достигайте правильных клиентов", icon: "🎯" },
      { title: "Гарантия Роста ROI", description: "Гарантированная окупаемость ваших инвестиций", icon: "💰" },
      { title: "Оптимизация в Реальном Времени", description: "Отслеживание кампаний 7/24", icon: "⚡" },
      { title: "Профессиональный Дизайн", description: "Включая рекламные визуалы", icon: "🎨" },
    ],
    process: [
      { step: "1", title: "Анализ Целевой Аудитории", description: "Анализируем вашу целевую аудиторию и определяем наиболее эффективные каналы." },
      { step: "2", title: "Дизайн Кампании", description: "Создаём рекламные тексты, визуалы и стратегию таргетинга." },
      { step: "3", title: "Оптимизация", description: "Постоянно оптимизируем кампании и улучшаем производительность." },
      { step: "4", title: "Отчётность", description: "Отслеживаем результаты с детальными отчётами о производительности." },
    ],
    pricing: [
      {
        name: "Starter (Базовое Управление)",
        price: "$300",
        period: "месяц",
        features: [
          "Google Ads или Meta Ads (один канал)",
          "Настройка кампании (Поиск/Показ/Instagram-Facebook)",
          "Настройки таргетинга (место, демография, ключевые слова)",
          "Базовые рекламные тексты + визуалы (если предоставлены клиентом)",
          "1 ежемесячный отчёт (базовая производительность)",
          "1 правка / изменение",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (Оптимизированное Управление)",
        price: "$500",
        period: "месяц",
        features: [
          "Google Ads + Meta Ads (2 канала, управляемые вместе)",
          "2-3 кампании (поиск + ремаркетинг + социальные сети)",
          "Рекламные тексты + визуальный дизайн (от нас)",
          "A/B тесты (заголовки, CTA)",
          "Еженедельная оптимизация (бюджет, таргетинг)",
          "Ежемесячный детальный отчёт (CTR, конверсия, анализ затрат)",
          "2 правки / изменения",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (Стратегическое Управление)",
        price: "$750",
        period: "месяц",
        features: [
          "Мультиканальное управление (Google Ads + Meta + LinkedIn)",
          "5+ кампаний (поиск, показ, ремаркетинг, видео, лид-объявления)",
          "Профессиональные рекламные дизайны (включая визуалы + видео)",
          "Планирование воронки конверсии (включая оптимизацию landing page)",
          "Еженедельная отчётность + ежемесячная стратегическая встреча",
          "Ежемесячные A/B тесты и непрерывная оптимизация",
          "Подходит для проектов с рекламным бюджетом выше $2,000",
          "3 правки / изменения",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Доп. канал", description: "LinkedIn/TikTok/Twitter – канал", price: "$100/месяц" },
      { name: "Проф. визуальный дизайн", description: "Баннер, пост в соцсетях – за единицу", price: "$50" },
      { name: "Видео-реклама", description: "YouTube/Reels/TikTok – видео", price: "$75" },
      { name: "Дизайн landing page", description: "Фокус на конверсию – за страницу", price: "$300" },
      { name: "Фуннел-консалтинг", description: "Интеграция CRM, трекинг лидов", price: "$150" },
      { name: "Отчёт конкурентов", description: "Разово", price: "$75" },
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
        <ServiceProcess data={serviceData} duration="1 - 5 дней" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
