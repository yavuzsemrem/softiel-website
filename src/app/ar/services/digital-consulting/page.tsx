import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "الاستشارات الرقمية - Softiel",
  description: "نرشد تحولك الرقمي: الاستراتيجية، اختيار التقنية، والتنفيذ القابل للقياس.",
}

export const dynamic = 'force-static'

export default function DigitalConsultingPage() {
  const pricing = [
    { name: "Starter", price: "$300", period: "ابتداءً من", features: [
      "تدقيق رقمي لمرة واحدة (موقع، سوشيال، SEO، إعلانات)",
      "تحليل SWOT",
      "توصيات أساسية",
      "خارطة طريق بسيطة (3–6 أشهر)",
      "مراجعة واحدة"
    ], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
    { name: "Pro", price: "$500", period: "شهرياً", features: [
      "كل ما في Starter +",
      "اجتماعان شهرياً (Zoom/Meet)",
      "توجيه مستمر للإعلانات وSEO والسوشيال",
      "KPIs وتتبع الأداء",
      "تحليل المنافسين (تقرير ربع سنوي)",
      "مراجعتان"
    ], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
    { name: "Enterprise", price: "$750", period: "شهرياً", features: [
      "كل ما في Pro +",
      "جلسات أسبوعية/شهرية",
      "خارطة طريق للتحول الرقمي (خطة سنوية)",
      "اختيار التقنية (ERP, CRM, التجارة الإلكترونية)",
      "تدريب الفريق",
      "تقارير وتحديثات استراتيجية",
      "3 مراجعات + SLA لمدة 6 أشهر"
    ], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
  ]

  const serviceData = {
    title: "الاستشارات\nالرقمية",
    subtitle: "قيادة التحول الرقمي",
    description: "نقدّم استشارات في تطوير الاستراتيجية واختيار التقنية.",
    detailDescription: "نحلل وضعك الحالي ونحدد الطريق الأوضح نحو أهدافك.",
    icon: "💡",
    serviceType: "danismanlik",
    labels: {
      detailsBadge: "تفاصيل الخدمة",
      whyPrefix: "لماذا",
      processBadge: "العملية",
      processHeadingBefore: "كيف",
      processHeadingGradient: "نعمل",
      processSubtitle: "تنفيذ تدريجي مع KPIs قابلة للقياس.",
      timelineAverage: "متوسط الوقت",
      timelineSupport: "الدعم",
      timelineSatisfaction: "الرضا",
      pricingBadge: "التسعير",
      pricingHeadingBefore: "أسعار",
      pricingHeadingGradient: "عادلة",
      pricingSubtitle: "اختر الخطة المناسبة. عروض مخصصة متاحة.",
      popularBadge: "الأكثر شعبية",
      ctaGetOffer: "احصل على عرض",
      ctaOfferMessageTemplate: "مرحباً! أود معلومات عن خطة {planName} لخدمة {serviceTitle}.",
      domainNotice: undefined,
      addOnsBadge: "خدمات إضافية",
      addOnsHeadingBefore: "خدمات",
      addOnsHeadingGradient: "إضافية",
      addOnsSubtitle: "عزّز النتائج بخيارات إضافية.",
      ctaGetDetails: "عرض التفاصيل",
      ctaAddOnMessageTemplate: "مرحباً! أود معلومات عن إضافة {addOnName} لخدمة {serviceTitle}.",
      featuresConsulting: [
        { title: "تطوير الإستراتيجية", description: "خارطة طريق" },
        { title: "اختيار التقنية", description: "أدوات مناسبة" },
        { title: "تحسين العمليات", description: "كفاءة" },
        { title: "التدريب والإرشاد", description: "تمكين الفريق" },
        { title: "التحليلات والتقارير", description: "KPIs & Insights" },
        { title: "تحليل المنافسين", description: "السوق" },
      ],
    },
    features: [
      { title: "تطوير الإستراتيجية", description: "خطة واضحة", icon: "🎯" },
      { title: "اختيار التقنية", description: "منصات مناسبة", icon: "🔧" },
      { title: "تحسين العمليات", description: "كفاءة", icon: "📈" },
      { title: "التدريب والإرشاد", description: "تمكين الفريق", icon: "👨‍🏫" },
    ],
    process: [
      { step: "1", title: "تحليل الوضع الحالي", description: "نحلل حضورك الرقمي." },
      { step: "2", title: "تحديد الأهداف", description: "نحدد أهدافاً قابلة للقياس." },
      { step: "3", title: "خارطة الطريق", description: "نضع خطة قابلة للتنفيذ." },
      { step: "4", title: "دعم التنفيذ", description: "نرشد التنفيذ." },
    ],
    addOnServices: [
      { name: "اجتماع إضافي", description: "خارج الباقة الشهرية", price: "$50" },
      { name: "وحدة تدريب", description: "SEO/السوشيال/التسويق الرقمي", price: "$150" },
      { name: "اختيار التقنية", description: "ERP/CRM/التجارة الإلكترونية", price: "$200" },
      { name: "تحليل المنافسين", description: "تقرير متعمق", price: "$200" },
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
        <ServiceProcess data={serviceData} duration="1 - 2 أسابيع" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


