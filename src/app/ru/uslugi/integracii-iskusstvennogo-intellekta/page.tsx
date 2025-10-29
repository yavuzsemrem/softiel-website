import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Интеграции Искусственного Интеллекта - Softiel",
  description: "Мы интегрируем чатбот, машинное обучение, обработку естественного языка и другие технологии ИИ в ваш бизнес. Мы обеспечиваем автоматизацию и повышение эффективности.",
}

export const dynamic = 'force-static'

export default function IntegraciiIskusstvennogoIntellektaPage() {
  const pricing = [
    {
      name: "Starter",
      price: "$1,000",
      period: "от",
      features: [
        "Интеграция чатбота на веб-сайте или WhatsApp/Telegram",
        "Система ответов на основе FAQ (часто задаваемые вопросы)",
        "Базовая NLP (понимание намерений пользователя)",
        "Простая панель управления → записи вопрос-ответ",
        "1 право на правки"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro",
      price: "$2,500",
      period: "от",
      features: [
        "Все из Starter +",
        "Интеграция CRM/ERP (информация о клиенте, статус заказа, запрос счетов)",
        "Отчетность на основе ИИ (Excel, Power BI, интеграция пользовательских панелей)",
        "Системы рекомендаций (например, рекомендации продуктов, upsell/cross-sell)",
        "Многоязычная поддержка (RU/TR)",
        "2 права на правки"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "$4,000",
      period: "от",
      features: [
        "Все из Pro +",
        "Пользовательские модели ИИ (интеграция OpenAI, Azure AI, HuggingFace)",
        "Интеграция голосового помощника (IVR / Voice bot)",
        "Обработка изображений (распознавание продуктов, контроль качества)",
        "Двигатель рекомендаций в реальном времени (оптимизация рекламы, прогнозирование продаж)",
        "Безопасность + логирование (соответствует KVKK/GDPR)",
        "3 права на правки + поддержка SLA 6 месяцев"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "Интеграции\nИскусственного Интеллекта",
    subtitle: "Технология Будущего Сегодня",
    description: "Мы интегрируем чатбот, машинное обучение, обработку естественного языка и другие технологии ИИ в ваш бизнес. Мы обеспечиваем автоматизацию и повышение эффективности.",
    detailDescription: "Интеграции искусственного интеллекта переводят ваш бизнес в будущее. Мы предлагаем интеллектуальные решения, которые оптимизируют ваши бизнес-процессы. Мы повышаем вашу эффективность с помощью комплексной экосистемы ИИ от чатботов до машинного обучения.",
    icon: "🤖",
    serviceType: "yapay-zeka",
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
      featuresAI: [
        { title: "Разработка Чатбота", description: "Умное обслуживание клиентов" },
        { title: "Машинное Обучение", description: "Анализ данных & прогнозирование" },
        { title: "Обработка Естественного Языка", description: "Анализ текста & понимание" },
        { title: "Автоматизация Бизнес-Процессов", description: "Автоматизация рутинных задач" },
        { title: "Обработка Изображений", description: "Визуальный анализ & распознавание" },
        { title: "Анализ в Реальном Времени", description: "Мгновенная обработка данных" },
      ],
    },
    features: [
      { title: "Разработка Чатбота", description: "Умное обслуживание клиентов", icon: "💬" },
      { title: "Машинное Обучение", description: "Анализ данных и прогнозирование", icon: "🧠" },
      { title: "Обработка Естественного Языка", description: "Анализ текста и понимание", icon: "📝" },
      { title: "Автоматизация Бизнес-Процессов", description: "Автоматизация рутинных задач", icon: "⚙️" },
    ],
    process: [
      { step: "1", title: "Анализ Потребностей", description: "Мы определяем процессы, требующие решений ИИ." },
      { step: "2", title: "Выбор Модели", description: "Мы выбираем наиболее подходящую модель ИИ и технологию." },
      { step: "3", title: "Разработка & Обучение", description: "Мы разрабатываем и обучаем систему ИИ." },
      { step: "4", title: "Интеграция & Тестирование", description: "Мы интегрируем в существующие системы и тестируем." },
    ],
    addOnServices: [
      { name: "Языковая Поддержка", description: "Английский + Немецкий и т.д.", price: "$100" },
      { name: "Обучение Модели", description: "Fine-tuning с клиентскими e-mail", price: "$350" },
      { name: "Генерация Контента на ИИ", description: "Блог, соцсети, описание продукта", price: "$400" },
      { name: "Обработка Изображений", description: "Продукты, контроль", price: "$900" },
      { name: "Голосовой Ассистент", description: "Интеграция call-центра", price: "$1,000" },
      { name: "Обучение Пользователей", description: "Обучение команды", price: "$200" },
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
        <ServiceProcess data={serviceData} duration="2 - 4 Недели" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

