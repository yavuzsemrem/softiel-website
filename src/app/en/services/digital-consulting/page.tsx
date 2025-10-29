import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Digital Consulting - Softiel",
  description: "We guide your digital transformation with strategy, technology selection and measurable execution.",
}

export const dynamic = 'force-static'

export default function DigitalConsultingPage() {
  const pricing = [
    {
      name: "Starter",
      price: "$300",
      period: "from",
      features: [
        "One-time digital audit (website, social, SEO, ads)",
        "SWOT analysis (strengths, weaknesses, opportunities, threats)",
        "Core improvement suggestions",
        "Simple roadmap (3–6 months)",
        "1 revision"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro",
      price: "$500",
      period: "monthly",
      features: [
        "Everything in Starter +",
        "2 monthly meetings (Zoom/Meet)",
        "Ongoing guidance for Ads, SEO, social",
        "KPIs and performance tracking",
        "Competitor analysis (quarterly report)",
        "2 revisions"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "$750",
      period: "monthly",
      features: [
        "Everything in Pro +",
        "Weekly/monthly consulting sessions",
        "Digital transformation roadmap (1-year plan)",
        "Technology selection (ERP, CRM, e-commerce)",
        "Team training sessions",
        "Reporting & strategy updates",
        "3 revisions + SLA 6 months"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "Digital\nConsulting",
    subtitle: "Guiding Digital Transformation",
    description: "We guide your digital transformation. We provide expert consulting in strategy development and technology selection.",
    detailDescription: "We analyze your current state and define the clearest path to your goals with measurable steps.",
    icon: "💡",
    serviceType: "danismanlik",
    labels: {
      detailsBadge: "Service Details",
      whyPrefix: "Why",
      processBadge: "Process",
      processHeadingBefore: "How",
      processHeadingGradient: "We Work",
      processSubtitle: "Step-by-step execution with measurable KPIs and continuous guidance.",
      timelineAverage: "Average Time",
      timelineSupport: "Support",
      timelineSatisfaction: "Satisfaction",
      pricingBadge: "Pricing",
      pricingHeadingBefore: "Fair",
      pricingHeadingGradient: "Prices",
      pricingSubtitle: "Choose the right plan. Custom quotes available.",
      popularBadge: "Most Popular",
      ctaGetOffer: "Get Quote",
      ctaOfferMessageTemplate: "Hello! I would like to get information about the {planName} plan for the {serviceTitle} service.",
      domainNotice: undefined,
      addOnsBadge: "Add-on Services",
      addOnsHeadingBefore: "Add-on",
      addOnsHeadingGradient: "Services",
      addOnsSubtitle: "Boost your results with optional add-ons.",
      ctaGetDetails: "View Details",
      ctaAddOnMessageTemplate: "Hello! I would like to get information about the {addOnName} add-on for the {serviceTitle} service.",
      featuresConsulting: [
        { title: "Strategy Development", description: "Digital roadmap" },
        { title: "Technology Selection", description: "Right tools & platforms" },
        { title: "Process Improvement", description: "Optimize operations" },
        { title: "Training & Mentoring", description: "Team enablement" },
        { title: "Analytics & Reporting", description: "KPIs & insights" },
        { title: "Competitor Analysis", description: "Market position" },
      ],
    },
    features: [
      { title: "Strategy Development", description: "Clear transformation plan", icon: "🎯" },
      { title: "Technology Selection", description: "Right platforms", icon: "🔧" },
      { title: "Process Improvement", description: "Efficiency", icon: "📈" },
      { title: "Training & Mentoring", description: "Enable teams", icon: "👨‍🏫" },
    ],
    process: [
      { step: "1", title: "Current State Analysis", description: "We analyze your digital presence." },
      { step: "2", title: "Goal Setting", description: "We define measurable goals." },
      { step: "3", title: "Roadmap", description: "We create an actionable plan." },
      { step: "4", title: "Implementation Support", description: "We guide your execution." },
    ],
    addOnServices: [
      { name: "Extra Meeting", description: "Outside monthly package", price: "$50" },
      { name: "Training Module", description: "SEO/social/digital marketing", price: "$150" },
      { name: "Technology Selection", description: "ERP/CRM/e-commerce", price: "$200" },
      { name: "Competitor Analysis", description: "In-depth report", price: "$200" },
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
        <ServiceProcess data={serviceData} duration="1 - 2 Weeks" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


