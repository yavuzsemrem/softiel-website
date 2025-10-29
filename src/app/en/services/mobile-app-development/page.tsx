import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Mobile App Development - Softiel",
  description: "iOS and Android mobile app development. Native and cross-platform mobile app solutions.",
}

export const dynamic = 'force-static'

export default function MobileAppDevelopmentPage() {
  const serviceData = {
    title: "Mobile App\nDevelopment",
    subtitle: "iOS & Android Apps",
    description: "We develop iOS and Android apps from a single codebase. We offer solutions from MVP to Enterprise level.",
    detailDescription: "Mobile apps are now critical for businesses. While users spend 90% of their time on mobile devices, the right mobile strategy provides 24/7 access to your customers and gives you a competitive advantage.",
    icon: "📱",
    serviceType: "mobil-uygulama",
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
      featuresMobileApp: [
        { title: "Cross Platform", description: "iOS and Android apps from a single codebase" },
        { title: "Fast Development", description: "Fast app development with modern cross-platform technologies" },
        { title: "Store Compatibility", description: "Apps compliant with App Store and Google Play standards" },
        { title: "Native Performance", description: "High-performance mobile app experience" },
        { title: "Backend Integration", description: "API-based database and pusher services" },
        { title: "Push Notifications", description: "Real-time notifications and engagement features" },
      ],
    },
    features: [
      { title: "Fast MVP", description: "Launch in 3-6 weeks", icon: "⚡" },
      { title: "Single Codebase", description: "iOS + Android simultaneously", icon: "🔄" },
      { title: "Customizable", description: "Modules tailored to your business", icon: "🎯" },
      { title: "Long-term Support", description: "Maintenance guarantee with SLA", icon: "🛡️" },
    ],
    process: [
      { step: "1", title: "Requirements Analysis", description: "We analyze your ideas and determine the right solution from MVP to Enterprise." },
      { step: "2", title: "Prototype & Design", description: "We create user experience-focused design and interactive prototypes." },
      { step: "3", title: "Cross-Platform Development", description: "We develop iOS and Android apps simultaneously from a single codebase." },
      { step: "4", title: "Test & Store Launch", description: "We perform comprehensive tests and publish on App Store and Google Play." },
    ],
    pricing: [
      {
        name: "Starter (MVP)",
        price: "$2,000",
        period: "starting from",
        features: [
          "iOS + Android (Flutter/React Native)",
          "User login (email/password)",
          "Profile page + basic CRUD",
          "Simple push notifications",
          "Backend: Firebase/REST API",
          "1 revision round",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro",
        price: "$3,500",
        period: "starting from",
        features: [
          "All Starter features",
          "Advanced user management (roles, permissions)",
          "Payment integration (Iyzico, Stripe)",
          "Map/location-based features",
          "Real-time notifications",
          "Basic admin panel",
          "2 revision rounds",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise",
        price: "$5,000",
        period: "starting from",
        features: [
          "All Pro features",
          "Multi-language support",
          "Advanced security (2FA, encryption)",
          "Real-time chat/socket",
          "Microservice-based backend",
          "CI/CD integration",
          "SLA + 6 months maintenance",
          "3 revision rounds",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Extra Screen", description: "New screen design and development", price: "$100" },
      { name: "Payment Integration", description: "Stripe, PayPal, or Iyzico integration", price: "$300" },
      { name: "Map Services", description: "Google Maps, location-based features", price: "$300" },
      { name: "Notification System", description: "Firebase / OneSignal", price: "$200" },
      { name: "Admin Panel Development", description: "Web-based admin panel", price: "$400" },
      { name: "Store Consulting", description: "Optimization, ASO", price: "$200" },
      { name: "6 Month Maintenance", description: "Maintenance and updates package", price: "$100" },
      { name: "12 Month Maintenance", description: "Maintenance and updates package", price: "$200" },
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
        <ServiceProcess data={serviceData} duration="3 - 6 Weeks" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
