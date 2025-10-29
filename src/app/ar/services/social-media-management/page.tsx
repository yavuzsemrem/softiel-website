import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "إدارة وسائل التواصل الاجتماعي - Softiel",
  description: "خدمات إدارة احترافية لوسائل التواصل الاجتماعي على Instagram وFacebook وLinkedIn. نحن نزيد من شهرة علامتك التجارية ونقوي تفاعل العملاء.",
}

export const dynamic = 'force-static'

export default function SocialMediaManagementPage() {
  const pricing = [
    {
      name: "Starter",
      price: "$300",
      period: "شهرياً",
      features: [
        "منصتان (Instagram + Facebook)",
        "8 منشورات شهرياً (قالب + محتوى العميل)",
        "تصميم بسيط (Canva/مبني على القوالب)",
        "اقتراحات الهاشتاغ وتقويم المحتوى",
        "تقرير الأداء الشهري",
        "حق مراجعة واحد"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro",
      price: "$500",
      period: "شهرياً",
      features: [
        "3-4 منصات (Instagram, Facebook, LinkedIn, خيار TikTok)",
        "12-16 منشوراً شهرياً (نحن ننشئ المحتوى: مرئي + نص)",
        "تصميم احترافي (Photoshop/Illustrator, خاص بالعلامة)",
        "محتوى فيديو بسيط (reels / رسوم متحركة stories)",
        "تخطيط أسبوعي + نشر منتظم",
        "متابعة التعليقات والرسائل (إدارة مجتمعية أساسية)",
        "تقرير شهري مفصل (الوصول، التفاعل، تحليل المتابعين)",
        "حقان للمراجعة"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "$750",
      period: "شهرياً",
      features: [
        "جميع خدمات Pro +",
        "4-5 منصات (Instagram, Facebook, LinkedIn, TikTok, YouTube)",
        "20+ منشوراً شهرياً (صورة + فيديو + تكامل مدونة)",
        "إنتاج فيديو احترافي (1-2 فيديو قصير شهرياً)",
        "اقتراحات التعاون مع المؤثرين",
        "اختبارات A/B (تجارب أداء المحتوى)",
        "تكامل الإعلانات (مزامنة مع حملات Google Ads / Meta Ads)",
        "تقرير أسبوعي + اجتماع استراتيجي شهري",
        "3 حقوق مراجعة"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "إدارة وسائل\nالتواصل الاجتماعي",
    subtitle: "استراتيجية فعالة",
    description: "نحن ننتج محتوى احترافياً على Instagram وFacebook وLinkedIn. نحن نزيد من شهرة علامتك التجارية ونقوي تفاعل العملاء.",
    detailDescription: "إدارة وسائل التواصل الاجتماعي تصبح صوت علامتك التجارية في العالم الرقمي. نحن نمكنك من التواصل بفعالية مع جمهورك المستهدف من خلال التفكير الاستراتيجي. نحن نبرز علامتك التجارية في وسائل التواصل الاجتماعي من خلال إنتاج محتوى احترافي وإدارة المجتمع.",
    icon: "📱",
    serviceType: "sosyal-medya",
    labels: {
      detailsBadge: "تفاصيل الخدمة",
      whyPrefix: "لماذا",
      processBadge: "العملية",
      processHeadingBefore: "كيف",
      processHeadingGradient: "نعمل",
      processSubtitle: "نحن نحيي مشروعك خطوة بخطوة. نحن نبقى على اتصال في كل مرحلة لضمان أفضل نتيجة.",
      timelineAverage: "متوسط الوقت",
      timelineSupport: "الدعم",
      timelineSatisfaction: "الرضا",
      pricingBadge: "التسعير",
      pricingHeadingBefore: "أسعار",
      pricingHeadingGradient: "عادلة",
      pricingSubtitle: "اختر الحزمة المناسبة لمشروعك. نقدم أيضاً عروض أسعار مخصصة للاحتياجات الخاصة.",
      popularBadge: "الأكثر شعبية",
      ctaGetOffer: "احصل على عرض",
      ctaOfferMessageTemplate: "مرحباً! أود الحصول على معلومات حول خطة {planName} لخدمة {serviceTitle}.",
      domainNotice: undefined,
      addOnsBadge: "خدمات إضافية",
      addOnsHeadingBefore: "خدمات",
      addOnsHeadingGradient: "إضافية",
      addOnsSubtitle: "عزز مشروعك بخيارات إضافية. نقدم حلولاً مرنة للاحتياجات الخاصة.",
      ctaGetDetails: "عرض التفاصيل",
      ctaAddOnMessageTemplate: "مرحباً! أود الحصول على معلومات حول الإضافة {addOnName} لخدمة {serviceTitle}.",
      featuresSocialMedia: [
        { title: "إنتاج المحتوى", description: "محتوى إبداعي & جذاب" },
        { title: "التصميم المرئي", description: "المرئيات الاحترافية" },
        { title: "إدارة المجتمع", description: "التفاعل & الإدارة" },
        { title: "التحليل & التقارير", description: "تحليل الأداء المفصل" },
        { title: "تطوير الاستراتيجية", description: "استراتيجية الجمهور المستهدف" },
        { title: "النشر السريع", description: "محتوى منتظم في الوقت المناسب" },
      ],
    },
    features: [
      { title: "إنتاج المحتوى", description: "إبداعي & جذاب", icon: "✨" },
      { title: "التصميم المرئي", description: "مرئيات احترافية", icon: "🎨" },
      { title: "إدارة المجتمع", description: "تفاعل المتابعين", icon: "👥" },
      { title: "التحليل & التقارير", description: "أداء مفصل", icon: "📊" },
    ],
    process: [
      { step: "1", title: "تطوير الاستراتيجية", description: "نحن نحلل الجمهور المستهدف وننشئ استراتيجية وسائل التواصل الاجتماعي." },
      { step: "2", title: "تخطيط المحتوى", description: "نحن نخطط تقويم المحتوى الشهري والمواضيع." },
      { step: "3", title: "إنتاج المحتوى", description: "نحن ننتج وننشر المحتوى المرئي والنصي." },
      { step: "4", title: "المتابعة & التحسين", description: "نحن نتتبع الأداء ونحسن الاستراتيجية باستمرار." },
    ],
    addOnServices: [
      { name: "محتوى إضافي", description: "منشورات إضافية (+4)", price: "$50" },
      { name: "التصوير الفوتوغرافي", description: "جلسة تصوير احترافية", price: "$75" },
      { name: "تعاون المؤثرين", description: "إدارة التعاون", price: "$250" },
      { name: "إدارة الإعلانات", description: "تكامل الإعلانات", price: "$200" },
      { name: "إدارة الحملة", description: "السحب/الحملة", price: "$150" },
      { name: "تحليل المنافسين", description: "تقرير شهري/ربع سنوي", price: "$100" },
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
        <ServiceProcess data={serviceData} duration="1 - 3 أيام" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

