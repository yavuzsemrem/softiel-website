import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Google Ads Verwaltung - Softiel",
  description: "Effektives Anzeigenmanagement auf Google Ads und Meta Ads. Hohe Conversion-Raten mit niedrigen Kosten.",
}

export const dynamic = 'force-static'

export default function GoogleAdsVerwaltungPage() {
  const serviceData = {
    title: "Google Ads\nVerwaltung",
    subtitle: "Zielgerichtete Werbekampagnen",
    description: "Wir verwalten effektive Werbekampagnen auf Google Ads und Meta Ads. Wir helfen Ihnen, hohe Conversion-Raten mit niedrigen Kosten zu erzielen.",
    detailDescription: "Online-Werbung ist jetzt wichtig für Unternehmen. Mit der richtigen Plattformstrategie und Kampagnenverwaltung können Sie Ihre Kunden direkt erreichen und Ihre Verkäufe steigern.",
    icon: "📢",
    serviceType: "google-ads",
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
      featuresGoogleAds: [
        { title: "Zielgerichtete Werbung", description: "Erreichen Sie die richtige Zielgruppe mit präziser Ausrichtung" },
        { title: "ROI-orientierte Strategien", description: "Hohe Rendite aus jeder gestarteten Kampagne" },
        { title: "Echtzeitoptimierung", description: "7/24 Kampagnen-Performance-Tracking und Verbesserung" },
        { title: "Multi-Plattform-Verwaltung", description: "Google Ads, Meta Ads und LinkedIn unter einem Dach" },
        { title: "Schnelle Kampagnen-Einrichtung", description: "Aktive Kampagnen innerhalb von 24 Stunden" },
        { title: "Detaillierte Leistungsanalyse", description: "Kampagnenergebnisse mit monatlichen Berichten" },
      ],
    },
    features: [
      { title: "Zielgerichtete Kampagnen", description: "Erreichen Sie die richtigen Kunden", icon: "🎯" },
      { title: "ROI-Steigerungsgarantie", description: "Garantierte Rendite Ihrer Investition", icon: "💰" },
      { title: "Echtzeitoptimierung", description: "7/24 Kampagnen-Tracking", icon: "⚡" },
      { title: "Professionelles Design", description: "Inklusive Werbebilder", icon: "🎨" },
    ],
    process: [
      { step: "1", title: "Zielgruppenanalyse", description: "Wir analysieren Ihre Zielgruppe und bestimmen die effektivsten Kanäle." },
      { step: "2", title: "Kampagnen-Design", description: "Wir erstellen Werbetexte, Bilder und Targeting-Strategie." },
      { step: "3", title: "Optimierung", description: "Wir optimieren Kampagnen kontinuierlich und verbessern die Leistung." },
      { step: "4", title: "Berichterstattung", description: "Wir verfolgen Ergebnisse mit detaillierten Leistungsberichten." },
    ],
    pricing: [
      {
        name: "Starter (Basis-Verwaltung)",
        price: "€300",
        period: "Monat",
        features: [
          "Google Ads oder Meta Ads (ein Kanal)",
          "Kampagnen-Einrichtung (Suche/Display/Instagram-Facebook)",
          "Targeting-Einstellungen (Standort, Demografie, Keywords)",
          "Grundlegende Werbetexte + Bilder (wenn vom Kunden bereitgestellt)",
          "Monatlich 1 Bericht (Grundleistung)",
          "1 Revision / Änderung",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (Optimierte Verwaltung)",
        price: "€500",
        period: "Monat",
        features: [
          "Google Ads + Meta Ads (2 Kanäle gemeinsam verwaltet)",
          "2-3 Kampagnen (Suche + Remarketing + Social Media)",
          "Werbetexte + visuelles Design (von uns)",
          "A/B-Tests (Überschriften, CTA)",
          "Wöchentliche Optimierung (Budget, Targeting)",
          "Monatlicher detaillierter Bericht (CTR, Conversion, Kostenanalyse)",
          "2 Revisionen / Änderungen",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (Strategische Verwaltung)",
        price: "€750",
        period: "Monat",
        features: [
          "Multi-Kanal-Verwaltung (Google Ads + Meta + LinkedIn)",
          "5+ Kampagnen (Suche, Display, Remarketing, Video, Lead-Anzeigen)",
          "Professionelle Werbedesigns (inklusive Bilder + Videos)",
          "Conversion-Funnel-Planung (inklusive Landing-Page-Optimierung)",
          "Wöchentliche Berichterstattung + monatliches Strategiemeeting",
          "Monatliche A/B-Tests und kontinuierliche Optimierung",
          "Geeignet für Projekte mit Werbebudget über €2.000",
          "3 Revisionen / Änderungen",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Zusatzkanal", description: "LinkedIn/TikTok/Twitter – Kanal", price: "€100/Monat" },
      { name: "Visuelles Design", description: "Banner, Social-Post – pro Stück", price: "€50" },
      { name: "Videoanzeigen-Produktion", description: "YouTube/Reels/TikTok – Video", price: "€75" },
      { name: "Landing-Page-Design", description: "Conversion-fokussiert – pro Seite", price: "€300" },
      { name: "Conversion-Funnel-Beratung", description: "CRM-Integration, Lead-Tracking", price: "€150" },
      { name: "Wettbewerbsanalyse", description: "Einmalig", price: "€75" },
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
