import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Разработка мобильных приложений - Softiel",
  description: "Разработка мобильных приложений для iOS и Android. Нативные и кроссплатформенные решения.",
}

export const dynamic = 'force-static'

export default function RazrabotkaMobilnyhPrilozhenijPage() {
  const serviceData = {
    title: "Разработка\nмобильных приложений",
    subtitle: "Приложения iOS & Android",
    description: "Разрабатываем приложения для iOS и Android из одной кодовой базы. Предлагаем решения от MVP до Enterprise.",
    detailDescription: "Мобильные приложения критичны для бизнеса. Пока пользователи проводят 90% времени на мобильных устройствах, правильная мобильная стратегия обеспечивает круглосуточный доступ к клиентам и даёт конкурентное преимущество.",
    icon: "📱",
    serviceType: "mobil-uygulama",
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
      featuresMobileApp: [
        { title: "Кроссплатформенность", description: "Приложения iOS и Android из одной кодовой базы" },
        { title: "Быстрая разработка", description: "Быстрая разработка приложений с современными кроссплатформенными технологиями" },
        { title: "Совместимость со Store", description: "Приложения, соответствующие стандартам App Store и Google Play" },
        { title: "Нативная производительность", description: "Высокопроизводительный опыт мобильного приложения" },
        { title: "Интеграция Backend", description: "API-база данных и pusher-сервисы" },
        { title: "Push-уведомления", description: "Уведомления в реальном времени и функции вовлечения" },
      ],
    },
    features: [
      { title: "Быстрый MVP", description: "Запуск за 3-6 недель", icon: "⚡" },
      { title: "Единая кодовая база", description: "iOS + Android одновременно", icon: "🔄" },
      { title: "Настраиваемый", description: "Модули под ваш бизнес", icon: "🎯" },
      { title: "Долгосрочная поддержка", description: "Гарантия обслуживания со SLA", icon: "🛡️" },
    ],
    process: [
      { step: "1", title: "Анализ требований", description: "Анализируем идеи и определяем решение от MVP до Enterprise." },
      { step: "2", title: "Прототип & Дизайн", description: "Создаём UX-ориентированный дизайн и интерактивные прототипы." },
      { step: "3", title: "Кросс-платформа", description: "Разрабатываем iOS и Android приложения одновременно из одной кодовой базы." },
      { step: "4", title: "Тестирование & Публикация", description: "Проводим комплексные тесты и публикуем в App Store и Google Play." },
    ],
    pricing: [
      {
        name: "Starter (MVP)",
        price: "$2,000",
        period: "начиная с",
        features: [
          "iOS + Android (Flutter/React Native)",
          "Вход пользователя (email/пароль)",
          "Страница профиля + базовый CRUD",
          "Простые push-уведомления",
          "Backend: Firebase/REST API",
          "1 раунд правок",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro",
        price: "$3,500",
        period: "начиная с",
        features: [
          "Все функции Starter",
          "Расширенное управление пользователями (роли, права)",
          "Интеграция платежей (Iyzico, Stripe)",
          "Функции карты/геолокации",
          "Уведомления в реальном времени",
          "Базовая админ-панель",
          "2 раунда правок",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise",
        price: "$5,000",
        period: "начиная с",
        features: [
          "Все функции Pro",
          "Многоязычная поддержка",
          "Расширенная безопасность (2FA, шифрование)",
          "Чат/socket в реальном времени",
          "Backend на микросервисах",
          "Интеграция CI/CD",
          "SLA + 6 месяцев поддержки",
          "3 раунда правок",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Доп. экран", description: "Разработка нового экрана", price: "$100" },
      { name: "Интеграция платежей", description: "Интеграция Stripe, PayPal или Iyzico", price: "$300" },
      { name: "Карта", description: "Google Maps, функции геолокации", price: "$300" },
      { name: "Система уведомлений", description: "Firebase / OneSignal", price: "$200" },
      { name: "Разработка админ-панели", description: "Веб-админ-панель", price: "$400" },
      { name: "Консультация Store", description: "Оптимизация, ASO", price: "$200" },
      { name: "Обслуживание 6 мес.", description: "Пакет обслуживания и обновлений", price: "$100" },
      { name: "Обслуживание 12 мес.", description: "Пакет обслуживания и обновлений", price: "$200" },
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
        <ServiceProcess data={serviceData} duration="3 - 6 недель" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
