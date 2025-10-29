import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

// Static generation için metadata
export const metadata = {
  title: "Website-Design - Softiel",
  description: "Modernes und responsives Website-Design. Professionelles Erscheinungsbild, schnelle Ladezeiten und SEO-konforme Webdesign-Services.",
}

// Static generation - sayfa önceden oluşturulsun
export const dynamic = 'force-static'

export default function WebsiteDesignPage() {
  const serviceData = {
    title: "Website Design",
    subtitle: "Moderne und Wirksamkeitsvolle Webdesigns",
    description: "Heben Sie sich mit professionellen Websites in der digitalen Welt ab. Bieten Sie das beste Erlebnis mit responsivem Design, schneller Ladezeit und SEO-konformer Struktur.",
    detailDescription: "Eine Website ist nicht mehr nur eine Frage des Informationsaustauschs, sie ist zum digitalen Gesicht Ihrer Marke geworden. Das richtige Design und die Benutzererfahrung beeinflussen Ihre Kunden und erhöhen die Glaubwürdigkeit Ihres Unternehmens.",
    serviceType: "web-tasarimi",
    labels: {
      detailsBadge: "Leistungsdetails",
      whyPrefix: "Warum",
      processBadge: "Prozess",
      processHeadingBefore: "Wie",
      processHeadingGradient: "Wir arbeiten",
      processSubtitle: "Wir realisieren Ihr Projekt Schritt für Schritt. In jeder Phase bleiben wir in Kontakt, um das beste Ergebnis zu erzielen.",
      timelineAverage: "Durchschnittliche Dauer",
      timelineSupport: "Support",
      timelineSatisfaction: "Zufriedenheit",
      pricingBadge: "Preisgestaltung",
      pricingHeadingBefore: "Faire",
      pricingHeadingGradient: "Preise",
      pricingSubtitle: "Bringen Sie Ihr Projekt mit Paketen für jedes Budget voran. Für spezielle Bedürfnisse bieten wir individuelle Preise.",
      popularBadge: "Am beliebtesten",
      ctaGetOffer: "Angebot anfordern",
      ctaOfferMessageTemplate: "Hallo! Ich möchte Informationen zum {planName}-Paket für die Leistung {serviceTitle} erhalten.",
      domainNotice: "Domain + SSL + Hosting-Gebühren sind nicht im Paket enthalten",
      addOnsBadge: "Zusatzleistungen",
      addOnsHeadingBefore: "Zusatz",
      addOnsHeadingGradient: "Leistungen",
      addOnsSubtitle: "Erweitern Sie Ihr Projekt mit optionalen Zusatzleistungen. Wir bieten flexible Lösungen für besondere Anforderungen.",
      ctaGetDetails: "Details ansehen",
      ctaAddOnMessageTemplate: "Hallo! Ich möchte Informationen zur Zusatzleistung {addOnName} für die Leistung {serviceTitle} erhalten.",
      featuresWebDesign: [
        { title: "Modernes Design", description: "Trendige und ästhetisch ausgereifte Webdesigns" },
        { title: "Responsives Layout", description: "Perfekte Anpassung auf allen Geräten" },
        { title: "Schnelles Laden", description: "Hohe Performance mit optimiertem Code und Bildern" },
        { title: "SEO‑freundlich", description: "Sauberer, für Suchmaschinen optimierter Code" },
        { title: "Sicherheit", description: "Robuste Maßnahmen und SSL‑gesicherter Schutz" },
        { title: "Mobile Optimierung", description: "Gerätespezifische Optimierung und Design für Mobilgeräte" },
      ],
    },
    features: [
      {
        title: "Live in 7-14 Tagen",
        description: "Schnelle Liefergarantie"
      },
      {
        title: "Mobile-Freundlich & Schnell",
        description: "Leistungsorientiertes Design"
      },
      {
        title: "SEO-Infrastruktur Bereit",
        description: "Optimiert für Suchmaschinen"
      },
      {
        title: "Revisionsrechte",
        description: "Kundenzufriedenheitsgarantie"
      }
    ],
    process: [
      {
        step: "1",
        title: "Analyse & Planung",
        description: "Wir analysieren Ihre Bedürfnisse, bestimmen Ihre Zielgruppe und entwickeln eine Strategie."
      },
      {
        step: "2",
        title: "Design & Prototyp",
        description: "Wir erstellen Wireframes und Mockups mit modernen Designprinzipien."
      },
      {
        step: "3",
        title: "Entwicklung",
        description: "Wir programmieren die responsive und schnell ladende Website."
      },
      {
        step: "4",
        title: "Test & Launch",
        description: "Wir führen umfassende Tests durch und starten die Website."
      }
    ],
    pricing: [
      {
        name: "Basic",
        price: "€1,000",
        period: "ab",
        features: [
          "5-7 Seiten (Startseite, Über uns, Dienstleistungen, Kontakt, etc.)",
          "Responsive (mobile-freundlich)",
          "Basis-SEO (Meta, Sitemap, robots.txt)",
          "1 Kontaktformular + Google Maps Integration",
          "1 Revisionsrunde",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro",
        price: "€2,500",
        period: "ab",
        features: [
          "8-12 Seiten",
          "Benutzerdefiniertes Startseiten-Design",
          "Blog-Infrastruktur",
          "2 Revisionsrunden",
          "Mehrsprachbereit (optional)",
          "Erweiterte Geschwindigkeitsoptimierung (WebP, lazy load, Font preload)",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise",
        price: "€4,000",
        period: "ab",
        features: [
          "12+ Seiten",
          "Mehrsprachunterstützung",
          "Content-Management-System (WordPress, Headless CMS, etc.)",
          "Benutzerdefinierte Integrationen (CRM, Zahlung, API)",
          "3 Revisionsrunden",
          "Barrierefreiheitsstandards (WCAG-Konformität)",
          "3 Monate kostenlose Wartung und Support",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      {
        name: "Zusätzliche Seite",
        description: "Design & Entwicklung zusätzlicher Seite",
        price: "€100"
      },
      {
        name: "Mehrsprachunterstützung",
        description: "Mehrsprachunterstützung für Ihre Website",
        price: "€150"
      },
      {
        name: "Content-Erstellung",
        description: "Professionelle Seitentexte",
        price: "€50"
      },
      {
        name: "Logo-Design / Update",
        description: "Logo-Design oder -Update",
        price: "€100"
      },
      {
        name: "Geschwindigkeitsoptimierung",
        description: "Speed-Optimierung für bestehende Seite",
        price: "€200"
      },
      {
        name: "Monatliche Wartung",
        description: "Wartung & Updates",
        price: "€50/Monat"
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
        <ServiceProcess data={serviceData} duration="7 - 14 Tage" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
