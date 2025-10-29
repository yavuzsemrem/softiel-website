import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "KI-Integrationen - Softiel",
  description: "Wir integrieren Chatbot, maschinelles Lernen, natürliche Sprachverarbeitung und andere KI-Technologien in Ihr Unternehmen. Wir bieten Automatisierung und Effizienzsteigerung.",
}

export const dynamic = 'force-static'

export default function KIIntegrationenPage() {
  const pricing = [
    {
      name: "Starter",
      price: "€1.000",
      period: "ab",
      features: [
        "Website oder WhatsApp/Telegram Chatbot-Integration",
        "FAQ (häufig gestellte Fragen) basiertes Antwortsystem",
        "Grundlegende NLP (Benutzerabsicht verstehen)",
        "Einfaches Dashboard → Frage-Antwort-Aufzeichnungen",
        "1 Revisionsrecht"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro",
      price: "€2.500",
      period: "ab",
      features: [
        "Alles im Starter +",
        "CRM/ERP-Integration (Kundeninfo, Bestellstatus, Rechnungsabfrage)",
        "KI-gestützte Berichterstattung (Excel, Power BI, benutzerdefinierte Dashboard-Integration)",
        "Empfehlungssysteme (z.B. Produktempfehlungen, Upsell/Cross-Sell)",
        "Mehrsprachige Unterstützung (DE/TR)",
        "2 Revisionsrechte"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "€4.000",
      period: "ab",
      features: [
        "Alles im Pro +",
        "Benutzerdefinierte KI-Modelle (OpenAI, Azure AI, HuggingFace Integration)",
        "Sprachassistenten-Integration (IVR / Voice Bot)",
        "Bildverarbeitung (Produkterkennung, Qualitätskontrolle)",
        "Echtzeit-Empfehlungsmotor (Anzeigenoptimierung, Verkaufsprognose)",
        "Sicherheit + Protokollierung (KVKK/DSGVO konform)",
        "3 Revisionsrechte + 6 Monate SLA-Support"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "KI\nIntegrationen",
    subtitle: "Zukunftstechnologie Heute",
    description: "Wir integrieren Chatbot, maschinelles Lernen, natürliche Sprachverarbeitung und andere KI-Technologien in Ihr Unternehmen. Wir bieten Automatisierung und Effizienzsteigerung.",
    detailDescription: "KI-Integrationen bringen Ihr Unternehmen in die Zukunft. Wir bieten intelligente Lösungen, die Ihre Geschäftsprozesse optimieren. Wir steigern Ihre Effizienz mit einem umfassenden KI-Ökosystem von Chatbots bis zum maschinellen Lernen.",
    icon: "🤖",
    serviceType: "yapay-zeka",
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
      featuresAI: [
        { title: "Chatbot-Entwicklung", description: "Intelligenter Kundenservice" },
        { title: "Maschinelles Lernen", description: "Datenanalyse & Vorhersage" },
        { title: "Natürliche Sprachverarbeitung", description: "Textanalyse & Verständnis" },
        { title: "Geschäftsprozessautomatisierung", description: "Routinetätigkeiten automatisieren" },
        { title: "Bildverarbeitung", description: "Visuelle Analyse & Erkennung" },
        { title: "Echtzeitanalyse", description: "Sofortige Datenverarbeitung" },
      ],
    },
    features: [
      { title: "Chatbot-Entwicklung", description: "Intelligenter Kundenservice", icon: "💬" },
      { title: "Maschinelles Lernen", description: "Datenanalyse und Vorhersage", icon: "🧠" },
      { title: "Natürliche Sprachverarbeitung", description: "Textanalyse und Verständnis", icon: "📝" },
      { title: "Geschäftsprozessautomatisierung", description: "Routinetätigkeiten automatisieren", icon: "⚙️" },
    ],
    process: [
      { step: "1", title: "Bedürfnisanalyse", description: "Wir identifizieren Prozesse, die KI-Lösungen erfordern." },
      { step: "2", title: "Modellauswahl", description: "Wir wählen das am besten geeignete KI-Modell und die Technologie." },
      { step: "3", title: "Entwicklung & Training", description: "Wir entwickeln und trainieren das KI-System." },
      { step: "4", title: "Integration & Tests", description: "Wir integrieren in bestehende Systeme und testen." },
    ],
    addOnServices: [
      { name: "Sprachunterstützung", description: "Englisch + Deutsch usw.", price: "€100" },
      { name: "Datenmodelltraining", description: "Fine-Tuning mit Kunden-E-Mails", price: "€350" },
      { name: "KI-Inhaltserstellung", description: "Blog, Social Media, Produktbeschreibung", price: "€400" },
      { name: "Bildverarbeitungsmodul", description: "Produktbilder, Qualitätskontrolle", price: "€900" },
      { name: "Sprachassistenten-Modul", description: "Callcenter-Integration", price: "€1.000" },
      { name: "Benutzerschulung", description: "KI-Nutzungsschulung für Ihr Team", price: "€200" },
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
        <ServiceProcess data={serviceData} duration="2 - 4 Wochen" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

