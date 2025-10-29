import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Решения WordPress - Softiel",
  description: "Профессиональная установка WordPress, разработка тем и решения CMS. Услуги WordPress для e-commerce, корпоративных сайтов и кастомных проектов.",
}

export const dynamic = 'force-static'

export default function ResheniyaWordPressPage() {
  const serviceData = {
    title: "Решения\nWordPress",
    subtitle: "Легко Управляемые Сайты",
    description: "Создаём профессиональные сайты на WordPress и других CMS-платформах. Предлагаем простое управление контентом, безопасные и быстрые решения.",
    detailDescription: "Благодаря гибкой структуре WordPress мы можем быстро и экономично создавать сайты любого типа, от небольших блогов до крупных корпоративных e-commerce-платформ. Предлагаем клиентам неограниченную свободу в управлении контентом.",
    icon: "🔧",
    serviceType: "wordpress",
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
      featuresWordPress: [
        { title: "Простое Управление Контентом", description: "Лёгкое добавление и редактирование контента с редактором перетаскивания" },
        { title: "Богатая Экосистема Плагинов", description: "Неограниченная настройка с более чем 50 000 бесплатных и платных плагинов" },
        { title: "Активные Меры Безопасности", description: "Защита с Wordfence, 2FA и плагинами безопасности" },
        { title: "SEO-готовая Инфраструктура", description: "Оптимизация для поисковых систем с Yoast SEO и RankMath" },
        { title: "Многоязычная Поддержка", description: "Поддержка многоязычных сайтов с WPML и Polylang" },
        { title: "Оптимизация Кэша и Скорости", description: "Высокая производительность с LiteSpeed Cache и интеграцией CDN" },
      ],
    },
    features: [
      { title: "Простое Управление", description: "Редактор перетаскивания", icon: "🎛️" },
      { title: "Интеграция Плагинов", description: "Кастомные плагины по необходимости", icon: "🔌" },
      { title: "Безопасность", description: "Активные меры безопасности", icon: "🔒" },
      { title: "SEO Готов", description: "Оптимизация SEO включена", icon: "🔍" },
    ],
    process: [
      { step: "1", title: "Анализ Требований", description: "Анализируем требования проекта и выбираем наиболее подходящую CMS." },
      { step: "2", title: "Выбор Темы & Плагинов", description: "Определяем темы и плагины, соответствующие потребностям." },
      { step: "3", title: "Настройка", description: "Настраиваем дизайны и функции." },
      { step: "4", title: "Обучение & Передача", description: "Проводим обучение использованию и передаём проект." },
    ],
    pricing: [
      {
        name: "Starter (Корпоративный Сайт)",
        price: "$750",
        period: "начиная с",
        features: [
          "Установка WordPress + адаптация готовой темы",
          "5–7 страниц (О нас, Услуги, Контакты и т.д.)",
          "Адаптивный (совместим с мобильными)",
          "Базовые SEO-плагины (Yoast / RankMath)",
          "1 раунд правок",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (E-Commerce / WooCommerce)",
        price: "$2,000",
        period: "начиная с",
        features: [
          "Всё из Starter +",
          "Установка WooCommerce",
          "Загрузка продуктов до 10 продуктов (больше - клиент или доп. услуга)",
          "Базовая интеграция платёжной системы (PayPal, Iyzico и т.д.)",
          "Интеграция модулей доставки",
          "2 раунда правок",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (Корпоративный CMS / Платформа Контента)",
        price: "$3,500",
        period: "начиная с",
        features: [
          "Всё из Pro +",
          "Разработка кастомной темы или child theme",
          "Многоязычная поддержка (Polylang, WPML)",
          "Расширенная безопасность (Wordfence / 2FA)",
          "Расширенный кэш + оптимизация скорости (LiteSpeed, CDN)",
          "Роли пользователей для контент-команд",
          "3 раунда правок",
          "Поддержка обслуживания 3 месяца",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Доп. загрузка продуктов", description: "Загрузка продуктов", price: "$20" },
      { name: "Многоязычная настройка", description: "Пакет настройки многоязычности", price: "$150" },
      { name: "Кастомный плагин", description: "Пакет разработки кастомного плагина", price: "$300" },
      { name: "Оптимизация SEO", description: "Пакет оптимизации SEO", price: "$150" },
      { name: "Ускорение сайта", description: "Пакет ускорения сайта", price: "$75" },
      { name: "Обслуживание", description: "Обслуживание и обновление", price: "$50/мес." },
      { name: "Логотип / обновление", description: "Логотип", price: "$100" },
      { name: "Доп. страница", description: "Доп. страница", price: "$100" },
      { name: "Написание контента", description: "Написание текстов", price: "$50" },
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
        <ServiceProcess data={serviceData} duration="7 - 14 дней" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
