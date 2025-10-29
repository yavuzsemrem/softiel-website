import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "SEO Optimization - Softiel",
  description: "Search engine optimization services to rank higher on Google and increase organic traffic.",
}

export const dynamic = 'force-static'

export default function SEOOptimizationPage() {
  const serviceData = {
    title: "SEO\nOptimization",
    subtitle: "Rank Higher on Google",
    description: "We optimize your website to rank higher in search engines. We provide organic traffic growth and customer acquisition.",
    detailDescription: "SEO is no longer just about keyword density, it's a user experience-focused strategy. With the right approach, we meet both Google's algorithms and customer needs.",
    icon: "🔍",
    serviceType: "seo",
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
      domainNotice: "Domain + SSL + hosting fees are not included",
      addOnsBadge: "Add-on Services",
      addOnsHeadingBefore: "Add-on",
      addOnsHeadingGradient: "Services",
      addOnsSubtitle: "Enhance your project with optional add-ons. We offer flexible solutions for special needs.",
      ctaGetDetails: "View Details",
      ctaAddOnMessageTemplate: "Hello! I would like to get information about the {addOnName} add-on for the {serviceTitle} service.",
      featuresSEO: [
        { title: "Keyword Research", description: "Target audience-focused keyword analysis and strategy" },
        { title: "Technical SEO", description: "Site speed, mobile compatibility and indexing optimization" },
        { title: "Content Optimization", description: "SEO-friendly content production and meta optimization" },
        { title: "Analytics & Tracking", description: "Google Analytics and Search Console integration" },
        { title: "Backlink Strategy", description: "Authority-building and organic link profile development" },
        { title: "Performance Report", description: "Monthly detailed SEO performance reports" },
      ],
    },
    features: [
      { title: "Google Rank Increase", description: "We provide first page visibility", icon: "🚀" },
      { title: "Organic Traffic Gain", description: "Quality visitor increase", icon: "📈" },
      { title: "Competitor Analysis", description: "We stand out in the market", icon: "🎯" },
      { title: "ROI-Focused Results", description: "Guaranteed return on investment", icon: "💰" },
    ],
    process: [
      { step: "1", title: "SEO Audit", description: "We analyze the current situation and identify improvement areas." },
      { step: "2", title: "Strategy Development", description: "We create keyword strategy and content plan." },
      { step: "3", title: "Optimization", description: "We apply technical and content optimizations." },
      { step: "4", title: "Tracking & Reporting", description: "We track performance and provide regular reports." },
    ],
    pricing: [
      {
        name: "Starter (Technical SEO)",
        price: "$300",
        period: "month",
        features: [
          "Audit",
          "Analytics/Console setup",
          "Meta/URL optimization",
          "Sitemap",
          "Lighthouse reports",
          "Monthly report",
          "1 revision",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (Growth SEO)",
        price: "$500",
        period: "month",
        features: [
          "Starter + keyword research",
          "Content optimization",
          "Blog plan",
          "Link building",
          "Image SEO",
          "Detailed report",
          "2 revisions",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (Aggressive SEO)",
        price: "$750",
        period: "month",
        features: [
          "Pro + more keywords/content",
          "Backlink strategy",
          "Competitor analysis",
          "Local SEO",
          "360° management",
          "Monthly meeting",
          "3 revisions",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Extra Keywords", description: "Per 5 keywords", price: "$20" },
      { name: "Extra Content Writing", description: "700-1000 words, per article", price: "$50" },
      { name: "Backlink Packages", description: "5-10 quality links", price: "$100" },
      { name: "SEO Image", description: "Per piece", price: "$25" },
      { name: "Competitor Report", description: "Monthly", price: "$100/month" },
      { name: "Competitor Report", description: "Quarterly", price: "$200/quarter" },
      { name: "Landing SEO", description: "Per page", price: "$75" },
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
        <ServiceProcess data={serviceData} duration="1 - 5 Days" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
