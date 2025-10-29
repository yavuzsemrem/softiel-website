import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "تصميم الشعار وهوية العلامة - Softiel",
  description: "تصميم شعار مخصص، هوية علامة، خطوط ودليل Brandbook لهوية متناسقة.",
}

export const dynamic = 'force-static'

export default function LogoIdentityArPage() {
  const serviceData = {
    title: "الشعار &\nهوية العلامة",
    subtitle: "علامة قوية ومتناسقة",
    description: "نقدّم هوية احترافية عبر شعار، ألوان، خطوط ودليل Brandbook.",
    detailDescription: "الهوية المتناسقة تعزّز الثقة والتذكّر. نوفّر لغة علامة قابلة للتوسع عبر جميع القنوات.",
    icon: "🎨",
    serviceType: "logo-kimlik",
    labels: {
      detailsBadge: "تفاصيل الخدمة",
      whyPrefix: "لماذا",
      processBadge: "العملية",
      processHeadingBefore: "كيف",
      processHeadingGradient: "نعمل",
      processSubtitle: "اكتشاف، مراجعات، تسليم مع Brandbook.",
      timelineAverage: "المدة المتوسطة",
      timelineSupport: "الدعم",
      timelineSatisfaction: "الرضا",
      pricingBadge: "التسعير",
      pricingHeadingBefore: "أسعار",
      pricingHeadingGradient: "مناسبة",
      pricingSubtitle: "اختر الباقة المناسبة. عروض مخصّصة متاحة.",
      popularBadge: "الأكثر شيوعًا",
      ctaGetOffer: "احصل على عرض",
      ctaOfferMessageTemplate: "مرحبًا! أريد تفاصيل حول باقة {planName} لخدمة {serviceTitle}.",
      addOnsBadge: "خدمات إضافية",
      addOnsHeadingBefore: "خدمات",
      addOnsHeadingGradient: "إضافية",
      addOnsSubtitle: "عزّز هويتك بخيارات إضافية.",
      ctaGetDetails: "عرض التفاصيل",
      ctaAddOnMessageTemplate: "مرحبًا! أريد تفاصيل حول خدمة {addOnName} الإضافية لـ{serviceTitle}.",
      featuresLogoIdentity: [
        { title: "تصميم الشعار", description: "مؤثر ويسهل تذكّره" },
        { title: "هوية العلامة", description: "ألوان وخطوط" },
        { title: "دليل Brandbook", description: "قواعد الاستخدام" },
        { title: "تسليم متعدد الصيغ", description: "PNG, SVG, PDF" },
        { title: "حقوق المراجعة", description: "رضاكم أولًا" },
        { title: "تسليم سريع", description: "عملية مخططة" },
      ],
    },
    features: [
      { title: "تصميم الشعار", description: "فريد واحترافي", icon: "🎯" },
      { title: "هوية العلامة", description: "مظهر متناسق", icon: "🎨" },
      { title: "الخطوط", description: "مقروءة ومتناسقة", icon: "🔤" },
      { title: "دليل Brandbook", description: "معايير الاستخدام", icon: "📘" },
    ],
    process: [
      { step: "1", title: "اكتشاف وBrief", description: "احتياجات ومنافسون" },
      { step: "2", title: "اسكتش واتجاه", description: "مسارات وتعقيبات" },
      { step: "3", title: "مراجعات", description: "تحسين المسار" },
      { step: "4", title: "تسليم", description: "Brandbook والملفات" },
    ],
    pricing: [
      { name: "Starter", price: "$150", period: "ابتداءً من", features: ["3 مسارات", "مراجعتان", "PNG/SVG/PDF"], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
      { name: "Pro", price: "$350", period: "ابتداءً من", features: ["شعار + ألوان", "خطوط", "مراجعتان", "Brandbook"], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
      { name: "Enterprise", price: "$750", period: "ابتداءً من", features: ["شعار + مجموعة", "قوالب", "3 مراجعات", "Brandbook موسع"], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
    ],
    addOnServices: [
      { name: "مفهوم شعار إضافي", description: "لكل اتجاه جديد", price: "$100" },
      { name: "جولة مراجعة إضافية", description: "مراجعة إضافية", price: "$50" },
      { name: "لغة إضافية", description: "ترجمة Brandbook", price: "$50" },
      { name: "زي موحد للشركة", description: "ملابس/مركبات", price: "$150" },
      { name: "شعار متحرك", description: "Motion logo, intro", price: "$175" },
      { name: "مجموعة أيقونات", description: "Favicon & app icon", price: "$50" },
      { name: "تدريب الهوية", description: "تدريب داخلي", price: "$150" },
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
        <ServiceProcess data={serviceData} duration="5 - 10 أيام" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


