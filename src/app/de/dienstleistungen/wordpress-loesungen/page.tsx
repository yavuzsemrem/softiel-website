import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "WordPress Lösungen - Softiel",
  description: "Professionelle WordPress-Installation, Theme-Entwicklung und CMS-Lösungen. WordPress-Dienste für E-Commerce, Unternehmensseiten und individuelle Projekte.",
}

export const dynamic = 'force-static'

export default function WordPressLoesungenPage() {
  const serviceData = {
    title: "WordPress\nLösungen",
    subtitle: "Einfach Verwaltbare Websites",
    description: "Wir erstellen professionelle Websites auf WordPress und anderen CMS-Plattformen. Wir bieten einfaches Content-Management, sichere und schnelle Lösungen.",
    detailDescription: "Dank der flexiblen Struktur von WordPress können wir schnell und kosteneffizient jede Art von Website erstellen, von kleinen Blog-Seiten bis hin zu großen Unternehmens-E-Commerce-Plattformen. Wir bieten unseren Kunden uneingeschränkte Freiheit im Content-Management.",
    icon: "🔧",
    serviceType: "wordpress",
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
      featuresWordPress: [
        { title: "Einfaches Content-Management", description: "Einfaches Hinzufügen und Bearbeiten von Inhalten mit Drag-and-Drop-Editor" },
        { title: "Reiches Plugin-Ökosystem", description: "Unbegrenzte Anpassung mit über 50.000 kostenlosen und kostenpflichtigen Plugins" },
        { title: "Aktuelle Sicherheitsmaßnahmen", description: "Schutz mit Wordfence, 2FA und Sicherheitsplugins" },
        { title: "SEO-fähige Infrastruktur", description: "Suchmaschinenoptimierung mit Yoast SEO und RankMath" },
        { title: "Mehrsprachige Unterstützung", description: "Mehrsprachige Site-Unterstützung mit WPML und Polylang" },
        { title: "Cache & Geschwindigkeitsoptimierung", description: "Hohe Leistung mit LiteSpeed Cache und CDN-Integration" },
      ],
    },
    features: [
      { title: "Einfache Verwaltung", description: "Drag-and-Drop-Editor", icon: "🎛️" },
      { title: "Plugin-Integration", description: "Angepasste Plugins nach Bedarf", icon: "🔌" },
      { title: "Sicherheit", description: "Aktuelle Sicherheitsmaßnahmen", icon: "🔒" },
      { title: "SEO-Bereit", description: "SEO-Optimierung enthalten", icon: "🔍" },
    ],
    process: [
      { step: "1", title: "Anforderungsanalyse", description: "Wir analysieren Projektanforderungen und wählen das passende CMS aus." },
      { step: "2", title: "Theme & Plugin-Auswahl", description: "Wir bestimmen Themes und Plugins, die den Anforderungen entsprechen." },
      { step: "3", title: "Anpassung", description: "Wir passen Designs und Funktionen an." },
      { step: "4", title: "Schulung & Übergabe", description: "Wir bieten Nutzungsschulungen und übergeben das Projekt." },
    ],
    pricing: [
      {
        name: "Starter (Unternehmensseite)",
        price: "€750",
        period: "ab",
        features: [
          "WordPress-Installation + fertige Theme-Anpassung",
          "5–7 Seiten (Über uns, Leistungen, Kontakt usw.)",
          "Responsive (mobil kompatibel)",
          "Grundlegende SEO-Plugins (Yoast / RankMath)",
          "1 Revisionsrunde",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (E-Commerce / WooCommerce)",
        price: "€2.000",
        period: "ab",
        features: [
          "Alles aus Starter +",
          "WooCommerce-Installation",
          "Produkthochladen bis zu 10 Produkten (mehr ist Kunde oder Zusatzleistung)",
          "Grundlegende Zahlungssystem-Integration (PayPal, Iyzico usw.)",
          "Versandmodul-Integration",
          "2 Revisionsrunden",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (Unternehmens-CMS / Content-Plattform)",
        price: "€3.500",
        period: "ab",
        features: [
          "Alles aus Pro +",
          "Custom Theme oder Child Theme-Entwicklung",
          "Mehrsprachige Unterstützung (Polylang, WPML)",
          "Erweiterte Sicherheit (Wordfence / 2FA)",
          "Erweiterter Cache + Geschwindigkeitsoptimierung (LiteSpeed, CDN)",
          "Benutzerrollen für Content-Teams",
          "3 Revisionsrunden",
          "3 Monate Wartungssupport",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Produkthochladen", description: "Produkthochladen", price: "€20" },
      { name: "Mehrsprachige Einrichtung", description: "Mehrsprachige Einrichtungspaket", price: "€150" },
      { name: "Custom Plugin-Entwicklung", description: "Custom Plugin-Entwicklungspaket", price: "€300" },
      { name: "SEO-Optimierung", description: "SEO-Optimierungspaket", price: "€150" },
      { name: "Geschwindigkeitssteigerung", description: "Site-Geschwindigkeitssteigerungspaket", price: "€75" },
      { name: "Wartung & Update", description: "Monatliches Wartungs- und Update-Paket", price: "€50/Monat" },
      { name: "Logo-Design / Erneuerung", description: "Logo-Design", price: "€100" },
      { name: "Zusätzliche Seite", description: "Zusätzliche Seiten-Design und -Entwicklung", price: "€100" },
      { name: "Content-Erstellung", description: "Professionelle Seitentext-Erstellung", price: "€50" },
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
        <ServiceProcess data={serviceData} duration="7 - 14 Tage" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
