import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Web Application Development - Softiel",
  description: "Modern web apps built with React, Next.js and Node.js. Professional web development services.",
}

export const dynamic = 'force-static'

export default function WebDevelopmentPage() {
  const serviceData = {
    title: "Web Application Development",
    subtitle: "Tailored Solutions for Your Needs",
    description: "We build custom web applications with modern technologies. User-friendly, fast and secure solutions for professional results.",
    detailDescription: "Web applications have become indispensable tools for businesses. With the right approach and technology choices, you increase customer satisfaction and operational efficiency.",
    icon: "💻",
    serviceType: "web-gelistirme",
    labels: {
      detailsBadge: "Service Details",
      whyPrefix: "Why",
      processBadge: "Process",
      processHeadingBefore: "How",
      processHeadingGradient: "We Work",
      processSubtitle: "We deliver your project step by step with continuous testing and feedback.",
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
      featuresWebDevelopment: [
        { title: "Custom Solution", description: "Perfect fit for your needs" },
        { title: "Integrations", description: "ERP, CRM, payments, APIs" },
        { title: "Scalability", description: "Infrastructure ready to grow" },
        { title: "Security & Speed", description: "Modern frameworks, high performance" },
        { title: "Database Integration", description: "Full compatibility with all database systems" },
        { title: "API First Approach", description: "Microservices architecture and REST API for future-ready development" },
      ],
    },
    features: [
      { title: "Custom Solution", description: "Perfect fit for your needs", icon: "🎯" },
      { title: "Integrations", description: "ERP, CRM, payments, APIs", icon: "🔗" },
      { title: "Scalability", description: "Infrastructure ready to grow", icon: "📈" },
      { title: "Security & Speed", description: "Modern frameworks, high performance", icon: "⚡" },
    ],
    process: [
      { step: "1", title: "Requirements Analysis", description: "We analyze your business needs and define the project scope." },
      { step: "2", title: "Tech Stack Selection", description: "We choose the best stack and design the architecture." },
      { step: "3", title: "Agile Development", description: "We develop iteratively with continuous tests and feedback." },
      { step: "4", title: "Deploy & Maintenance", description: "We deploy to production and provide long-term support." },
    ],
    pricing: [
      {
        name: "Starter",
        price: "$1,500",
        period: "starting from",
        features: [
          "Simple CRUD apps",
          "Auth with role-based permissions",
          "Responsive UI",
          "Basic reports (tables, charts)",
          "1 integration (e.g., email or SMS API)",
          "1 revision round",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro",
        price: "$2,750",
        period: "starting from",
        features: [
          "Comprehensive dashboard & modules",
          "Multi-role & permission management",
          "Advanced reports (charts, filters, export)",
          "2–3 integrations (ERP, CRM, payments)",
          "Enhanced security (2FA, logging)",
          "2 revision rounds",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise",
        price: "$4,500",
        period: "starting from",
        features: [
          "Large-scale enterprise solutions",
          "Multi-user support",
          "Advanced access control (RBAC, LDAP, SSO)",
          "Microservices / API-first architecture",
          "Scalability (load balancing, cache)",
          "CI/CD integration",
          "SLA + 3–6 months maintenance",
          "3 revision rounds",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Extra Module", description: "Additional modules for your processes", price: "$300" },
      { name: "Progressive Web App", description: "Mobile-friendly offline app", price: "$400" },
      { name: "Analytics / BI", description: "Business intelligence integration", price: "$300" },
      { name: "Advanced Security", description: "Pen-test and logging", price: "$300" },
      { name: "CI/CD Setup", description: "GitHub Actions pipeline", price: "$200" },
      { name: "Backup / Monitoring", description: "Automated backups and monitoring", price: "$150/month" },
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
        <ServiceProcess data={serviceData} duration="2 - 4 Weeks" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} serviceType="web-gelistirme" />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


