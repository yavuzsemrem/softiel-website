import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Webanwendungsentwicklung - Softiel",
  description: "Moderne Webanwendungen mit React, Next.js und Node.js. Professionelle Webentwicklung.",
}

export const dynamic = 'force-static'

export default function WebentwicklungPage() {
  const serviceData = {
    title: "Webanwendungs\nentwicklung",
    subtitle: "Maßgeschneiderte Lösungen für Ihre Anforderungen",
    description: "Wir entwickeln maßgeschneiderte Webanwendungen mit modernen Technologien. Benutzerfreundliche, schnelle und sichere Lösungen für professionelle Ergebnisse.",
    detailDescription: "Webanwendungen sind für Unternehmen unverzichtbar geworden. Mit dem richtigen Ansatz und der passenden Technologie steigern Sie Kundenzufriedenheit und Effizienz.",
    icon: "💻",
    serviceType: "web-gelistirme",
    labels: {
      detailsBadge: "Leistungsdetails",
      whyPrefix: "Warum",
      processBadge: "Prozess",
      processHeadingBefore: "Wie",
      processHeadingGradient: "Wir arbeiten",
      processSubtitle: "Wir liefern Ihr Projekt Schritt für Schritt mit kontinuierlichen Tests und Feedback.",
      timelineAverage: "Durchschnittliche Dauer",
      timelineSupport: "Support",
      timelineSatisfaction: "Zufriedenheit",
      pricingBadge: "Preisgestaltung",
      pricingHeadingBefore: "Faire",
      pricingHeadingGradient: "Preise",
      pricingSubtitle: "Wählen Sie das passende Paket. Für besondere Anforderungen bieten wir individuelle Angebote.",
      popularBadge: "Am beliebtesten",
      ctaGetOffer: "Angebot anfordern",
      ctaOfferMessageTemplate: "Hallo! Ich möchte Informationen zum {planName}-Paket für die Leistung {serviceTitle} erhalten.",
      domainNotice: "Domain + SSL + Hosting-Gebühren sind nicht im Paket enthalten",
      addOnsBadge: "Zusatzleistungen",
      addOnsHeadingBefore: "Zusatz",
      addOnsHeadingGradient: "Leistungen",
      addOnsSubtitle: "Erweitern Sie Ihr Projekt mit optionalen Zusatzleistungen. Wir bieten flexible Lösungen.",
      ctaGetDetails: "Details ansehen",
      ctaAddOnMessageTemplate: "Hallo! Ich möchte Informationen zur Zusatzleistung {addOnName} für die Leistung {serviceTitle} erhalten.",
      featuresWebDevelopment: [
        { title: "Maßgeschneiderte Lösung", description: "Perfekte Passung zu Ihren Anforderungen" },
        { title: "Integrationen", description: "ERP, CRM, Zahlungen, APIs" },
        { title: "Skalierbarkeit", description: "Für Wachstum vorbereitet" },
        { title: "Sicherheit & Geschwindigkeit", description: "Moderne Frameworks, hohe Performance" },
        { title: "Datenbank-Integration", description: "Vollständige Kompatibilität mit allen Datenbanksystemen" },
        { title: "API-First-Ansatz", description: "Microservices-Architektur und REST API für zukunftsorientierte Entwicklung" },
      ],
    },
    features: [
      { title: "Maßgeschneiderte Lösung", description: "Perfekte Passung zu Ihren Anforderungen", icon: "🎯" },
      { title: "Integrationen", description: "ERP, CRM, Zahlungen, APIs", icon: "🔗" },
      { title: "Skalierbarkeit", description: "Für Wachstum vorbereitet", icon: "📈" },
      { title: "Sicherheit & Geschwindigkeit", description: "Moderne Frameworks, hohe Performance", icon: "⚡" },
    ],
    process: [
      { step: "1", title: "Anforderungsanalyse", description: "Wir analysieren Ihre Anforderungen und definieren den Umfang." },
      { step: "2", title: "Technologieauswahl", description: "Wir wählen den besten Stack und entwerfen die Architektur." },
      { step: "3", title: "Agile Entwicklung", description: "Iterative Entwicklung mit kontinuierlichen Tests und Feedback." },
      { step: "4", title: "Deploy & Wartung", description: "Deployment in Produktion und langfristiger Support." },
    ],
    pricing: [
      { name: "Starter", price: "€1.500", period: "ab", features: [
        "Einfache CRUD‑Apps",
        "Login mit rollenbasierten Rechten",
        "Responsives UI",
        "Basisreports (Tabellen, Charts)",
        "1 Integration (z. B. E‑Mail oder SMS API)",
        "1 Revisionsrunde",
      ], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
      { name: "Pro", price: "€2.750", period: "ab", features: [
        "Umfangreiches Dashboard & Module",
        "Mehrrollen- & Berechtigungsverwaltung",
        "Erweiterte Reports (Charts, Filter, Export)",
        "2–3 Integrationen (ERP, CRM, Zahlungen)",
        "Erhöhte Sicherheit (2FA, Logging)",
        "2 Revisionsrunden",
      ], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
      { name: "Enterprise", price: "€4.500", period: "ab", features: [
        "Großskalige Enterprise‑Lösungen",
        "Mehrbenutzer‑Support",
        "Erweiterte Zugriffskontrolle (RBAC, LDAP, SSO)",
        "Microservices / API‑First Architektur",
        "Skalierbarkeit (Load‑Balancing, Cache)",
        "CI/CD‑Integration",
        "SLA + 3–6 Monate Wartung",
        "3 Revisionsrunden",
      ], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
    ],
    addOnServices: [
      { name: "Zusatzmodul", description: "Zusätzliche Module für Ihre Prozesse", price: "€300" },
      { name: "Progressive Web App", description: "Mobilefreundliche Offline‑App", price: "€400" },
      { name: "Analytics / BI", description: "Business‑Intelligence‑Integration", price: "€300" },
      { name: "Erweiterte Sicherheit", description: "Pen‑Test & Logging", price: "€300" },
      { name: "CI/CD‑Setup", description: "GitHub Actions Pipeline", price: "€200" },
      { name: "Backup / Monitoring", description: "Automatische Backups & Monitoring", price: "€150/Monat" },
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
        <ServiceProcess data={serviceData} duration="2 - 4 Wochen" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} serviceType="web-gelistirme" />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


