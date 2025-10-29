import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "حلول WordPress - Softiel",
  description: "تركيب WordPress احترافي وتطوير القوالب وحلول CMS. خدمات WordPress للتجارة الإلكترونية والمواقع المؤسسية والمشاريع المخصصة.",
}

export const dynamic = 'force-static'

export default function WordPressSolutionsArPage() {
  const serviceData = {
    title: "حلول\nWordPress",
    subtitle: "مواقع قابلة للإدارة بسهولة",
    description: "ننشئ مواقع احترافية على WordPress ومنصات CMS أخرى. نقدّم إدارة محتوى سهلة وحلولاً آمنة وسريعة.",
    detailDescription: "بفضل البنية المرنة لـ WordPress، يمكننا إنشاء أي نوع من المواقع بسرعة وفعالية من حيث التكلفة، من المدونات الصغيرة إلى منصات التجارة الإلكترونية المؤسسية الكبيرة. نقدّم لعملائنا حرية غير محدودة في إدارة المحتوى.",
    icon: "🔧",
    serviceType: "wordpress",
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
      featuresWordPress: [
        { title: "إدارة محتوى سهلة", description: "إضافة وتعديل محتوى سهل باستخدام محرر السحب والإفلات" },
        { title: "نظام إضافات غني", description: "تخصيص غير محدود مع أكثر من 50,000 إضافة مجانية ومدفوعة" },
        { title: "إجراءات أمان حالية", description: "الحماية مع Wordfence و2FA وإضافات الأمان" },
        { title: "بنية جاهزة لـ SEO", description: "تحسين محركات البحث مع Yoast SEO وRankMath" },
        { title: "دعم متعدد اللغات", description: "دعم مواقع متعددة اللغات مع WPML وPolylang" },
        { title: "تحسين التخزين المؤقت والسرعة", description: "أداء عالٍ مع LiteSpeed Cache وتكامل CDN" },
      ],
    },
    features: [
      { title: "إدارة سهلة", description: "محرر السحب والإفلات", icon: "🎛️" },
      { title: "تكامل الإضافات", description: "إضافات مخصصة حسب الحاجة", icon: "🔌" },
      { title: "الأمان", description: "إجراءات أمان محدّثة", icon: "🔒" },
      { title: "SEO جاهز", description: "تحسين SEO مشمول", icon: "🔍" },
    ],
    process: [
      { step: "1", title: "تحليل الاحتياجات", description: "نحلّل متطلبات المشروع ونختار CMS الأنسب." },
      { step: "2", title: "اختيار القالب والإضافات", description: "نحدّد القوالب والإضافات المناسبة للاحتياجات." },
      { step: "3", title: "التخصيص", description: "نخصص التصاميم والوظائف." },
      { step: "4", title: "التدريب والتسليم", description: "نقدّم تدريبًا على الاستخدام ونسلّم المشروع." },
    ],
    pricing: [
      {
        name: "Starter (موقع مؤسسي)",
        price: "$750",
        period: "بدءًا من",
        features: [
          "تركيب WordPress + تكييف قالب جاهز",
          "5–7 صفحات (من نحن، الخدمات، الاتصال، إلخ)",
          "متجاوب (متوافق مع الهواتف)",
          "إضافات SEO أساسية (Yoast / RankMath)",
          "جولة مراجعة واحدة",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (التجارة الإلكترونية / WooCommerce)",
        price: "$2,000",
        period: "بدءًا من",
        features: [
          "كل شيء في Starter +",
          "تركيب WooCommerce",
          "رفع منتجات حتى 10 منتجات (المزيد هو عميل أو خدمة إضافية)",
          "تكامل نظام دفع أساسي (PayPal وIyzico إلخ)",
          "تكامل وحدات الشحن",
          "جولتا مراجعة",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (CMS مؤسسي / منصة محتوى)",
        price: "$3,500",
        period: "بدءًا من",
        features: [
          "كل شيء في Pro +",
          "تطوير قالب مخصص أو child theme",
          "دعم لغات متعددة (Polylang وWPML)",
          "أمان متقدم (Wordfence / 2FA)",
          "تخزين مؤقت متقدم + تحسين السرعة (LiteSpeed وCDN)",
          "أدوار مستخدمين لفرق المحتوى",
          "3 جولات مراجعة",
          "دعم صيانة 3 أشهر",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "رفع منتجات إضافي", description: "رفع منتجات إضافي وتحسين", price: "$20" },
      { name: "إعداد لغات متعددة", description: "حزمة إعداد لغات متعددة", price: "$150" },
      { name: "تطوير إضافة مخصصة", description: "حزمة تطوير إضافة مخصصة", price: "$300" },
      { name: "تحسين SEO", description: "حزمة تحسين SEO", price: "$150" },
      { name: "تعزيز سرعة الموقع", description: "حزمة تعزيز سرعة الموقع", price: "$75" },
      { name: "صيانة وتحديث شهري", description: "حزمة صيانة وتحديث شهرية", price: "$50/شهر" },
      { name: "تصميم شعار / تحديث", description: "تصميم شعار أو تحديث شعار موجود", price: "$100" },
      { name: "صفحة إضافية", description: "تصميم وتطوير صفحة إضافية", price: "$100" },
      { name: "كتابة المحتوى", description: "كتابة نصوص صفحات احترافية", price: "$50" },
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
        <ServiceProcess data={serviceData} duration="7 - 14 أيام" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
