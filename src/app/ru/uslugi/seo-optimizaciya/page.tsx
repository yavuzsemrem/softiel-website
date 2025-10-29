import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "SEO Оптимизация - Softiel",
  description: "Оптимизация для поисковых систем, высокие позиции в Google и увеличение органического трафика.",
}

export const dynamic = 'force-static'

export default function SEOOptimizaciyaPage() {
  const serviceData = {
    title: "SEO\nОптимизация",
    subtitle: "Выше в Google",
    description: "Мы оптимизируем ваш сайт для высоких позиций в поисковых системах. Обеспечиваем рост органического трафика и привлечение клиентов.",
    detailDescription: "SEO больше не только плотность ключевых слов, это стратегия, ориентированная на пользовательский опыт. С правильным подходом мы соответствуем алгоритмам Google и потребностям клиентов.",
    icon: "🔍",
    serviceType: "seo",
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
      featuresSEO: [
        { title: "Исследование Ключевых Слов", description: "Анализ ключевых слов и стратегия, ориентированная на целевую аудиторию" },
        { title: "Технический SEO", description: "Скорость сайта, мобильная совместимость и оптимизация индексации" },
        { title: "Оптимизация Контента", description: "Создание SEO-дружественного контента и оптимизация meta" },
        { title: "Analytics & Отслеживание", description: "Интеграция Google Analytics и Search Console" },
        { title: "Стратегия Backlinks", description: "Создание авторитета и развитие органических профилей ссылок" },
        { title: "Отчёт о Производительности", description: "Ежемесячные детальные отчёты о производительности SEO" },
      ],
    },
    features: [
      { title: "Рост позиций в Google", description: "Обеспечиваем видимость на первой странице", icon: "🚀" },
      { title: "Прирост органического трафика", description: "Увеличение качественных посетителей", icon: "📈" },
      { title: "Анализ конкурентов", description: "Выделяемся на рынке", icon: "🎯" },
      { title: "Результаты с фокусом на ROI", description: "Гарантированная окупаемость инвестиций", icon: "💰" },
    ],
    process: [
      { step: "1", title: "SEO-аудит", description: "Анализируем текущую ситуацию и определяем области улучшения." },
      { step: "2", title: "Разработка стратегии", description: "Создаём стратегию ключевых слов и план контента." },
      { step: "3", title: "Оптимизация", description: "Применяем технические и контентные оптимизации." },
      { step: "4", title: "Отслеживание & Отчётность", description: "Отслеживаем показатели и предоставляем регулярные отчёты." },
    ],
    pricing: [
      {
        name: "Starter (Технический SEO)",
        price: "$300",
        period: "месяц",
        features: [
          "Аудит",
          "Настройка Analytics/Console",
          "Оптимизация meta/URL",
          "Карта сайта",
          "Отчёты Lighthouse",
          "Ежемесячный отчёт",
          "1 правка",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (SEO Роста)",
        price: "$500",
        period: "месяц",
        features: [
          "Starter + исследование ключевых слов",
          "Оптимизация контента",
          "План блога",
          "Построение ссылок",
          "SEO изображений",
          "Детальный отчёт",
          "2 правки",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (Агрессивный SEO)",
        price: "$750",
        period: "месяц",
        features: [
          "Pro + больше ключевых слов/контента",
          "Стратегия backlinks",
          "Анализ конкурентов",
          "Локальный SEO",
          "Управление 360°",
          "Ежемесячная встреча",
          "3 правки",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Доп. ключевые слова", description: "На каждые 5 слов", price: "$20" },
      { name: "Доп. написание контента", description: "700-1000 слов, за статью", price: "$50" },
      { name: "Пакеты backlinks", description: "5-10 качественных ссылок", price: "$100" },
      { name: "SEO-изображение", description: "За штуку", price: "$25" },
      { name: "Отчёт", description: "Ежемесячно", price: "$100/месяц" },
      { name: "Отчёт", description: "Ежеквартально", price: "$200/квартал" },
      { name: "SEO Landing", description: "За страницу", price: "$75" },
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
