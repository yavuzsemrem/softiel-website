import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Social Media Management - Softiel",
  description: "Professional social media management services on Instagram, Facebook, LinkedIn platforms. We increase your brand awareness and strengthen customer engagement.",
}

export const dynamic = 'force-static'

export default function SocialMediaManagementPage() {
  const pricing = [
    {
      name: "Starter",
      price: "$300",
      period: "monthly",
      features: [
        "2 platforms (Instagram + Facebook)",
        "8 posts per month (template + client content)",
        "Basic design (Canva/template-based)",
        "Hashtag and content calendar suggestions",
        "Monthly performance report",
        "1 revision right"
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
        "3-4 platforms (Instagram, Facebook, LinkedIn, TikTok option)",
        "12-16 posts per month (we create content: visual + text)",
        "Professional design (Photoshop/Illustrator, brand-specific)",
        "Simple video content (reels / story animations)",
        "Weekly planning + regular publishing",
        "Comment and message monitoring (basic community management)",
        "Monthly detailed report (reach, engagement, follower analysis)",
        "2 revision rights"
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
        "All Pro services +",
        "4-5 platforms (Instagram, Facebook, LinkedIn, TikTok, YouTube)",
        "20+ posts per month (photo + video + blog integration)",
        "Professional video production (1-2 short videos per month)",
        "Influencer collaboration suggestions",
        "A/B tests (content performance trials)",
        "Ad integration (sync with Google Ads / Meta Ads campaigns)",
        "Weekly report + monthly strategy meeting",
        "3 revision rights"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "Social Media\nManagement",
    subtitle: "Effective Social Media Strategy",
    description: "We produce professional content on Instagram, Facebook, LinkedIn platforms. We increase your brand awareness and strengthen customer engagement.",
    detailDescription: "Social media management becomes your brand's voice in the digital world. We enable you to communicate effectively with your target audience by thinking strategically. We make your brand stand out on social media with professional content production and community management.",
    icon: "📱",
    serviceType: "sosyal-medya",
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
      featuresSocialMedia: [
        { title: "Content Production", description: "Creative and engaging content" },
        { title: "Visual Design", description: "Professional social media visuals" },
        { title: "Community Management", description: "Follower engagement & management" },
        { title: "Analytics & Reporting", description: "Detailed performance analysis" },
        { title: "Strategy Development", description: "Target audience strategy" },
        { title: "Fast Publishing", description: "Regular timely content" },
      ],
    },
    features: [
      { title: "Content Production", description: "Creative and engaging", icon: "✨" },
      { title: "Visual Design", description: "Professional visuals", icon: "🎨" },
      { title: "Community Management", description: "Follower engagement", icon: "👥" },
      { title: "Analytics & Reporting", description: "Detailed performance", icon: "📊" },
    ],
    process: [
      { step: "1", title: "Strategy Development", description: "We analyze target audience and create social media strategy." },
      { step: "2", title: "Content Planning", description: "We plan monthly content calendar and themes." },
      { step: "3", title: "Content Production", description: "We produce and publish visual and text content." },
      { step: "4", title: "Monitoring & Optimization", description: "We track performance and continuously improve strategy." },
    ],
    addOnServices: [
      { name: "Additional Content", description: "Extra posts (+4 posts)", price: "$50" },
      { name: "Professional Photography", description: "Professional photo shoot", price: "$75" },
      { name: "Influencer Collaboration", description: "Influencer collaboration management", price: "$250" },
      { name: "Ad Management", description: "Ads integration", price: "$200" },
      { name: "Campaign Management", description: "Giveaway/campaign management", price: "$150" },
      { name: "Competitor Analysis", description: "Monthly/quarterly report", price: "$100" },
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
        <ServiceProcess data={serviceData} duration="1 - 3 Days" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

