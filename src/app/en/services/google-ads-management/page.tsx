import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Google Ads Management - Softiel",
  description: "Effective ad campaign management on Google Ads and Meta Ads platforms. Achieve high conversion rates with low cost.",
}

export const dynamic = 'force-static'

export default function GoogleAdsManagementPage() {
  const serviceData = {
    title: "Google Ads\nManagement",
    subtitle: "Targeted Ad Campaigns",
    description: "We manage effective ad campaigns on Google Ads and Meta Ads platforms. We help you achieve high conversion rates with low cost.",
    detailDescription: "Online advertising is now vital for businesses. With the right platform strategy and campaign management, you can directly reach your customers and increase your sales.",
    icon: "📢",
    serviceType: "google-ads",
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
      featuresGoogleAds: [
        { title: "Targeted Advertising", description: "Reach the right audience with precise targeting" },
        { title: "ROI-Focused Strategies", description: "High return from every campaign launched" },
        { title: "Real-time Optimization", description: "7/24 campaign performance tracking and improvement" },
        { title: "Multi-Platform Management", description: "Google Ads, Meta Ads and LinkedIn under one roof" },
        { title: "Fast Campaign Setup", description: "Active campaigns within 24 hours" },
        { title: "Detailed Performance Analysis", description: "Campaign results with monthly reports" },
      ],
    },
    features: [
      { title: "Targeted Campaigns", description: "Reach the right customers", icon: "🎯" },
      { title: "ROI Increase Guarantee", description: "Guaranteed return on your investment", icon: "💰" },
      { title: "Real-time Optimization", description: "7/24 campaign tracking", icon: "⚡" },
      { title: "Professional Design", description: "Including ad visuals", icon: "🎨" },
    ],
    process: [
      { step: "1", title: "Target Audience Analysis", description: "We analyze your target audience and determine the most effective channels." },
      { step: "2", title: "Campaign Design", description: "We create ad copy, visuals and targeting strategy." },
      { step: "3", title: "Optimization", description: "We continuously optimize campaigns and improve performance." },
      { step: "4", title: "Reporting", description: "We track results with detailed performance reports." },
    ],
    pricing: [
      {
        name: "Starter (Basic Management)",
        price: "$300",
        period: "month",
        features: [
          "Google Ads or Meta Ads (single channel)",
          "Campaign setup (Search/Display/Instagram-Facebook)",
          "Targeting settings (location, demographics, keywords)",
          "Basic ad copy + visuals (if provided by client)",
          "Monthly 1 report (basic performance)",
          "1 revision / change",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (Optimized Management)",
        price: "$500",
        period: "month",
        features: [
          "Google Ads + Meta Ads (2 channels managed together)",
          "2-3 campaigns (search + remarketing + social media)",
          "Ad copy + visual design (from us)",
          "A/B tests (headlines, CTA)",
          "Weekly optimization (budget, targeting)",
          "Monthly detailed report (CTR, conversion, cost analysis)",
          "2 revisions / changes",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (Strategic Management)",
        price: "$750",
        period: "month",
        features: [
          "Multi-channel management (Google Ads + Meta + LinkedIn)",
          "5+ campaigns (search, display, remarketing, video, lead ads)",
          "Professional ad designs (including visuals + videos)",
          "Conversion funnel planning (including landing page optimization)",
          "Weekly reporting + monthly strategy meeting",
          "Monthly A/B tests and continuous optimization",
          "Suitable for projects with ad budget above $2,000",
          "3 revisions / changes",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Extra Channel", description: "LinkedIn/TikTok/Twitter – channel", price: "$100/month" },
      { name: "Professional Visual Design", description: "Banner, social post – per piece", price: "$50" },
      { name: "Video Ad Production", description: "YouTube/Reels/TikTok – video", price: "$75" },
      { name: "Landing Page Design", description: "Conversion-focused – per page", price: "$300" },
      { name: "Funnel Consulting", description: "CRM integration, lead tracking", price: "$150" },
      { name: "Competitor Analysis", description: "One-time", price: "$75" },
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
