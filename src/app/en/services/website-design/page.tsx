import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

// Static generation için metadata
export const metadata = {
  title: "Website Design - Softiel",
  description: "Modern and responsive website design. Professional appearance, fast loading and SEO compliant web design services.",
}

// Static generation - sayfa önceden oluşturulsun
export const dynamic = 'force-static'

export default function WebsiteDesignPage() {
  const serviceData = {
    title: "Website Design",
    subtitle: "Modern and Impactful Web Designs",
    description: "Stand out in the digital world with professional websites. Provide the best experience with responsive design, fast loading and SEO compliant structure.",
    detailDescription: "A website is no longer just about sharing information, it has become the digital face of your brand. The right design and user experience influence your customers and increase your business credibility.",
    serviceType: "web-tasarimi",
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
      pricingSubtitle: "Bring your project to life with packages for every budget. We provide tailored pricing for your specific needs.",
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
      featuresWebDesign: [
        { title: "Modern Design", description: "Trendy and aesthetically refined web designs" },
        { title: "Responsive Layout", description: "Perfectly adaptive design on all devices" },
        { title: "Fast Loading", description: "High performance with optimized code and images" },
        { title: "SEO Friendly", description: "Clean code optimized for search engines" },
        { title: "Security", description: "Robust measures and SSL-secured protection" },
        { title: "Mobile Optimization", description: "Device-specific optimization and design for mobile" },
      ],
    },
    features: [
      {
        title: "Live in 7-14 Days",
        description: "Fast delivery guarantee"
      },
      {
        title: "Mobile Friendly & Fast",
        description: "Performance-oriented design"
      },
      {
        title: "SEO Infrastructure Ready",
        description: "Optimized for search engines"
      },
      {
        title: "Revision Rights",
        description: "Customer satisfaction guarantee"
      }
    ],
    process: [
      {
        step: "1",
        title: "Analysis & Planning",
        description: "We analyze your needs, determine your target audience and develop a strategy."
      },
      {
        step: "2",
        title: "Design & Prototype",
        description: "We create wireframes and mockups with modern design principles."
      },
      {
        step: "3",
        title: "Development",
        description: "We code the responsive and fast-loading website."
      },
      {
        step: "4",
        title: "Testing & Launch",
        description: "We perform comprehensive tests and launch the site."
      }
    ],
    pricing: [
      {
        name: "Basic",
        price: "$1,000",
        period: "starting from",
        features: [
          "5-7 pages (Home, About, Services, Contact, etc.)",
          "Responsive (mobile friendly)",
          "Basic SEO (meta, sitemap, robots.txt)",
          "1 contact form + Google Maps integration",
          "1 revision round",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro",
        price: "$2,500",
        period: "starting from",
        features: [
          "8-12 pages",
          "Custom homepage design",
          "Blog infrastructure",
          "2 revision rounds",
          "Multi-language ready (optional)",
          "Advanced speed optimization (WebP, lazy load, font preload)",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise",
        price: "$4,000",
        period: "starting from",
        features: [
          "12+ pages",
          "Multi-language support",
          "Content management system (WordPress, Headless CMS, etc.)",
          "Custom integrations (CRM, payment, API)",
          "3 revision rounds",
          "Accessibility standards (WCAG compliance)",
          "3 months free maintenance and support",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      {
        name: "Additional Page",
        description: "Additional page design and development",
        price: "$100"
      },
      {
        name: "Multi-language Support",
        description: "Publish your website in multiple languages",
        price: "$150"
      },
      {
        name: "Content Writing",
        description: "Have your page texts written professionally",
        price: "$50"
      },
      {
        name: "Logo Design / Update",
        description: "Logo design or existing logo update",
        price: "$100"
      },
      {
        name: "Speed Optimization",
        description: "Speed optimization for existing site",
        price: "$200"
      },
      {
        name: "Monthly Maintenance",
        description: "Site maintenance and updates",
        price: "$50/month"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black dark:from-slate-800 dark:via-slate-900 dark:via-slate-950 dark:via-black dark:to-black">
      <Header />
      <main className="relative overflow-hidden">
        {/* Background Elements */}
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
