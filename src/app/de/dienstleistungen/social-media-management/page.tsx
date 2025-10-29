import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Social Media Management - Softiel",
  description: "Professionelle Social-Media-Management-Dienste auf Instagram, Facebook, LinkedIn Plattformen. Wir steigern Ihre Markenbekanntheit und stärken das Kundenengagement.",
}

export const dynamic = 'force-static'

export default function SocialMediaManagementPage() {
  const pricing = [
    {
      name: "Starter",
      price: "€300",
      period: "monatlich",
      features: [
        "2 Plattformen (Instagram + Facebook)",
        "8 Beiträge pro Monat (Vorlage + Kundeninhalt)",
        "Einfaches Design (Canva/Vorlagen-basiert)",
        "Hashtag und Content-Kalender-Vorschläge",
        "Monatlicher Leistungsbericht",
        "1 Revisionsrecht"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro",
      price: "€500",
      period: "monatlich",
      features: [
        "3-4 Plattformen (Instagram, Facebook, LinkedIn, TikTok Option)",
        "12-16 Beiträge pro Monat (wir erstellen Inhalte: visuell + Text)",
        "Professionelles Design (Photoshop/Illustrator, markenspezifisch)",
        "Einfache Videoinhalte (Reels / Story-Animationen)",
        "Wöchentliche Planung + regelmäßige Veröffentlichung",
        "Kommentar- und Nachrichtenüberwachung (grundlegendes Community-Management)",
        "Monatlicher detaillierter Bericht (Reichweite, Engagement, Follower-Analyse)",
        "2 Revisionsrechte"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "€750",
      period: "monatlich",
      features: [
        "Alle Pro-Dienste +",
        "4-5 Plattformen (Instagram, Facebook, LinkedIn, TikTok, YouTube)",
        "20+ Beiträge pro Monat (Foto + Video + Blog-Integration)",
        "Professionelle Videoproduktion (1-2 kurze Videos pro Monat)",
        "Influencer-Kollaborationsvorschläge",
        "A/B-Tests (Content-Performance-Tests)",
        "Werbe-Integration (Sync mit Google Ads / Meta Ads Kampagnen)",
        "Wöchentlicher Bericht + monatliches Strategietreffen",
        "3 Revisionsrechte"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "Social Media\nManagement",
    subtitle: "Effektive Social-Media-Strategie",
    description: "Wir produzieren professionelle Inhalte auf Instagram, Facebook, LinkedIn Plattformen. Wir steigern Ihre Markenbekanntheit und stärken das Kundenengagement.",
    detailDescription: "Social-Media-Management wird die Stimme Ihrer Marke in der digitalen Welt. Wir ermöglichen es Ihnen, durch strategisches Denken effektiv mit Ihrer Zielgruppe zu kommunizieren. Wir heben Ihre Marke in den sozialen Medien hervor durch professionelle Content-Produktion und Community-Management.",
    icon: "📱",
    serviceType: "sosyal-medya",
    labels: {
      detailsBadge: "Servicedetails",
      whyPrefix: "Warum",
      processBadge: "Prozess",
      processHeadingBefore: "Wie",
      processHeadingGradient: "Wir Arbeiten",
      processSubtitle: "Wir bringen Ihr Projekt Schritt für Schritt zum Leben. Wir bleiben in jeder Phase in Kontakt, um das beste Ergebnis zu gewährleisten.",
      timelineAverage: "Durchschnittliche Zeit",
      timelineSupport: "Support",
      timelineSatisfaction: "Zufriedenheit",
      pricingBadge: "Preise",
      pricingHeadingBefore: "Faire",
      pricingHeadingGradient: "Preise",
      pricingSubtitle: "Wählen Sie das richtige Paket für Ihr Projekt. Wir bieten auch maßgeschneiderte Angebote für besondere Anforderungen.",
      popularBadge: "Beliebteste",
      ctaGetOffer: "Angebot Anfordern",
      ctaOfferMessageTemplate: "Hallo! Ich möchte Informationen über den {planName}-Plan für den {serviceTitle}-Service erhalten.",
      domainNotice: undefined,
      addOnsBadge: "Zusatzleistungen",
      addOnsHeadingBefore: "Zusatz",
      addOnsHeadingGradient: "Leistungen",
      addOnsSubtitle: "Ergänzen Sie Ihr Projekt mit optionalen Zusatzleistungen. Wir bieten flexible Lösungen für besondere Anforderungen.",
      ctaGetDetails: "Details Ansehen",
      ctaAddOnMessageTemplate: "Hallo! Ich möchte Informationen über die {addOnName}-Zusatzleistung für den {serviceTitle}-Service erhalten.",
      featuresSocialMedia: [
        { title: "Content-Produktion", description: "Kreative & ansprechende Inhalte" },
        { title: "Visuelles Design", description: "Professionelle Social-Media-Grafiken" },
        { title: "Community-Management", description: "Follower-Engagement & Verwaltung" },
        { title: "Analyse & Berichterstattung", description: "Detaillierte Leistungsanalyse" },
        { title: "Strategieentwicklung", description: "Zielgruppenorientierte Strategie" },
        { title: "Schnelle Veröffentlichung", description: "Regelmäßige zeitnahe Inhalte" },
      ],
    },
    features: [
      { title: "Content-Produktion", description: "Kreativ & ansprechend", icon: "✨" },
      { title: "Visuelles Design", description: "Professionelle Grafiken", icon: "🎨" },
      { title: "Community-Management", description: "Follower-Engagement", icon: "👥" },
      { title: "Analyse & Berichterstattung", description: "Detaillierte Leistung", icon: "📊" },
    ],
    process: [
      { step: "1", title: "Strategieentwicklung", description: "Wir analysieren die Zielgruppe und erstellen eine Social-Media-Strategie." },
      { step: "2", title: "Content-Planung", description: "Wir planen monatlichen Content-Kalender und Themen." },
      { step: "3", title: "Content-Produktion", description: "Wir produzieren und veröffentlichen visuelle und Textinhalte." },
      { step: "4", title: "Überwachung & Optimierung", description: "Wir verfolgen die Leistung und verbessern die Strategie kontinuierlich." },
    ],
    addOnServices: [
      { name: "Zusätzliche Inhalte", description: "Zusätzliche Beiträge (+4)", price: "€50" },
      { name: "Professionelle Fotografie", description: "Professionelles Fotoshooting", price: "€75" },
      { name: "Influencer-Kollaboration", description: "Influencer-Kollaborationsmanagement", price: "€250" },
      { name: "Werbe-Verwaltung", description: "Werbe-Integration", price: "€200" },
      { name: "Kampagnen-Verwaltung", description: "Verlosung/Kampagnen-Management", price: "€150" },
      { name: "Wettbewerbsanalyse", description: "Monatlicher/vierteljährlicher Bericht", price: "€100" },
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
        <ServiceProcess data={serviceData} duration="1 - 3 Tage" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

