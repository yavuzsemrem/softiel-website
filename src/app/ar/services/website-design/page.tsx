import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

// Static generation için metadata
export const metadata = {
  title: "تصميم المواقع - Softiel",
  description: "تصميم مواقع حديث ومتجاوب. مظهر احترافي، تحميل سريع وخدمات تصميم مواقع متوافقة مع تحسين محركات البحث.",
}

// Static generation - sayfa önceden oluşturulsun
export const dynamic = 'force-static'

export default function WebsiteDesignPage() {
  const serviceData = {
    title: "تصميم المواقع",
    subtitle: "تصاميم ويب حديثة ومؤثرة",
    description: "تميز في العالم الرقمي مع مواقع ويب احترافية. قدم أفضل تجربة مع تصميم متجاوب، تحميل سريع وبنية متوافقة مع تحسين محركات البحث.",
    detailDescription: "الموقع الإلكتروني لم يعد مجرد مسألة مشاركة المعلومات، لقد أصبح الوجه الرقمي لعلامتك التجارية. التصميم الصحيح وتجربة المستخدم يؤثران على عملائك ويزيدان من مصداقية أعمالك.",
    serviceType: "web-tasarimi",
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
      pricingSubtitle: "أنجز مشروعك مع باقات تناسب كل الميزانيات. نقدم تسعيراً مخصصاً لاحتياجاتك.",
      popularBadge: "الأكثر شيوعًا",
      ctaGetOffer: "احصل على عرض",
      ctaOfferMessageTemplate: "مرحبًا! أود الحصول على معلومات حول باقة {planName} لخدمة {serviceTitle}.",
      domainNotice: "النطاق + SSL + رسوم الاستضافة غير مشمولة",
      addOnsBadge: "خدمات إضافية",
      addOnsHeadingBefore: "خدمات",
      addOnsHeadingGradient: "إضافية",
      addOnsSubtitle: "عزّز مشروعك بخيارات إضافية. نقدّم حلولاً مرنة لاحتياجاتك الخاصة.",
      ctaGetDetails: "عرض التفاصيل",
      ctaAddOnMessageTemplate: "مرحبًا! أود الحصول على معلومات حول الخدمة الإضافية {addOnName} لخدمة {serviceTitle}.",
      featuresWebDesign: [
        { title: "تصميم حديث", description: "تصاميم ويب عصرية وذات جاذبية بصرية" },
        { title: "تخطيط متجاوب", description: "توافق مثالي على جميع الأجهزة" },
        { title: "تحميل سريع", description: "أداء عالٍ مع كود وصور محسّنة" },
        { title: "متوافق مع SEO", description: "كود نظيف ومحسَّن لمحركات البحث" },
        { title: "الأمان", description: "إجراءات قوية وحماية مؤمّنة عبر SSL" },
        { title: "تحسين للهاتف", description: "تحسين وتصميم مخصص لأجهزة المحمول" },
      ],
    },
    features: [
      {
        title: "مباشر خلال 7-14 يوم",
        description: "ضمان التسليم السريع"
      },
      {
        title: "متوافق مع الهواتف & سريع",
        description: "تصميم موجه نحو الأداء"
      },
      {
        title: "البنية التحتية لـ SEO جاهزة",
        description: "محسن لمحركات البحث"
      },
      {
        title: "حقوق المراجعة",
        description: "ضمان رضا العملاء"
      }
    ],
    process: [
      {
        step: "1",
        title: "التحليل والتخطيط",
        description: "نحلل احتياجاتك، نحدد الجمهور المستهدف ونطور استراتيجية."
      },
      {
        step: "2",
        title: "التصميم والنماذج الأولية",
        description: "ننشئ wireframes وmockups بمبادئ التصميم الحديثة."
      },
      {
        step: "3",
        title: "التطوير",
        description: "نبرمج الموقع الإلكتروني المتجاوب والسريع التحميل."
      },
      {
        step: "4",
        title: "الاختبار والإطلاق",
        description: "نجري اختبارات شاملة ونطلق الموقع."
      }
    ],
    pricing: [
      {
        name: "أساسي",
        price: "$1,000",
        period: "بدءًا من",
        features: [
          "5-7 صفحات (الرئيسية، من نحن، الخدمات، الاتصال، إلخ.)",
          "متجاوب (متوافق مع الهواتف)",
          "SEO أساسي (meta، خريطة الموقع، robots.txt)",
          "نموذج اتصال واحد + تكامل خرائط Google",
          "جولة مراجعة واحدة",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "احترافي",
        price: "$2,500",
        period: "بدءًا من",
        features: [
          "8-12 صفحة",
          "تصميم صفحة رئيسية مخصص",
          "بنية المدونة",
          "جولتي مراجعة",
          "جاهز للغات المتعددة (اختياري)",
          "تحسين سرعة متقدم (WebP، تحميل كسول، تحميل مسبق للخطوط)",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "مؤسسي",
        price: "$4,000",
        period: "بدءًا من",
        features: [
          "12+ صفحة",
          "دعم لغات متعددة",
          "نظام إدارة المحتوى (WordPress، Headless CMS، إلخ.)",
          "تكاملات مخصصة (CRM، الدفع، API)",
          "3 جولات مراجعة",
          "معايير إمكانية الوصول (امتثال WCAG)",
          "3 أشهر صيانة ودعم مجاني",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      {
        name: "صفحة إضافية",
        description: "تصميم وتطوير صفحة إضافية",
        price: "$100"
      },
      {
        name: "دعم لغات متعددة",
        description: "دعم اللغات المتعددة للموقع",
        price: "$150"
      },
      {
        name: "كتابة المحتوى",
        description: "كتابة محتوى احترافية للصفحات",
        price: "$50"
      },
      {
        name: "تصميم الشعار / تحديث",
        description: "تصميم أو تحديث الشعار",
        price: "$100"
      },
      {
        name: "تحسين السرعة",
        description: "تحسين سرعة الموقع",
        price: "$200"
      },
      {
        name: "الصيانة الشهرية",
        description: "صيانة وتحديثات الموقع",
        price: "$50/شهر"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black dark:from-slate-800 dark:via-slate-900 dark:via-slate-950 dark:via-black dark:to-black">
      <Header />
      <main className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-200 dark:bg-cyan-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-200 dark:bg-sky-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <ServiceHero data={serviceData} />
        <ServiceDetails data={serviceData} />
        <ServiceProcess data={serviceData} duration="7 - 14 يوم" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
