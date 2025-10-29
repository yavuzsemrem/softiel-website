import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Mobile App Entwicklung - Softiel",
  description: "iOS- und Android-App-Entwicklung. Native und plattformübergreifende Mobile-App-Lösungen.",
}

export const dynamic = 'force-static'

export default function MobileAppEntwicklungPage() {
  const serviceData = {
    title: "Mobile App\nEntwicklung",
    subtitle: "iOS & Android Apps",
    description: "Wir entwickeln iOS- und Android-Apps aus einer Codebasis. Wir bieten Lösungen vom MVP bis zum Enterprise-Level.",
    detailDescription: "Mobile Apps sind jetzt entscheidend für Unternehmen. Während Benutzer 90% ihrer Zeit auf mobilen Geräten verbringen, bietet die richtige Mobile-Strategie 24/7-Zugang zu Ihren Kunden und verschafft Ihnen einen Wettbewerbsvorteil.",
    icon: "📱",
    serviceType: "mobil-uygulama",
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
      featuresMobileApp: [
        { title: "Plattformübergreifend", description: "iOS- und Android-Apps aus einer Codebasis" },
        { title: "Schnelle Entwicklung", description: "Schnelle App-Entwicklung mit modernen plattformübergreifenden Technologien" },
        { title: "Store-Kompatibilität", description: "Apps, die App Store- und Google Play-Standards entsprechen" },
        { title: "Native Performance", description: "Hochperformantes mobiles App-Erlebnis" },
        { title: "Backend-Integration", description: "API-basierte Datenbank- und Pusher-Services" },
        { title: "Push-Benachrichtigungen", description: "Echtzeitbenachrichtigungen und Engagement-Funktionen" },
      ],
    },
    features: [
      { title: "Schnelles MVP", description: "Launch in 3-6 Wochen", icon: "⚡" },
      { title: "Einzige Codebasis", description: "iOS + Android gleichzeitig", icon: "🔄" },
      { title: "Anpassbar", description: "Module für Ihr Unternehmen", icon: "🎯" },
      { title: "Langfristiger Support", description: "Wartungsgarantie mit SLA", icon: "🛡️" },
    ],
    process: [
      { step: "1", title: "Anforderungsanalyse", description: "Wir analysieren Ihre Ideen und bestimmen die passende Lösung vom MVP bis zum Enterprise." },
      { step: "2", title: "Prototyp & Design", description: "Wir erstellen benutzerorientiertes Design und interaktive Prototypen." },
      { step: "3", title: "Kreuz-Platform", description: "Wir entwickeln iOS- und Android-Apps gleichzeitig aus einer Codebasis." },
      { step: "4", title: "Test & Store-Launch", description: "Wir führen umfassende Tests durch und veröffentlichen im App Store und Google Play." },
    ],
    pricing: [
      {
        name: "Starter (MVP)",
        price: "€2.000",
        period: "ab",
        features: [
          "iOS + Android (Flutter/React Native)",
          "Benutzeranmeldung (E-Mail/Passwort)",
          "Profilseite + Basis-CRUD",
          "Einfache Push-Benachrichtigungen",
          "Backend: Firebase/REST API",
          "1 Revisionsrunde",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro",
        price: "€3.500",
        period: "ab",
        features: [
          "Alle Starter-Funktionen",
          "Erweiterte Benutzerverwaltung (Rollen, Berechtigungen)",
          "Zahlungsintegration (Iyzico, Stripe)",
          "Karten-/standortbasierte Funktionen",
          "Echtzeitbenachrichtigungen",
          "Einfaches Admin-Panel",
          "2 Revisionsrunden",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise",
        price: "€5.000",
        period: "ab",
        features: [
          "Alle Pro-Funktionen",
          "Mehrsprachunterstützung",
          "Erweiterte Sicherheit (2FA, Verschlüsselung)",
          "Echtzeit-Chat/Socket",
          "Microservice-basiertes Backend",
          "CI/CD-Integration",
          "SLA + 6 Monate Wartung",
          "3 Revisionsrunden",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Zusätzlicher Bildschirm", description: "Neues Bildschirmdesign und -entwicklung", price: "€100" },
      { name: "Zahlungsintegration", description: "Stripe-, PayPal- oder Iyzico-Integration", price: "€300" },
      { name: "Kartendienste", description: "Google Maps, standortbasierte Funktionen", price: "€300" },
      { name: "Benachrichtigungssystem", description: "Firebase / OneSignal", price: "€200" },
      { name: "Admin-Panel-Entwicklung", description: "Webbasiertes Admin-Panel", price: "€400" },
      { name: "Store-Beratung", description: "Optimierung, ASO", price: "€200" },
      { name: "6 Monate Wartung", description: "Wartungs- und Update-Paket", price: "€100" },
      { name: "12 Monate Wartung", description: "Wartungs- und Update-Paket", price: "€200" },
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
        <ServiceProcess data={serviceData} duration="3 - 6 Wochen" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
