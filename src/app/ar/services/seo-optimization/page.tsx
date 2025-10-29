import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "تحسين محركات البحث - Softiel",
  description: "خدمات تحسين محركات البحث لتحسين الترتيب في Google وزيادة الزيارات العضوية.",
}

export const dynamic = 'force-static'

export default function SEOOptimizationArPage() {
  const serviceData = {
    title: "تحسين محركات\nالبحث",
    subtitle: "ترتيب أعلى في Google",
    description: "نحسّن موقعك لتحسين الترتيب في محركات البحث. نقدّم نمو الزيارات العضوية وجذب العملاء.",
    detailDescription: "تحسين محركات البحث لم يعد فقط عن كثافة الكلمات المفتاحية، بل استراتيجية تركز على تجربة المستخدم. بالنهج الصحيح، نلبي خوارزميات Google واحتياجات العملاء.",
    icon: "🔍",
    serviceType: "seo",
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
      featuresSEO: [
        { title: "بحث الكلمات المفتاحية", description: "تحليل الكلمات المفتاحية واستراتيجية تركز على الجمهور المستهدف" },
        { title: "SEO تقني", description: "سرعة الموقع والتوافق مع الهواتف وتهيئة الفهرسة" },
        { title: "تحسين المحتوى", description: "إنتاج محتوى متوافق مع SEO وتحسين meta" },
        { title: "Analytics & المتابعة", description: "تكامل Google Analytics وSearch Console" },
        { title: "استراتيجية Backlinks", description: "بناء السلطة وتطوير ملفات الروابط العضوية" },
        { title: "تقرير الأداء", description: "تقارير أداء SEO مفصلة شهرية" },
      ],
    },
    features: [
      { title: "زيادة الترتيب في Google", description: "نضمن الظهور في الصفحة الأولى", icon: "🚀" },
      { title: "زيادة الزيارات العضوية", description: "زيادة الزوار الجيدين", icon: "📈" },
      { title: "تحليل المنافسين", description: "نتميز في السوق", icon: "🎯" },
      { title: "نتائج تركز على ROI", description: "عائد استثمار مضمون", icon: "💰" },
    ],
    process: [
      { step: "1", title: "تدقيق SEO", description: "نحلّل الوضع الحالي ونحدّد مجالات التحسين." },
      { step: "2", title: "تطوير الاستراتيجية", description: "ننشئ استراتيجية الكلمات المفتاحية وخطة المحتوى." },
      { step: "3", title: "التحسين", description: "نطبّق التحسينات التقنية ومحتوى." },
      { step: "4", title: "المتابعة والإعداد التقارير", description: "نتتبع الأداء ونقدّم تقارير منتظمة." },
    ],
    pricing: [
      {
        name: "Starter (SEO تقني)",
        price: "$300",
        period: "شهر",
        features: [
          "التدقيق",
          "إعداد Analytics/Console",
          "تحسين meta/URL",
          "خريطة الموقع",
          "تقارير Lighthouse",
          "تقرير شهري",
          "مراجعة واحدة",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (SEO نمو)",
        price: "$500",
        period: "شهر",
        features: [
          "Starter + بحث الكلمات المفتاحية",
          "تحسين المحتوى",
          "خطة المدونة",
          "بناء الروابط",
          "SEO الصور",
          "تقرير مفصل",
          "مراجعتان",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (SEO عدواني)",
        price: "$750",
        period: "شهر",
        features: [
          "Pro + كلمات مفتاحية/محتوى أكثر",
          "استراتيجية backlinks",
          "تحليل المنافسين",
          "SEO محلي",
          "إدارة 360°",
          "لقاء شهري",
          "3 مراجعات",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "كلمات مفتاحية إضافية", description: "لكل 5 كلمات", price: "$20" },
      { name: "كتابة محتوى إضافي", description: "700-1000 كلمة، لكل مقال", price: "$50" },
      { name: "حزم backlinks", description: "5-10 روابط جيدة", price: "$100" },
      { name: "صورة SEO", description: "لكل قطعة", price: "$25" },
      { name: "تقرير تحليل المنافسين", description: "شهريًا", price: "$100/شهر" },
      { name: "تقرير تحليل المنافسين", description: "ربع سنوي", price: "$200/ربع" },
      { name: "تحسين SEO لصفحة الهبوط", description: "لكل صفحة", price: "$75" },
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
        <ServiceProcess data={serviceData} duration="1 - 5 أيام" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
