import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "إدارة Google Ads - Softiel",
  description: "إدارة فعالة لحملات إعلانية على Google Ads وMeta Ads. معدلات تحويل عالية بتكلفة منخفضة.",
}

export const dynamic = 'force-static'

export default function GoogleAdsManagementArPage() {
  const serviceData = {
    title: "إدارة\nGoogle Ads",
    subtitle: "حملات إعلانية مستهدفة",
    description: "ندير حملات إعلانية فعالة على Google Ads وMeta Ads. نساعدك في تحقيق معدلات تحويل عالية بتكلفة منخفضة.",
    detailDescription: "أصبحت الإعلانات عبر الإنترنت حيوية للأعمال. بالاستراتيجية الصحيحة للمنصة وإدارة الحملات، يمكنك الوصول مباشرة إلى عملائك وزيادة المبيعات.",
    icon: "📢",
    serviceType: "google-ads",
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
      featuresGoogleAds: [
        { title: "إعلانات مستهدفة", description: "الوصول إلى الجمهور المناسب باستهداف دقيق" },
        { title: "استراتيجيات تركز على ROI", description: "عائد مرتفع من كل حملة يتم إطلاقها" },
        { title: "التحسين في الوقت الفعلي", description: "تتبع وتحسين الأداء 7/24" },
        { title: "إدارة متعددة المنصات", description: "Google Ads وMeta Ads وLinkedIn تحت سقف واحد" },
        { title: "إعداد سريع للحملات", description: "حملات نشطة في غضون 24 ساعة" },
        { title: "تحليل أداء مفصل", description: "نتائج الحملات مع تقارير شهرية" },
      ],
    },
    features: [
      { title: "حملات مستهدفة", description: "الوصول إلى العملاء المناسبين", icon: "🎯" },
      { title: "ضمان زيادة ROI", description: "عائد مضمون على استثمارك", icon: "💰" },
      { title: "التحسين في الوقت الفعلي", description: "تتبع الحملات 7/24", icon: "⚡" },
      { title: "تصميم احترافي", description: "بما في ذلك الإعلانات المرئية", icon: "🎨" },
    ],
    process: [
      { step: "1", title: "تحليل الجمهور المستهدف", description: "نحلّل جمهورك المستهدف ونحدّد القنوات الأكثر فعالية." },
      { step: "2", title: "تصميم الحملة", description: "ننشئ نصوص الإعلانات والمرئيات واستراتيجية الاستهداف." },
      { step: "3", title: "التحسين", description: "نحسّن الحملات باستمرار ونحسّن الأداء." },
      { step: "4", title: "إعداد التقارير", description: "نتتبع النتائج مع تقارير أداء مفصلة." },
    ],
    pricing: [
      {
        name: "Starter (إدارة أساسية)",
        price: "$300",
        period: "شهر",
        features: [
          "Google Ads أو Meta Ads (قناة واحدة)",
          "إعداد الحملة (بحث/عرض/Instagram-Facebook)",
          "إعدادات الاستهداف (الموقع، الديموغرافيا، الكلمات المفتاحية)",
          "نصوص إعلانية أساسية + مرئيات (إذا قدمها العميل)",
          "تقرير واحد شهري (أداء أساسي)",
          "مراجعة واحدة / تغيير",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (إدارة محسّنة)",
        price: "$500",
        period: "شهر",
        features: [
          "Google Ads + Meta Ads (قناتان تُداران معًا)",
          "2-3 حملات (بحث + إعادة استهداف + وسائل التواصل)",
          "نصوص إعلانية + تصميم مرئي (مننا)",
          "اختبارات A/B (العناوين، CTA)",
          "تحسين أسبوعي (الميزانية، الاستهداف)",
          "تقرير شهري مفصل (CTR، التحويل، تحليل التكلفة)",
          "مراجعتان / تغييرات",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (إدارة استراتيجية)",
        price: "$750",
        period: "شهر",
        features: [
          "إدارة متعددة القنوات (Google Ads + Meta + LinkedIn)",
          "5+ حملات (بحث، عرض، إعادة استهداف، فيديو، إعلانات عملاء محتملين)",
          "تصاميم إعلانية احترافية (بما في ذلك المرئيات + الفيديوهات)",
          "تخطيط قمع التحويل (بما في ذلك تحسين صفحة الهبوط)",
          "إعداد تقارير أسبوعي + لقاء استراتيجي شهري",
          "اختبارات A/B شهرية وتحسين مستمر",
          "مناسب للمشاريع بميزانية إعلانية أعلى من $2,000",
          "3 مراجعات / تغييرات",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "قناة إضافية", description: "LinkedIn/TikTok/Twitter – قناة", price: "$100/شهر" },
      { name: "تصميم مرئي احترافي", description: "بانر، منشور اجتماعي – لكل قطعة", price: "$50" },
      { name: "فيديو إعلاني", description: "YouTube/Reels/TikTok – فيديو", price: "$75" },
      { name: "تصميم صفحة هبوط", description: "مركّز على التحويل – لكل صفحة", price: "$300" },
      { name: "استشارة مسار التحويل", description: "تكامل CRM وتتبع العملاء المحتملين", price: "$150" },
      { name: "تقرير تحليل إعلانات المنافسين", description: "مرة واحدة", price: "$75" },
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
