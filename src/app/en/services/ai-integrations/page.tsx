import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "AI Integrations - Softiel",
  description: "We integrate chatbot, machine learning, natural language processing and other AI technologies into your business. We provide automation and efficiency increase.",
}

export const dynamic = 'force-static'

export default function AIIntegrationsPage() {
  const pricing = [
    {
      name: "Starter",
      price: "$1,000",
      period: "from",
      features: [
        "Website or WhatsApp/Telegram chatbot integration",
        "FAQ (frequently asked questions) based response system",
        "Basic NLP (understanding user intent)",
        "Simple dashboard → question-answer records",
        "1 revision right"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro",
      price: "$2,500",
      period: "from",
      features: [
        "Everything in Starter +",
        "CRM/ERP integration (customer info, order status, invoice query)",
        "AI-powered reporting (Excel, Power BI, custom dashboard integration)",
        "Recommendation systems (e.g. product recommendations, upsell/cross-sell)",
        "Multi-language support (EN/TR)",
        "2 revision rights"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "$4,000",
      period: "from",
      features: [
        "Everything in Pro +",
        "Custom AI models (OpenAI, Azure AI, HuggingFace integration)",
        "Voice assistant integration (IVR / Voice bot)",
        "Image processing (product recognition, quality control)",
        "Real-time recommendation engine (ad optimization, sales forecasting)",
        "Security + logging (KVKK/GDPR compliant)",
        "3 revision rights + 6 months SLA support"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "AI\nIntegrations",
    subtitle: "Future Technology Today",
    description: "We integrate chatbot, machine learning, natural language processing and other AI technologies into your business. We provide automation and efficiency increase.",
    detailDescription: "AI integrations take your business to the future. We offer smart solutions that optimize your business processes. We increase your efficiency with a comprehensive AI ecosystem from chatbots to machine learning.",
    icon: "🤖",
    serviceType: "yapay-zeka",
    labels: {
      detailsBadge: "Service Details",
      whyPrefix: "Why",
      processBadge: "Process",
      processHeadingBefore: "How",
      processHeadingGradient: "We Work",
      processSubtitle: "We bring your project to life step by step. We stay in touch at every stage to ensure the best outcome.",
      timelineAverage: "Average Time",
      timelineSupport: "Support",
      timelineSatisfaction: "Satisfaction",
      pricingBadge: "Pricing",
      pricingHeadingBefore: "Fair",
      pricingHeadingGradient: "Prices",
      pricingSubtitle: "Choose the right package for your project. We also provide tailored quotes for special needs.",
      popularBadge: "Most Popular",
      ctaGetOffer: "Get Quote",
      ctaOfferMessageTemplate: "Hello! I would like to get information about the {planName} plan for the {serviceTitle} service.",
      domainNotice: undefined,
      addOnsBadge: "Add-on Services",
      addOnsHeadingBefore: "Add-on",
      addOnsHeadingGradient: "Services",
      addOnsSubtitle: "Enhance your project with optional add-ons. We offer flexible solutions for special needs.",
      ctaGetDetails: "View Details",
      ctaAddOnMessageTemplate: "Hello! I would like to get information about the {addOnName} add-on for the {serviceTitle} service.",
      featuresAI: [
        { title: "Chatbot Development", description: "Smart customer service" },
        { title: "Machine Learning", description: "Data analysis & prediction" },
        { title: "Natural Language Processing", description: "Text analysis & understanding" },
        { title: "Business Process Automation", description: "Automate routine tasks" },
        { title: "Image Processing", description: "Visual analysis & recognition" },
        { title: "Real-time Analysis", description: "Instant data processing" },
      ],
    },
    features: [
      { title: "Chatbot Development", description: "Smart customer service", icon: "💬" },
      { title: "Machine Learning", description: "Data analysis and prediction", icon: "🧠" },
      { title: "Natural Language Processing", description: "Text analysis and understanding", icon: "📝" },
      { title: "Business Process Automation", description: "Automate routine tasks", icon: "⚙️" },
    ],
    process: [
      { step: "1", title: "Needs Analysis", description: "We identify processes that require AI solutions." },
      { step: "2", title: "Model Selection", description: "We select the most suitable AI model and technology." },
      { step: "3", title: "Development & Training", description: "We develop and train the AI system." },
      { step: "4", title: "Integration & Testing", description: "We integrate into existing systems and test." },
    ],
    addOnServices: [
      { name: "Language Support", description: "English + German etc.", price: "$100" },
      { name: "Custom Model Training", description: "Fine-tuning with customer emails", price: "$350" },
      { name: "AI Content Generation", description: "Blog, social media, product description", price: "$400" },
      { name: "Image Processing Module", description: "Product images, quality control", price: "$900" },
      { name: "Voice Assistant Module", description: "Call center integration", price: "$1,000" },
      { name: "User Training", description: "AI usage training for your team", price: "$200" },
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
        <ServiceProcess data={serviceData} duration="2 - 4 Weeks" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

