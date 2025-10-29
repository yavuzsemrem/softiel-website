import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Logo & Corporate Identity Design - Softiel",
  description: "Custom logo design, brand identity, typography and brandbook guide for a consistent corporate identity.",
}

export const dynamic = 'force-static'

export default function LogoCorporateIdentityPage() {
  const serviceData = {
    title: "Logo &\nCorporate Identity",
    subtitle: "Strong and Consistent Brand",
    description: "We position your brand professionally with custom logo, color palette, typography and brandbook guide.",
    detailDescription: "A consistent identity builds trust and recall. We deliver a scalable, coherent brand language across all touchpoints.",
    icon: "🎨",
    serviceType: "logo-kimlik",
    labels: {
      detailsBadge: "Service Details",
      whyPrefix: "Why",
      processBadge: "Process",
      processHeadingBefore: "How",
      processHeadingGradient: "We Work",
      processSubtitle: "We start with discovery, refine with revisions, and deliver with a brandbook.",
      timelineAverage: "Average Time",
      timelineSupport: "Support",
      timelineSatisfaction: "Satisfaction",
      pricingBadge: "Pricing",
      pricingHeadingBefore: "Fair",
      pricingHeadingGradient: "Prices",
      pricingSubtitle: "Pick the package that fits. Custom quotes available.",
      popularBadge: "Most Popular",
      ctaGetOffer: "Get Quote",
      ctaOfferMessageTemplate: "Hello! I'd like details about the {planName} plan for {serviceTitle}.",
      addOnsBadge: "Add-on Services",
      addOnsHeadingBefore: "Add-on",
      addOnsHeadingGradient: "Services",
      addOnsSubtitle: "Enhance your brand with optional add-ons.",
      ctaGetDetails: "View Details",
      ctaAddOnMessageTemplate: "Hello! I'd like details about the {addOnName} add-on for {serviceTitle}.",
      featuresLogoIdentity: [
        { title: "Custom Logo Design", description: "Impactful & memorable" },
        { title: "Brand Identity", description: "Colors & typography" },
        { title: "Brandbook Guide", description: "Clear usage rules" },
        { title: "Multi-format Delivery", description: "PNG, SVG, PDF" },
        { title: "Revision Rights", description: "Satisfaction first" },
        { title: "Fast Delivery", description: "Planned process" },
      ],
    },
    features: [
      { title: "Custom Logo Design", description: "Unique & professional", icon: "🎯" },
      { title: "Brand Identity", description: "Consistent look", icon: "🎨" },
      { title: "Typography", description: "Readable & aligned", icon: "🔤" },
      { title: "Brandbook Guide", description: "Usage standards", icon: "📘" },
    ],
    process: [
      { step: "1", title: "Discovery & Brief", description: "Needs & competitor scan" },
      { step: "2", title: "Sketch & Direction", description: "Design directions & feedback" },
      { step: "3", title: "Revisions", description: "Refine the selected route" },
      { step: "4", title: "Delivery", description: "Brandbook and files" },
    ],
    pricing: [
      { name: "Starter", price: "$150", period: "from", features: ["3 concepts", "2 revisions", "PNG/SVG/PDF"], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
      { name: "Pro", price: "$350", period: "from", features: ["Logo + colors", "Typography", "2 revisions", "Brandbook"], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
      { name: "Enterprise", price: "$750", period: "from", features: ["Logo + set", "Templates", "3 revisions", "Extended brandbook"], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
    ],
    addOnServices: [
      { name: "Extra Logo Concept", description: "Per new direction", price: "$100" },
      { name: "Extra Revision Round", description: "Additional revision", price: "$50" },
      { name: "Additional Language", description: "Brandbook translation", price: "$50" },
      { name: "Corporate Uniform", description: "Clothing/vehicle design", price: "$150" },
      { name: "Animated Logo", description: "Motion logo, intro", price: "$175" },
      { name: "Web Icon Set", description: "Favicon & app icon", price: "$50" },
      { name: "Brand Identity Training", description: "In-company training", price: "$150" },
    ],
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
        <ServiceProcess data={serviceData} duration="5 - 10 Days" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


