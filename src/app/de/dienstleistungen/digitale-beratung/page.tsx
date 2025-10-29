import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Digitale Beratung - Softiel",
  description: "Wir begleiten Ihre digitale Transformation mit Strategie, Technologieauswahl und messbarer Umsetzung.",
}

export const dynamic = 'force-static'

export default function DigitaleBeratungPage() {
  const pricing = [
    { name: "Starter", price: "€300", period: "ab", features: [
      "Einmaliges Digital-Audit (Website, Social, SEO, Ads)",
      "SWOT-Analyse",
      "Kernverbesserungs-Vorschläge",
      "Einfacher Fahrplan (3–6 Monate)",
      "1 Revision"
    ], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
    { name: "Pro", price: "€500", period: "monatlich", features: [
      "Alles im Starter +",
      "2 Meetings pro Monat (Zoom/Meet)",
      "Laufende Guidance für Ads, SEO, Social",
      "KPIs & Performance-Tracking",
      "Wettbewerbsanalyse (Quartalsreport)",
      "2 Revisionen"
    ], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
    { name: "Enterprise", price: "€750", period: "monatlich", features: [
      "Alles im Pro +",
      "Wöchentliche/monatliche Beratungen",
      "Roadmap zur digitalen Transformation (1 Jahr)",
      "Technologieauswahl (ERP, CRM, E‑Commerce)",
      "Team-Schulungen",
      "Reporting & Strategie-Updates",
      "3 Revisionen + 6 Monate SLA"
    ], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
  ]

  const serviceData = {
    title: "Digitale\nBeratung",
    subtitle: "Leitfaden zur digitalen Transformation",
    description: "Wir beraten zu Strategieentwicklung und Technologieauswahl.",
    detailDescription: "Wir analysieren den Ist-Zustand und definieren den klaren Weg zu Ihren Zielen.",
    icon: "💡",
    serviceType: "danismanlik",
    labels: {
      detailsBadge: "Servicedetails",
      whyPrefix: "Warum",
      processBadge: "Prozess",
      processHeadingBefore: "Wie",
      processHeadingGradient: "Wir Arbeiten",
      processSubtitle: "Schrittweise Umsetzung mit messbaren KPIs und Guidance.",
      timelineAverage: "Durchschnittliche Zeit",
      timelineSupport: "Support",
      timelineSatisfaction: "Zufriedenheit",
      pricingBadge: "Preise",
      pricingHeadingBefore: "Faire",
      pricingHeadingGradient: "Preise",
      pricingSubtitle: "Wählen Sie den passenden Plan.",
      popularBadge: "Beliebteste",
      ctaGetOffer: "Angebot Anfordern",
      ctaOfferMessageTemplate: "Hallo! Ich möchte Informationen über den {planName}-Plan für {serviceTitle} erhalten.",
      domainNotice: undefined,
      addOnsBadge: "Zusatzleistungen",
      addOnsHeadingBefore: "Zusatz",
      addOnsHeadingGradient: "Leistungen",
      addOnsSubtitle: "Erweitern Sie mit optionalen Add-ons.",
      ctaGetDetails: "Details Ansehen",
      ctaAddOnMessageTemplate: "Hallo! Ich möchte Infos zum Add-on {addOnName} für {serviceTitle}.",
      featuresConsulting: [
        { title: "Strategieentwicklung", description: "Digitale Roadmap" },
        { title: "Technologieauswahl", description: "Passende Tools" },
        { title: "Prozessoptimierung", description: "Effizienz" },
        { title: "Schulung & Mentoring", description: "Team Enablement" },
        { title: "Analyse & Reporting", description: "KPIs & Insights" },
        { title: "Wettbewerbsanalyse", description: "Marktposition" },
      ],
    },
    features: [
      { title: "Strategieentwicklung", description: "Klarer Plan", icon: "🎯" },
      { title: "Technologieauswahl", description: "Richtige Plattformen", icon: "🔧" },
      { title: "Prozessoptimierung", description: "Effizienz", icon: "📈" },
      { title: "Schulung & Mentoring", description: "Teams befähigen", icon: "👨‍🏫" },
    ],
    process: [
      { step: "1", title: "Ist-Analyse", description: "Wir analysieren Ihre digitale Präsenz." },
      { step: "2", title: "Zielsetzung", description: "Wir definieren messbare Ziele." },
      { step: "3", title: "Fahrplan", description: "Wir erstellen einen umsetzbaren Plan." },
      { step: "4", title: "Umsetzungsbegleitung", description: "Wir begleiten die Ausführung." },
    ],
    addOnServices: [
      { name: "Zusätzliches Meeting", description: "Außerhalb des Monatspakets", price: "€50" },
      { name: "Schulungsmodul", description: "SEO/Social/Digital Marketing", price: "€150" },
      { name: "Technologieauswahl", description: "ERP/CRM/E‑Commerce", price: "€200" },
      { name: "Wettbewerbsanalyse", description: "Tiefergehender Report", price: "€200" },
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
        <ServiceProcess data={serviceData} duration="1 - 2 Wochen" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


