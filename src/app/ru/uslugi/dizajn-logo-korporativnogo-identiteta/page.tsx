import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Дизайн Логотипа & Корп. Стиля - Softiel",
  description: "Дизайн логотипа, фирменный стиль, типографика и гайдинг brandbook для единого образа бренда.",
}

export const dynamic = 'force-static'

export default function LogoIdentityRuPage() {
  const serviceData = {
    title: "Логотип &\nФирменный Стиль",
    subtitle: "Сильный и Единый Образ",
    description: "Позиционируем бренд через логотип, палитру, типографику и гайд brandbook.",
    detailDescription: "Единый стиль усиливает доверие и узнаваемость. Доставляем масштабируемый язык бренда на всех каналах.",
    icon: "🎨",
    serviceType: "logo-kimlik",
    labels: {
      detailsBadge: "Детали услуги",
      whyPrefix: "Почему",
      processBadge: "Процесс",
      processHeadingBefore: "Как",
      processHeadingGradient: "мы работаем",
      processSubtitle: "Дискавери, правки, передача с brandbook.",
      timelineAverage: "Среднее время",
      timelineSupport: "Поддержка",
      timelineSatisfaction: "Удовлетворённость",
      pricingBadge: "Цены",
      pricingHeadingBefore: "Выгодные",
      pricingHeadingGradient: "цены",
      pricingSubtitle: "Выберите пакет. Возможны индивидуальные предложения.",
      popularBadge: "Самый популярный",
      ctaGetOffer: "Получить предложение",
      ctaOfferMessageTemplate: "Здравствуйте! Нужна информация по тарифу {planName} для {serviceTitle}.",
      addOnsBadge: "Доп. услуги",
      addOnsHeadingBefore: "Доп.",
      addOnsHeadingGradient: "услуги",
      addOnsSubtitle: "Усильте бренд доп. услугами.",
      ctaGetDetails: "Подробнее",
      ctaAddOnMessageTemplate: "Здравствуйте! Нужны детали по опции {addOnName} для {serviceTitle}.",
      featuresLogoIdentity: [
        { title: "Дизайн Логотипа", description: "Яркий & запоминающийся" },
        { title: "Фирменный Стиль", description: "Цвета & шрифты" },
        { title: "Гайд Brandbook", description: "Правила использования" },
        { title: "Мультиформат", description: "PNG, SVG, PDF" },
        { title: "Право на правки", description: "В фокусе — удовлетворённость" },
        { title: "Быстрая Сдача", description: "Плановый процесс" },
      ],
    },
    features: [
      { title: "Дизайн Логотипа", description: "Уникальный & проф.", icon: "🎯" },
      { title: "Фирменный Стиль", description: "Единый вид", icon: "🎨" },
      { title: "Типографика", description: "Читабельно & уместно", icon: "🔤" },
      { title: "Гайд Brandbook", description: "Стандарты применения", icon: "📘" },
    ],
    process: [
      { step: "1", title: "Дискавери & Бриф", description: "Потребности & конкуренты" },
      { step: "2", title: "Эскиз & Направление", description: "Варианты & обратная связь" },
      { step: "3", title: "Правки", description: "Уточнение выбранного" },
      { step: "4", title: "Передача", description: "Brandbook и файлы" },
    ],
    pricing: [
      { name: "Starter", price: "$150", period: "от", features: ["3 концепта", "2 правки", "PNG/SVG/PDF"], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
      { name: "Pro", price: "$350", period: "от", features: ["Логотип + цвета", "Типографика", "2 правки", "Brandbook"], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
      { name: "Enterprise", price: "$750", period: "от", features: ["Логотип + набор", "Шаблоны", "3 правки", "Расширенный brandbook"], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
    ],
    addOnServices: [
      { name: "Доп. концепт логотипа", description: "На новое направление", price: "$100" },
      { name: "Доп. раунд правок", description: "Доп. правки", price: "$50" },
      { name: "Доп. язык", description: "Перевод Brandbook", price: "$50" },
      { name: "Корп. униформа", description: "Одежда/транспорт", price: "$150" },
      { name: "Анимированный логотип", description: "Motion, intro", price: "$175" },
      { name: "Набор иконок", description: "Favicon & app icon", price: "$50" },
      { name: "Обучение", description: "Корпоративное", price: "$150" },
    ],
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
        <ServiceProcess data={serviceData} duration="5 - 10 дней" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


