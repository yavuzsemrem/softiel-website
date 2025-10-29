import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "SEO Optimierung - Softiel",
  description: "Suchmaschinenoptimierung, höhere Platzierung in Google und Steigerung des organischen Traffics.",
}

export const dynamic = 'force-static'

export default function SEOOptimierungPage() {
  const serviceData = {
    title: "SEO\nOptimierung",
    subtitle: "Höhere Platzierung in Google",
    description: "Wir optimieren Ihre Website für höhere Rankings in Suchmaschinen. Wir bieten organisches Traffic-Wachstum und Kundengewinnung.",
    detailDescription: "SEO ist nicht mehr nur Keyword-Dichte, sondern eine benutzerorientierte Strategie. Mit dem richtigen Ansatz erfüllen wir sowohl Googles Algorithmen als auch Kundenbedürfnisse.",
    icon: "🔍",
    serviceType: "seo",
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
      featuresSEO: [
        { title: "Keyword-Recherche", description: "Zielgruppenorientierte Keyword-Analyse und Strategie" },
        { title: "Technisches SEO", description: "Seitengeschwindigkeit, Mobile-Kompatibilität und Indexierungsoptimierung" },
        { title: "Content-Optimierung", description: "SEO-freundliche Content-Erstellung und Meta-Optimierung" },
        { title: "Analytics & Tracking", description: "Google Analytics und Search Console Integration" },
        { title: "Backlink-Strategie", description: "Autoritätsaufbau und Entwicklung organischer Link-Profile" },
        { title: "Leistungsbericht", description: "Monatliche detaillierte SEO-Leistungsberichte" },
      ],
    },
    features: [
      { title: "Google-Ranking-Steigerung", description: "Wir sorgen für Sichtbarkeit auf der ersten Seite", icon: "🚀" },
      { title: "Organischer Traffic-Gewinn", description: "Qualitativer Besucherzuwachs", icon: "📈" },
      { title: "Wettbewerbsanalyse", description: "Wir heben uns im Markt ab", icon: "🎯" },
      { title: "ROI-orientierte Ergebnisse", description: "Garantierte Kapitalrendite", icon: "💰" },
    ],
    process: [
      { step: "1", title: "SEO-Audit", description: "Wir analysieren die aktuelle Situation und identifizieren Verbesserungsbereiche." },
      { step: "2", title: "Strategieentwicklung", description: "Wir erstellen Keyword-Strategie und Content-Plan." },
      { step: "3", title: "Optimierung", description: "Wir wenden technische und Content-Optimierungen an." },
      { step: "4", title: "Verfolgung & Berichterstattung", description: "Wir verfolgen die Leistung und erstellen regelmäßige Berichte." },
    ],
    pricing: [
      {
        name: "Starter (Technisches SEO)",
        price: "€300",
        period: "Monat",
        features: [
          "Audit",
          "Analytics/Console-Einrichtung",
          "Meta/URL-Optimierung",
          "Sitemap",
          "Lighthouse-Berichte",
          "Monatsbericht",
          "1 Revision",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (Wachstums-SEO)",
        price: "€500",
        period: "Monat",
        features: [
          "Starter + Keyword-Recherche",
          "Content-Optimierung",
          "Blog-Plan",
          "Linkaufbau",
          "Bild-SEO",
          "Detaillierter Bericht",
          "2 Revisionen",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (Aggressives SEO)",
        price: "€750",
        period: "Monat",
        features: [
          "Pro + mehr Keywords/Content",
          "Backlink-Strategie",
          "Wettbewerbsanalyse",
          "Lokales SEO",
          "360°-Management",
          "Monatliches Meeting",
          "3 Revisionen",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Zusätzliche Keywords", description: "Pro 5 Keywords", price: "€20" },
      { name: "Content-Erstellung", description: "700-1000 Wörter, pro Artikel", price: "€50" },
      { name: "Backlink-Pakete", description: "5-10 qualitative Links", price: "€100" },
      { name: "SEO-Bilder", description: "Pro Stück", price: "€25" },
      { name: "Wettbewerbsbericht", description: "Monatlich", price: "€100/Monat" },
      { name: "Wettbewerbsbericht", description: "Vierteljährlich", price: "€200/Quartal" },
      { name: "Landing SEO", description: "Pro Seite", price: "€75" },
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
        <ServiceProcess data={serviceData} duration="1 - 5 Tage" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
