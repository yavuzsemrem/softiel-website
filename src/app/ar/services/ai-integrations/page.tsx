import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "تكاملات الذكاء الاصطناعي - Softiel",
  description: "نحن ندمج الدردشة الآلية، التعلم الآلي، معالجة اللغة الطبيعية وتقنيات الذكاء الاصطناعي الأخرى في عملك. نقدم الأتمتة وزيادة الكفاءة.",
}

export const dynamic = 'force-static'

export default function AIIntegrationsPage() {
  const pricing = [
    {
      name: "Starter",
      price: "$1,000",
      period: "ابتداءً من",
      features: [
        "تكامل الدردشة الآلية على الموقع أو WhatsApp/Telegram",
        "نظام ردود مبني على الأسئلة الشائعة (FAQ)",
        "معالجة اللغة الطبيعية الأساسية (فهم نية المستخدم)",
        "لوحة تحكم بسيطة → سجلات سؤال-جواب",
        "حق مراجعة واحد"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro",
      price: "$2,500",
      period: "ابتداءً من",
      features: [
        "كل ما في Starter +",
        "تكامل CRM/ERP (معلومات العميل، حالة الطلب، استعلام الفواتير)",
        "التقارير المدعومة بالذكاء الاصطناعي (Excel, Power BI, تكامل لوحة التحكم المخصصة)",
        "أنظمة التوصية (مثل توصيات المنتجات، البيع الإضافي/المتقاطع)",
        "دعم متعدد اللغات (AR/TR)",
        "حقان للمراجعة"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "$4,000",
      period: "ابتداءً من",
      features: [
        "كل ما في Pro +",
        "نماذج الذكاء الاصطناعي المخصصة (تكامل OpenAI, Azure AI, HuggingFace)",
        "تكامل المساعد الصوتي (IVR / Voice bot)",
        "معالجة الصور (التعرف على المنتجات، التحكم في الجودة)",
        "محرك التوصية في الوقت الفعلي (تحسين الإعلانات، التنبؤ بالمبيعات)",
        "الأمان + التسجيل (متوافق مع KVKK/GDPR)",
        "3 حقوق مراجعة + دعم SLA لمدة 6 أشهر"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "تكاملات الذكاء\nالاصطناعي",
    subtitle: "تقنية المستقبل اليوم",
    description: "نحن ندمج الدردشة الآلية، التعلم الآلي، معالجة اللغة الطبيعية وتقنيات الذكاء الاصطناعي الأخرى في عملك. نقدم الأتمتة وزيادة الكفاءة.",
    detailDescription: "تكاملات الذكاء الاصطناعي تنقل عملك إلى المستقبل. نقدم حلولاً ذكية تحسن عمليات عملك. نزيد كفاءتك من خلال نظام بيئي شامل للذكاء الاصطناعي من الدردشات الآلية إلى التعلم الآلي.",
    icon: "🤖",
    serviceType: "yapay-zeka",
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
      featuresAI: [
        { title: "تطوير الدردشة", description: "خدمة عملاء ذكية" },
        { title: "التعلم الآلي", description: "تحليل البيانات & التنبؤ" },
        { title: "معالجة اللغة الطبيعية", description: "تحليل النص & الفهم" },
        { title: "أتمتة العمليات", description: "أتمتة المهام الروتينية" },
        { title: "معالجة الصور", description: "التحليل البصري & التعرف" },
        { title: "التحليل في الوقت الفعلي", description: "معالجة البيانات الفورية" },
      ],
    },
    features: [
      { title: "تطوير الدردشة", description: "خدمة عملاء ذكية", icon: "💬" },
      { title: "التعلم الآلي", description: "تحليل البيانات والتنبؤ", icon: "🧠" },
      { title: "معالجة اللغة الطبيعية", description: "تحليل النص والفهم", icon: "📝" },
      { title: "أتمتة العمليات", description: "أتمتة المهام الروتينية", icon: "⚙️" },
    ],
    process: [
      { step: "1", title: "تحليل الاحتياجات", description: "نحدد العمليات التي تتطلب حلول الذكاء الاصطناعي." },
      { step: "2", title: "اختيار النموذج", description: "نختار نموذج الذكاء الاصطناعي والتقنية الأنسب." },
      { step: "3", title: "التطوير & التدريب", description: "نطور وندرب نظام الذكاء الاصطناعي." },
      { step: "4", title: "التكامل & الاختبار", description: "ندمج في الأنظمة الموجودة ونتحقق." },
    ],
    addOnServices: [
      { name: "دعم لغة إضافية", description: "الإنجليزية + الألمانية إلخ.", price: "$100" },
      { name: "تدريب نموذج بيانات مخصص", description: "Fine-tuning مع رسائل البريد الإلكتروني للعملاء", price: "$350" },
      { name: "محتوى ذكي", description: "مدونة، وسائل التواصل، وصف المنتج", price: "$400" },
      { name: "وحدة معالجة الصور", description: "صور المنتجات، التحكم في الجودة", price: "$900" },
      { name: "وحدة المساعد الصوتي", description: "تكامل مركز الاتصال", price: "$1,000" },
      { name: "تدريب المستخدمين", description: "تدريب استخدام الذكاء الاصطناعي لفريقك", price: "$200" },
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
        <ServiceProcess data={serviceData} duration="2 - 4 أسابيع" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

