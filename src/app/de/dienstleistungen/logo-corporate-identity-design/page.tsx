import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Logo & Corporate Identity Design - Softiel",
  description: "Individuelles Logo-Design, Markenidentität, Typografie und Brandbook-Leitfaden für konsistente Markenauftritte.",
}

export const dynamic = 'force-static'

export default function LogoCorporateIdentityDePage() {
  const serviceData = {
    title: "Logo &\nCorporate Identity",
    subtitle: "Starke und Konsistente Marke",
    description: "Wir positionieren Ihre Marke mit Logo, Farbpalette, Typografie und Brandbook professionell.",
    detailDescription: "Konsistenz schafft Vertrauen und Wiedererkennung. Wir liefern eine skalierbare Sprache über alle Touchpoints.",
    icon: "🎨",
    serviceType: "logo-kimlik",
    labels: {
      detailsBadge: "Leistungsdetails",
      whyPrefix: "Warum",
      processBadge: "Prozess",
      processHeadingBefore: "Wie",
      processHeadingGradient: "Wir arbeiten",
      processSubtitle: "Discovery, Revisionen, Übergabe mit Brandbook.",
      timelineAverage: "Durchschnitt",
      timelineSupport: "Support",
      timelineSatisfaction: "Zufriedenheit",
      pricingBadge: "Preisgestaltung",
      pricingHeadingBefore: "Faire",
      pricingHeadingGradient: "Preise",
      pricingSubtitle: "Wählen Sie ein Paket. Individuelle Angebote verfügbar.",
      popularBadge: "Am beliebtesten",
      ctaGetOffer: "Angebot anfordern",
      ctaOfferMessageTemplate: "Hallo! Ich hätte gerne Infos zum {planName}-Paket für {serviceTitle}.",
      addOnsBadge: "Zusatzleistungen",
      addOnsHeadingBefore: "Zusatz",
      addOnsHeadingGradient: "Leistungen",
      addOnsSubtitle: "Erweitern Sie Ihre Marke mit Zusatzleistungen.",
      ctaGetDetails: "Details ansehen",
      ctaAddOnMessageTemplate: "Hallo! Bitte Infos zur Zusatzleistung {addOnName} für {serviceTitle}.",
      featuresLogoIdentity: [
        { title: "Logo-Design", description: "Prägnant & merkfähig" },
        { title: "Markenidentität", description: "Farben & Typografie" },
        { title: "Brandbook Leitfaden", description: "Klare Nutzung" },
        { title: "Multi-Format Lieferung", description: "PNG, SVG, PDF" },
        { title: "Revisionsrechte", description: "Zufriedenheit zuerst" },
        { title: "Schnelle Lieferung", description: "Geplanter Prozess" },
      ],
    },
    features: [
      { title: "Logo-Design", description: "Einzigartig & professionell", icon: "🎯" },
      { title: "Markenidentität", description: "Konsistenter Look", icon: "🎨" },
      { title: "Typografie", description: "Lesbar & passend", icon: "🔤" },
      { title: "Brandbook Leitfaden", description: "Nutzungs-Standards", icon: "📘" },
    ],
    process: [
      { step: "1", title: "Discovery & Brief", description: "Bedarf & Wettbewerbsblick" },
      { step: "2", title: "Skizze & Richtung", description: "Richtungen & Feedback" },
      { step: "3", title: "Revisionen", description: "Auswahl verfeinern" },
      { step: "4", title: "Übergabe", description: "Brandbook & Files" },
    ],
    pricing: [
      { name: "Starter", price: "€150", period: "ab", features: ["3 Konzepte", "2 Revisionen", "PNG/SVG/PDF"], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
      { name: "Pro", price: "€350", period: "ab", features: ["Logo + Farben", "Typografie", "2 Revisionen", "Brandbook"], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
      { name: "Enterprise", price: "€750", period: "ab", features: ["Logo + Set", "Templates", "3 Revisionen", "Erweitertes Brandbook"], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
    ],
    addOnServices: [
      { name: "Zusatz Logo-Konzept", description: "Pro neue Richtung", price: "€100" },
      { name: "Zusatz Revisionsrunde", description: "Zusätzliche Revision", price: "€50" },
      { name: "Zusätzliche Sprache", description: "Brandbook-Übersetzung", price: "€50" },
      { name: "Firmenbekleidung", description: "Kleidung/Fahrzeug", price: "€150" },
      { name: "Animiertes Logo", description: "Motion Logo, Intro", price: "€175" },
      { name: "Web-Icon-Set", description: "Favicon & App-Icon", price: "€50" },
      { name: "Markenidentität Training", description: "Firmeninterne Schulung", price: "€150" },
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
        <ServiceProcess data={serviceData} duration="5 - 10 Tage" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


