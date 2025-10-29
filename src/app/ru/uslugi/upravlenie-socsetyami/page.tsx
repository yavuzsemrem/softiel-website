import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Управление Социальными Сетями - Softiel",
  description: "Профессиональные услуги по управлению социальными сетями в Instagram, Facebook, LinkedIn. Мы повышаем узнаваемость вашего бренда и укрепляем вовлеченность клиентов.",
}

export const dynamic = 'force-static'

export default function UpravlenieSocsetyamiPage() {
  const pricing = [
    {
      name: "Starter",
      price: "$300",
      period: "в месяц",
      features: [
        "2 платформы (Instagram + Facebook)",
        "8 постов в месяц (шаблон + контент клиента)",
        "Простой дизайн (Canva/на основе шаблонов)",
        "Предложения по хэштегам и календарю контента",
        "Ежемесячный отчет о производительности",
        "1 право на правки"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro",
      price: "$500",
      period: "в месяц",
      features: [
        "3-4 платформы (Instagram, Facebook, LinkedIn, опция TikTok)",
        "12-16 постов в месяц (мы создаем контент: визуальный + текст)",
        "Профессиональный дизайн (Photoshop/Illustrator, специфичный для бренда)",
        "Простой видеоконтент (reels / анимации stories)",
        "Еженедельное планирование + регулярная публикация",
        "Отслеживание комментариев и сообщений (базовое управление сообществом)",
        "Ежемесячный детальный отчет (охват, вовлеченность, анализ подписчиков)",
        "2 права на правки"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "$750",
      period: "в месяц",
      features: [
        "Все услуги Pro +",
        "4-5 платформ (Instagram, Facebook, LinkedIn, TikTok, YouTube)",
        "20+ постов в месяц (фото + видео + интеграция блога)",
        "Профессиональная видеопроизводство (1-2 коротких видео в месяц)",
        "Предложения по сотрудничеству с инфлюенсерами",
        "A/B тесты (испытания производительности контента)",
        "Рекламная интеграция (синхронизация с кампаниями Google Ads / Meta Ads)",
        "Еженедельный отчет + ежемесячная стратегическая встреча",
        "3 права на правки"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "Управление\nСоциальными Сетями",
    subtitle: "Эффективная Стратегия",
    description: "Мы создаем профессиональный контент в Instagram, Facebook, LinkedIn. Мы повышаем узнаваемость вашего бренда и укрепляем вовлеченность клиентов.",
    detailDescription: "Управление социальными сетями становится голосом вашего бренда в цифровом мире. Мы позволяем вам эффективно общаться с целевой аудиторией, думая стратегически. Мы выделяем ваш бренд в социальных сетях благодаря профессиональному созданию контента и управлению сообществом.",
    icon: "📱",
    serviceType: "sosyal-medya",
    labels: {
      detailsBadge: "Детали Услуги",
      whyPrefix: "Почему",
      processBadge: "Процесс",
      processHeadingBefore: "Как",
      processHeadingGradient: "Мы Работаем",
      processSubtitle: "Мы шаг за шагом воплощаем ваш проект в жизнь. Мы остаемся на связи на каждом этапе, чтобы обеспечить наилучший результат.",
      timelineAverage: "Среднее Время",
      timelineSupport: "Поддержка",
      timelineSatisfaction: "Удовлетворенность",
      pricingBadge: "Цены",
      pricingHeadingBefore: "Справедливые",
      pricingHeadingGradient: "Цены",
      pricingSubtitle: "Выберите правильный пакет для вашего проекта. Мы также предоставляем индивидуальные предложения для особых потребностей.",
      popularBadge: "Самый Популярный",
      ctaGetOffer: "Получить Предложение",
      ctaOfferMessageTemplate: "Здравствуйте! Я хотел бы получить информацию о тарифе {planName} для услуги {serviceTitle}.",
      domainNotice: undefined,
      addOnsBadge: "Дополнительные Услуги",
      addOnsHeadingBefore: "Дополнительные",
      addOnsHeadingGradient: "Услуги",
      addOnsSubtitle: "Расширьте свой проект с помощью дополнительных опций. Мы предлагаем гибкие решения для особых потребностей.",
      ctaGetDetails: "Просмотреть Детали",
      ctaAddOnMessageTemplate: "Здравствуйте! Я хотел бы получить информацию о дополнении {addOnName} для услуги {serviceTitle}.",
      featuresSocialMedia: [
        { title: "Создание Контента", description: "Креативный & привлекательный" },
        { title: "Визуальный Дизайн", description: "Профессиональные визуалы" },
        { title: "Управление Сообществом", description: "Вовлеченность & управление" },
        { title: "Анализ & Отчеты", description: "Детальный анализ производительности" },
        { title: "Разработка Стратегии", description: "Целевая аудитория" },
        { title: "Быстрая Публикация", description: "Регулярный своевременный контент" },
      ],
    },
    features: [
      { title: "Создание Контента", description: "Креативный & привлекательный", icon: "✨" },
      { title: "Визуальный Дизайн", description: "Профессиональные визуалы", icon: "🎨" },
      { title: "Управление Сообществом", description: "Вовлеченность подписчиков", icon: "👥" },
      { title: "Анализ & Отчеты", description: "Детальная производительность", icon: "📊" },
    ],
    process: [
      { step: "1", title: "Разработка Стратегии", description: "Мы анализируем целевую аудиторию и создаем стратегию социальных сетей." },
      { step: "2", title: "Планирование Контента", description: "Мы планируем ежемесячный календарь контента и темы." },
      { step: "3", title: "Создание Контента", description: "Мы создаем и публикуем визуальный и текстовый контент." },
      { step: "4", title: "Отслеживание & Оптимизация", description: "Мы отслеживаем производительность и постоянно улучшаем стратегию." },
    ],
    addOnServices: [
      { name: "Дополнительный Контент", description: "Доп. посты (+4 поста)", price: "$50" },
      { name: "Фотосессия", description: "Профессиональная фотосъемка", price: "$75" },
      { name: "Инфлюенсеры", description: "Управление сотрудничеством", price: "$250" },
      { name: "Управление Рекламой", description: "Интеграция рекламы", price: "$200" },
      { name: "Управление Кампанией", description: "Розыгрыш/кампания", price: "$150" },
      { name: "Анализ Конкурентов", description: "Ежемесячный/квартальный отчет", price: "$100" },
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
        <ServiceProcess data={serviceData} duration="1 - 3 Дня" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

