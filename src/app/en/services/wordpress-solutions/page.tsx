import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "WordPress Solutions - Softiel",
  description: "Professional WordPress installation, theme development and CMS solutions. WordPress services for e-commerce, corporate sites and custom projects.",
}

export const dynamic = 'force-static'

export default function WordPressSolutionsPage() {
  const serviceData = {
    title: "WordPress\nSolutions",
    subtitle: "Easily Manageable Websites",
    description: "We create professional websites on WordPress and other CMS platforms. We offer easy content management, secure and fast solutions.",
    detailDescription: "Thanks to WordPress's flexible structure, we can quickly and cost-effectively create any type of website, from small blog sites to large corporate e-commerce platforms. We offer unlimited freedom to our customers in content management.",
    icon: "🔧",
    serviceType: "wordpress",
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
      featuresWordPress: [
        { title: "Easy Content Management", description: "Easy content addition and editing with drag-and-drop editor" },
        { title: "Rich Plugin Ecosystem", description: "Unlimited customization with 50,000+ free and paid plugins" },
        { title: "Current Security Measures", description: "Protection with Wordfence, 2FA and security plugins" },
        { title: "SEO-Ready Infrastructure", description: "Search engine optimization with Yoast SEO and RankMath" },
        { title: "Multi-Language Support", description: "Multi-language site support with WPML and Polylang" },
        { title: "Cache & Speed Optimization", description: "High performance with LiteSpeed Cache and CDN integration" },
      ],
    },
    features: [
      { title: "Easy Management", description: "Drag-and-drop editor", icon: "🎛️" },
      { title: "Plugin Integration", description: "Custom plugins as needed", icon: "🔌" },
      { title: "Security", description: "Up-to-date security measures", icon: "🔒" },
      { title: "SEO Ready", description: "SEO optimization included", icon: "🔍" },
    ],
    process: [
      { step: "1", title: "Requirements Analysis", description: "We analyze project requirements and select the most suitable CMS." },
      { step: "2", title: "Theme & Plugin Selection", description: "We determine themes and plugins suitable for the needs." },
      { step: "3", title: "Customization", description: "We customize designs and functions." },
      { step: "4", title: "Training & Delivery", description: "We provide usage training and deliver the project." },
    ],
    pricing: [
      {
        name: "Starter (Corporate Site)",
        price: "$750",
        period: "starting from",
        features: [
          "WordPress installation + ready theme adaptation",
          "5–7 pages (About, Services, Contact, etc.)",
          "Responsive (mobile compatible)",
          "Basic SEO plugins (Yoast / RankMath)",
          "1 revision round",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (E-Commerce / WooCommerce)",
        price: "$2,000",
        period: "starting from",
        features: [
          "Everything in Starter +",
          "WooCommerce installation",
          "Product upload up to 10 products (more is customer or add-on service)",
          "Basic payment system integration (PayPal, Iyzico, etc.)",
          "Shipping module integration",
          "2 revision rounds",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (Corporate CMS / Content Platform)",
        price: "$3,500",
        period: "starting from",
        features: [
          "Everything in Pro +",
          "Custom theme or child theme development",
          "Multi-language support (Polylang, WPML)",
          "Advanced security (Wordfence / 2FA)",
          "Advanced cache + speed optimization (LiteSpeed, CDN)",
          "User roles for content teams",
          "3 revision rounds",
          "3 months maintenance support",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Extra Product Upload", description: "Extra product upload and optimization", price: "$20" },
      { name: "Multi-Language Setup", description: "Multi-language setup package", price: "$150" },
      { name: "Custom Plugin Development", description: "Custom plugin development package", price: "$300" },
      { name: "SEO Optimization", description: "SEO optimization package", price: "$150" },
      { name: "Site Speed Boost", description: "Site speed boost package", price: "$75" },
      { name: "Maintenance", description: "Monthly maintenance and update package", price: "$50/month" },
      { name: "Logo Design / Refresh", description: "Logo design or existing logo refresh", price: "$100" },
      { name: "Extra Page", description: "Extra page design and development", price: "$100" },
      { name: "Content Writing", description: "Professional page text writing", price: "$50" },
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
        <ServiceProcess data={serviceData} duration="7 - 14 Days" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
