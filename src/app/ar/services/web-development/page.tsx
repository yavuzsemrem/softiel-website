import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "تطوير تطبيقات الويب - Softiel",
  description: "تطبيقات ويب حديثة باستخدام React وNext.js وNode.js. خدمات تطوير ويب احترافية.",
}

export const dynamic = 'force-static'

export default function WebDevelopmentArPage() {
  const serviceData = {
    title: "تطوير تطبيقات الويب",
    subtitle: "حلول مخصصة لاحتياجاتك",
    description: "نطوّر تطبيقات ويب مخصصة بتقنيات حديثة. حلول سهلة الاستخدام وسريعة وآمنة لنتائج احترافية.",
    detailDescription: "أصبحت تطبيقات الويب ضرورية للأعمال. بالنهج والتقنيات المناسبة، تزيد رضا العملاء وكفاءة العمليات.",
    icon: "💻",
    serviceType: "web-gelistirme",
    labels: {
      detailsBadge: "تفاصيل الخدمة",
      whyPrefix: "لماذا",
      processBadge: "سير العمل",
      processHeadingBefore: "كيف",
      processHeadingGradient: "نعمل",
      processSubtitle: "نقدّم مشروعك خطوة بخطوة مع اختبارات وتعقيبات مستمرة.",
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
      featuresWebDevelopment: [
        { title: "حل مخصص", description: "ملائم تمامًا لاحتياجاتك" },
        { title: "تكاملات", description: "ERP وCRM والمدفوعات وواجهات API" },
        { title: "قابلية التوسع", description: "بنية جاهزة للنمو" },
        { title: "الأمان والسرعة", description: "أطر حديثة وأداء عالٍ" },
        { title: "تكامل قاعدة البيانات", description: "توافق كامل مع جميع أنظمة قواعد البيانات" },
        { title: "نهج API First", description: "هندسة Microservices وREST API للتطوير الموجه للمستقبل" },
      ],
    },
    features: [
      { title: "حل مخصص", description: "ملائم تمامًا لاحتياجاتك", icon: "🎯" },
      { title: "تكاملات", description: "ERP وCRM والمدفوعات وواجهات API", icon: "🔗" },
      { title: "قابلية التوسع", description: "بنية جاهزة للنمو", icon: "📈" },
      { title: "الأمان والسرعة", description: "أطر حديثة وأداء عالٍ", icon: "⚡" },
    ],
    process: [
      { step: "1", title: "تحليل الاحتياجات", description: "نحلّل احتياجات عملك ونحدّد نطاق المشروع." },
      { step: "2", title: "اختيار التقنيات", description: "نختار أفضل التقنيات ونصمّم المعمارية." },
      { step: "3", title: "تطوير Agile", description: "تطوير تكراري مع اختبارات وتعقيبات مستمرة." },
      { step: "4", title: "النشر والصيانة", description: "نشر للإنتاج ودعم طويل الأمد." },
    ],
    pricing: [
      { name: "Starter", price: "$1,500", period: "بدءًا من", features: [
        "تطبيقات CRUD بسيطة",
        "تسجيل دخول مع صلاحيات أدوار",
        "واجهة متجاوبة",
        "تقارير أساسية (جداول، رسوم)",
        "تكامل واحد (مثلاً بريد أو SMS API)",
        "جولة مراجعة واحدة",
      ], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
      { name: "Pro", price: "$2,750", period: "بدءًا من", features: [
        "لوحة تحكم شاملة ووحدات",
        "إدارة أدوار وصلاحيات متعددة",
        "تقارير متقدمة (رسوم، فلاتر، تصدير)",
        "٢–٣ تكاملات (ERP، CRM، المدفوعات)",
        "أمان محسن (2FA، تسجيل أحداث)",
        "جولتا مراجعة",
      ], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
      { name: "Enterprise", price: "$4,500", period: "بدءًا من", features: [
        "حلول مؤسسية واسعة",
        "دعم متعدد المستخدمين",
        "تحكم وصول متقدم (RBAC، LDAP، SSO)",
        "بنية Microservices / API‑First",
        "قابلية التوسع (موازنة حمل، ذاكرة وسيطة)",
        "تكامل CI/CD",
        "SLA + صيانة 3–6 أشهر",
        "3 جولات مراجعة",
      ], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
    ],
    addOnServices: [
      { name: "وحدة إضافية", description: "وحدات إضافية لعملياتك", price: "$300" },
      { name: "Progressive Web App", description: "تطبيق أوفلاين ملائم للهاتف", price: "$400" },
      { name: "Analytics / BI", description: "تكامل ذكاء الأعمال", price: "$300" },
      { name: "أمان متقدم", description: "اختبار اختراق وتسجيل", price: "$300" },
      { name: "إعداد CI/CD", description: "خط أنابيب GitHub Actions", price: "$200" },
      { name: "نسخ احتياطي / مراقبة", description: "نسخ احتياطية تلقائية ومراقبة", price: "$150/شهر" },
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
        <ServiceProcess data={serviceData} duration="2 - 4 أسابيع" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} serviceType="web-gelistirme" />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


