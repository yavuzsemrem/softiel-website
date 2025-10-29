import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "تطوير تطبيقات الهواتف المحمولة - Softiel",
  description: "تطوير تطبيقات iOS وAndroid. حلول تطبيقات محمولة أصلية ومتعددة المنصات.",
}

export const dynamic = 'force-static'

export default function MobileAppDevelopmentArPage() {
  const serviceData = {
    title: "تطوير تطبيقات\nالهواتف المحمولة",
    subtitle: "تطبيقات iOS & Android",
    description: "نطوّر تطبيقات iOS وAndroid من قاعدة كود واحدة. نقدّم حلولاً من MVP إلى مستوى المؤسسات.",
    detailDescription: "أصبحت التطبيقات المحمولة حاسمة للأعمال. بينما يقضي المستخدمون 90% من وقتهم على الأجهزة المحمولة، توفر الاستراتيجية المحمولة الصحيحة وصولاً 24/7 لعملائك وتعطيك ميزة تنافسية.",
    icon: "📱",
    serviceType: "mobil-uygulama",
    labels: {
      detailsBadge: "تفاصيل الخدمة",
      whyPrefix: "لماذا",
      processBadge: "سير العمل",
      processHeadingBefore: "كيف",
      processHeadingGradient: "نعمل",
      processSubtitle: "نحوّل مشروعك خطوة بخطوة. نبقى على تواصل في كل مرحلة لضمان أفضل نتيجة.",
      timelineAverage: "المدة المتوسطة",
      timelineSupport: "الدعم",
      timelineSatisfaction: "الرضا",
      pricingBadge: "التسعير",
      pricingHeadingBefore: "أسعار",
      pricingHeadingGradient: "مناسبة",
      pricingSubtitle: "اختر الباقة المناسبة لمشروعك. تتوفر عروض مخصّصة عند الحاجة.",
      popularBadge: "الأكثر شيوعًا",
      ctaGetOffer: "احصل على عرض",
      ctaOfferMessageTemplate: "مرحبًا! أود الحصول على معلومات حول باقة {planName} لخدمة {serviceTitle}.",
      domainNotice: "النطاق + SSL + رسوم الاستضافة غير مشمولة",
      addOnsBadge: "خدمات إضافية",
      addOnsHeadingBefore: "خدمات",
      addOnsHeadingGradient: "إضافية",
      addOnsSubtitle: "عزّز مشروعك بخيارات إضافية مرنة.",
      ctaGetDetails: "عرض التفاصيل",
      ctaAddOnMessageTemplate: "مرحبًا! أود الحصول على معلومات حول الخدمة الإضافية {addOnName} لخدمة {serviceTitle}.",
      featuresMobileApp: [
        { title: "متعدد المنصات", description: "تطبيقات iOS وAndroid من قاعدة كود واحدة" },
        { title: "تطوير سريع", description: "تطوير سريع للتطبيقات بتقنيات متعددة المنصات الحديثة" },
        { title: "توافق المتجر", description: "تطبيقات متوافقة مع معايير App Store وGoogle Play" },
        { title: "أداء أصلي", description: "تجربة تطبيق محمول عالية الأداء" },
        { title: "تكامل Backend", description: "خدمات قاعدة بيانات وpusher قائمة على API" },
        { title: "الإشعارات الفورية", description: "إشعارات في الوقت الفعلي ووظائف التفاعل" },
      ],
    },
    features: [
      { title: "MVP سريع", description: "إطلاق في 3-6 أسابيع", icon: "⚡" },
      { title: "قاعدة كود واحدة", description: "iOS + Android في الوقت نفسه", icon: "🔄" },
      { title: "قابل للتخصيص", description: "وحدات مخصصة لأعمالك", icon: "🎯" },
      { title: "دعم طويل الأمد", description: "ضمان صيانة مع SLA", icon: "🛡️" },
    ],
    process: [
      { step: "1", title: "تحليل الاحتياجات", description: "نحلّل أفكارك ونحدّد الحل المناسب من MVP إلى Enterprise." },
      { step: "2", title: "النموذج الأولي والتصميم", description: "ننشئ تصميماً يركز على تجربة المستخدم ونماذج أولية تفاعلية." },
      { step: "3", title: "التطوير متعدد المنصات", description: "نطوّر تطبيقات iOS وAndroid في الوقت نفسه من قاعدة كود واحدة." },
      { step: "4", title: "الاختبار والنشر في المتجر", description: "نجري اختبارات شاملة وننشر على App Store وGoogle Play." },
    ],
    pricing: [
      {
        name: "Starter (MVP)",
        price: "$2,000",
        period: "بدءًا من",
        features: [
          "iOS + Android (Flutter/React Native)",
          "تسجيل دخول المستخدم (بريد/كلمة مرور)",
          "صفحة الملف الشخصي + CRUD أساسي",
          "إشعارات دفع بسيطة",
          "Backend: Firebase/REST API",
          "جولة مراجعة واحدة",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro",
        price: "$3,500",
        period: "بدءًا من",
        features: [
          "جميع ميزات Starter",
          "إدارة مستخدمين متقدمة (أدوار، صلاحيات)",
          "تكامل الدفع (Iyzico، Stripe)",
          "ميزات الخريطة/الموقع",
          "إشعارات في الوقت الفعلي",
          "لوحة إدارة أساسية",
          "جولتا مراجعة",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise",
        price: "$5,000",
        period: "بدءًا من",
        features: [
          "جميع ميزات Pro",
          "دعم لغات متعددة",
          "أمان متقدم (2FA، التشفير)",
          "محادثة/socket في الوقت الفعلي",
          "Backend قائم على Microservices",
          "تكامل CI/CD",
          "SLA + صيانة 6 أشهر",
          "3 جولات مراجعة",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "شاشة إضافية", description: "تصميم وتطوير شاشة جديدة", price: "$100" },
      { name: "تكامل الدفع", description: "تكامل Stripe أو PayPal أو Iyzico", price: "$300" },
      { name: "خدمات الخريطة", description: "Google Maps، ميزات قائمة على الموقع", price: "$300" },
      { name: "نظام الإشعارات", description: "Firebase / OneSignal", price: "$200" },
      { name: "تطوير لوحة الإدارة", description: "لوحة إدارة قائمة على الويب", price: "$400" },
      { name: "استشارة المتجر", description: "التحسين، ASO", price: "$200" },
      { name: "صيانة 6 أشهر", description: "باقة صيانة وتحديثات", price: "$100" },
      { name: "صيانة 12 شهرًا", description: "باقة صيانة وتحديثات", price: "$200" },
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
        <ServiceProcess data={serviceData} duration="3 - 6 أسابيع" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
