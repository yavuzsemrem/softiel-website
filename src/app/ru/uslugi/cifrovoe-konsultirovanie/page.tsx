import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Цифровое Консультирование - Softiel",
  description: "Стратегия, выбор технологий и измеримая реализация вашей цифровой трансформации.",
}

export const dynamic = 'force-static'

export default function CifrovoeKonsultirovaniePage() {
  const pricing = [
    { name: "Starter", price: "$300", period: "от", features: [
      "Разовый цифровой аудит (сайт, соцсети, SEO, реклама)",
      "SWOT-анализ",
      "Ключевые рекомендации",
      "Простой план (3–6 месяцев)",
      "1 правка"
    ], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
    { name: "Pro", price: "$500", period: "в месяц", features: [
      "Всё из Starter +",
      "2 встречи в месяц (Zoom/Meet)",
      "Постоянная guidance по рекламе, SEO, соцсетям",
      "KPIs и трекинг",
      "Анализ конкурентов (ежеквартальный отчет)",
      "2 правки"
    ], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
    { name: "Enterprise", price: "$750", period: "в месяц", features: [
      "Всё из Pro +",
      "Еженедельные/ежемесячные сессии",
      "Дорожная карта трансформации (1 год)",
      "Выбор технологий (ERP, CRM, e‑commerce)",
      "Обучение команды",
      "Отчётность и обновления стратегии",
      "3 правки + SLA 6 месяцев"
    ], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
  ]

  const serviceData = {
    title: "Цифровое\nКонсультирование",
    subtitle: "Проводник цифровой трансформации",
    description: "Консалтинг по стратегии и выбору технологий.",
    detailDescription: "Анализируем текущее состояние и выстраиваем путь к целям.",
    icon: "💡",
    serviceType: "danismanlik",
    labels: {
      detailsBadge: "Детали Услуги",
      whyPrefix: "Почему",
      processBadge: "Процесс",
      processHeadingBefore: "Как",
      processHeadingGradient: "Мы Работаем",
      processSubtitle: "Пошаговая реализация с измеримыми KPI.",
      timelineAverage: "Среднее Время",
      timelineSupport: "Поддержка",
      timelineSatisfaction: "Удовлетворенность",
      pricingBadge: "Цены",
      pricingHeadingBefore: "Справедливые",
      pricingHeadingGradient: "Цены",
      pricingSubtitle: "Выберите подходящий план.",
      popularBadge: "Самый Популярный",
      ctaGetOffer: "Получить Предложение",
      ctaOfferMessageTemplate: "Здравствуйте! Нужна информация о тарифе {planName} для {serviceTitle}.",
      domainNotice: undefined,
      addOnsBadge: "Доп. Услуги",
      addOnsHeadingBefore: "Доп.",
      addOnsHeadingGradient: "Услуги",
      addOnsSubtitle: "Усилите результат опциями.",
      ctaGetDetails: "Подробнее",
      ctaAddOnMessageTemplate: "Здравствуйте! Информация о доп. услуге {addOnName} для {serviceTitle}.",
      featuresConsulting: [
        { title: "Разработка Стратегии", description: "Дорожная карта" },
        { title: "Выбор Технологий", description: "Инструменты" },
        { title: "Оптимизация Процессов", description: "Эффективность" },
        { title: "Обучение & Менторство", description: "Команда" },
        { title: "Аналитика & Отчёты", description: "KPI & Insights" },
        { title: "Анализ Конкурентов", description: "Рынок" },
      ],
    },
    features: [
      { title: "Разработка Стратегии", description: "План", icon: "🎯" },
      { title: "Выбор Технологий", description: "Платформы", icon: "🔧" },
      { title: "Оптимизация Процессов", description: "Эффект.", icon: "📈" },
      { title: "Обучение & Менторство", description: "Команда", icon: "👨‍🏫" },
    ],
    process: [
      { step: "1", title: "Анализ Текущего", description: "Анализ цифрового состояния." },
      { step: "2", title: "Постановка Целей", description: "Определяем измеримые цели." },
      { step: "3", title: "Дорожная Карта", description: "План действий." },
      { step: "4", title: "Сопровождение", description: "Поддержка внедрения." },
    ],
    addOnServices: [
      { name: "Доп. Встреча", description: "Вне месячного пакета", price: "$50" },
      { name: "Учебный Модуль", description: "SEO/social/digital", price: "$150" },
      { name: "Выбор Технологий", description: "ERP/CRM/e‑commerce", price: "$200" },
      { name: "Анализ Конкурентов", description: "Детальный отчёт", price: "$200" },
    ],
    pricing: pricing,
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
        <ServiceProcess data={serviceData} duration="1 - 2 Недели" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


