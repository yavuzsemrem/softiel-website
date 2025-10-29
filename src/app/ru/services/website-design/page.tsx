import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

// Static generation için metadata
export const metadata = {
  title: "Веб-дизайн - Softiel",
  description: "Современный и адаптивный веб-дизайн. Профессиональный вид, быстрая загрузка и SEO-совместимые услуги веб-дизайна.",
}

// Static generation - sayfa önceden oluşturulsun
export const dynamic = 'force-static'

export default function WebsiteDesignPage() {
  const serviceData = {
    title: "Веб дизайн",
    subtitle: "Современные и Влияющие Веб-дизайны",
    description: "Выделитесь в цифровом мире с профессиональными веб-сайтами. Обеспечьте лучший опыт с адаптивным дизайном, быстрой загрузкой и SEO-совместимой структурой.",
    detailDescription: "Веб-сайт больше не просто вопрос обмена информацией, он стал цифровым лицом вашего бренда. Правильный дизайн и пользовательский опыт влияют на ваших клиентов и повышают доверие к вашему бизнесу.",
    serviceType: "web-tasarimi",
    labels: {
      detailsBadge: "Детали услуги",
      whyPrefix: "Почему",
      processBadge: "Процесс",
      processHeadingBefore: "Как",
      processHeadingGradient: "мы работаем",
      processSubtitle: "Мы реализуем ваш проект шаг за шагом. На каждом этапе остаёмся на связи, чтобы добиться лучшего результата.",
      timelineAverage: "Среднее время",
      timelineSupport: "Поддержка",
      timelineSatisfaction: "Удовлетворённость",
      pricingBadge: "Цены",
      pricingHeadingBefore: "Выгодные",
      pricingHeadingGradient: "цены",
      pricingSubtitle: "Реализуйте проект с пакетами на любой бюджет. Для особых потребностей мы предлагаем индивидуальную стоимость.",
      popularBadge: "Самый популярный",
      ctaGetOffer: "Получить предложение",
      ctaOfferMessageTemplate: "Здравствуйте! Хотел(а) бы получить информацию о тарифе {planName} для услуги {serviceTitle}.",
      domainNotice: "Домены + SSL + хостинг не включены в стоимость",
      addOnsBadge: "Дополнительные услуги",
      addOnsHeadingBefore: "Дополнительные",
      addOnsHeadingGradient: "услуги",
      addOnsSubtitle: "Улучшите проект с помощью дополнительных услуг. Мы предлагаем гибкие решения под ваши задачи.",
      ctaGetDetails: "Подробнее",
      ctaAddOnMessageTemplate: "Здравствуйте! Хотел(а) бы получить информацию о доп. опции {addOnName} для услуги {serviceTitle}.",
      featuresWebDesign: [
        { title: "Современный дизайн", description: "Трендовые и эстетически выверенные веб‑дизайны" },
        { title: "Адаптивная сетка", description: "Идеальная адаптация на всех устройствах" },
        { title: "Быстрая загрузка", description: "Высокая производительность благодаря оптимизированному коду и изображениям" },
        { title: "SEO‑дружественный", description: "Чистый код, оптимизированный для поисковых систем" },
        { title: "Безопасность", description: "Надёжные меры и защита с SSL" },
        { title: "Мобильная оптимизация", description: "Оптимизация и дизайн, ориентированные на мобильные устройства" },
      ],
    },
    features: [
      {
        title: "Запуск за 7-14 Дней",
        description: "Гарантия быстрой доставки"
      },
      {
        title: "Адаптивный & Быстрый",
        description: "Дизайн, ориентированный на производительность"
      },
      {
        title: "SEO-инфраструктура Готова",
        description: "Оптимизировано для поисковых систем"
      },
      {
        title: "Права на Ревизию",
        description: "Гарантия удовлетворенности клиентов"
      }
    ],
    process: [
      {
        step: "1",
        title: "Анализ & Планирование",
        description: "Мы анализируем ваши потребности, определяем целевую аудиторию и разрабатываем стратегию."
      },
      {
        step: "2",
        title: "Дизайн & Прототип",
        description: "Мы создаем wireframes и mockups с современными принципами дизайна."
      },
      {
        step: "3",
        title: "Разработка",
        description: "Мы программируем адаптивный и быстро загружающийся веб-сайт."
      },
      {
        step: "4",
        title: "Тестирование & Запуск",
        description: "Мы проводим комплексные тесты и запускаем сайт."
      }
    ],
    pricing: [
      {
        name: "Базовый",
        price: "$1,000",
        period: "начиная с",
        features: [
          "5-7 страниц (Главная, О нас, Услуги, Контакты и т.д.)",
          "Адаптивный (дружелюбный к мобильным)",
          "Базовое SEO (мета, карта сайта, robots.txt)",
          "1 контактная форма + интеграция Google Maps",
          "1 раунд ревизии",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Про",
        price: "$2,500",
        period: "начиная с",
        features: [
          "8-12 страниц",
          "Пользовательский дизайн главной страницы",
          "Инфраструктура блога",
          "2 раунда ревизии",
          "Готовность к многоязычности (опционально)",
          "Расширенная оптимизация скорости (WebP, lazy load, предварительная загрузка шрифтов)",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Корпоративный",
        price: "$4,000",
        period: "начиная с",
        features: [
          "12+ страниц",
          "Многоязычная поддержка",
          "Система управления контентом (WordPress, Headless CMS и т.д.)",
          "Пользовательские интеграции (CRM, оплата, API)",
          "3 раунда ревизии",
          "Стандарты доступности (соответствие WCAG)",
          "3 месяца бесплатного обслуживания и поддержки",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      {
        name: "Дополнительная Страница",
        description: "Дизайн и разработка доп. страницы",
        price: "$100"
      },
      {
        name: "Многоязычная Поддержка",
        description: "Многоязычная поддержка сайта",
        price: "$150"
      },
      {
        name: "Написание Контента",
        description: "Профессиональное написание текстов",
        price: "$50"
      },
      {
        name: "Логотип",
        description: "Дизайн или обновление логотипа",
        price: "$100"
      },
      {
        name: "Оптимизация Скорости",
        description: "Оптимизация скорости сайта",
        price: "$200"
      },
      {
        name: "Обслуживание (мес.)",
        description: "Ежемесячное обслуживание и обновления",
        price: "$50/месяц"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black dark:from-slate-800 dark:via-slate-900 dark:via-slate-950 dark:via-black dark:to-black">
      <Header />
      <main className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-200 dark:bg-cyan-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-200 dark:bg-sky-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <ServiceHero data={serviceData} />
        <ServiceDetails data={serviceData} />
        <ServiceProcess data={serviceData} duration="7 - 14 Дней" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
