import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Intégrations IA - Softiel",
  description: "Nous intégrons chatbot, apprentissage automatique, traitement du langage naturel et autres technologies IA dans votre entreprise. Nous offrons automatisation et augmentation de l'efficacité.",
}

export const dynamic = 'force-static'

export default function IntegrationsIAPage() {
  const pricing = [
    {
      name: "Starter",
      price: "€1 000",
      period: "à partir de",
      features: [
        "Intégration chatbot site web ou WhatsApp/Telegram",
        "Système de réponses basé sur FAQ (questions fréquemment posées)",
        "NLP de base (compréhension de l'intention utilisateur)",
        "Tableau de bord simple → enregistrements question-réponse",
        "1 droit de révision"
      ],
      popular: false,
      icon: "Zap",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Pro",
      price: "€2 500",
      period: "à partir de",
      features: [
        "Tout dans Starter +",
        "Intégration CRM/ERP (infos client, statut commande, requête facture)",
        "Rapports alimentés par IA (Excel, Power BI, intégration dashboard personnalisé)",
        "Systèmes de recommandation (ex. recommandations produits, upsell/cross-sell)",
        "Support multilingue (FR/TR)",
        "2 droits de révision"
      ],
      popular: true,
      icon: "Star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Enterprise",
      price: "€4 000",
      period: "à partir de",
      features: [
        "Tout dans Pro +",
        "Modèles IA personnalisés (intégration OpenAI, Azure AI, HuggingFace)",
        "Intégration assistant vocal (IVR / Voice bot)",
        "Traitement d'image (reconnaissance produit, contrôle qualité)",
        "Moteur de recommandation temps réel (optimisation publicitaire, prévision ventes)",
        "Sécurité + journalisation (conforme KVKK/RGPD)",
        "3 droits de révision + support SLA 6 mois"
      ],
      popular: false,
      icon: "Shield",
      color: "from-blue-500 to-indigo-500"
    }
  ]

  const serviceData = {
    title: "Intégrations\nIA",
    subtitle: "Technologie du Futur Aujourd'hui",
    description: "Nous intégrons chatbot, apprentissage automatique, traitement du langage naturel et autres technologies IA dans votre entreprise. Nous offrons automatisation et augmentation de l'efficacité.",
    detailDescription: "Les intégrations IA emmènent votre entreprise vers l'avenir. Nous offrons des solutions intelligentes qui optimisent vos processus métier. Nous augmentons votre efficacité avec un écosystème IA complet des chatbots à l'apprentissage automatique.",
    icon: "🤖",
    serviceType: "yapay-zeka",
    labels: {
      detailsBadge: "Détails du Service",
      whyPrefix: "Pourquoi",
      processBadge: "Processus",
      processHeadingBefore: "Comment",
      processHeadingGradient: "Nous Travaillons",
      processSubtitle: "Nous donnons vie à votre projet étape par étape. Nous restons en contact à chaque étape pour garantir le meilleur résultat.",
      timelineAverage: "Temps Moyen",
      timelineSupport: "Support",
      timelineSatisfaction: "Satisfaction",
      pricingBadge: "Tarification",
      pricingHeadingBefore: "Prix",
      pricingHeadingGradient: "Équitables",
      pricingSubtitle: "Choisissez le bon forfait pour votre projet. Nous proposons également des devis personnalisés pour des besoins spéciaux.",
      popularBadge: "Le Plus Populaire",
      ctaGetOffer: "Obtenir un Devis",
      ctaOfferMessageTemplate: "Bonjour ! Je souhaiterais obtenir des informations sur le plan {planName} pour le service {serviceTitle}.",
      domainNotice: undefined,
      addOnsBadge: "Services Supplémentaires",
      addOnsHeadingBefore: "Services",
      addOnsHeadingGradient: "Supplémentaires",
      addOnsSubtitle: "Améliorez votre projet avec des options supplémentaires. Nous offrons des solutions flexibles pour des besoins spéciaux.",
      ctaGetDetails: "Voir les Détails",
      ctaAddOnMessageTemplate: "Bonjour ! Je souhaiterais obtenir des informations sur le supplément {addOnName} pour le service {serviceTitle}.",
      featuresAI: [
        { title: "Développement de Chatbot", description: "Service client intelligent" },
        { title: "Apprentissage Automatique", description: "Analyse & prédiction de données" },
        { title: "Traitement du Langage Naturel", description: "Analyse & compréhension de texte" },
        { title: "Automatisation des Processus", description: "Automatiser les tâches routinières" },
        { title: "Traitement d'Image", description: "Analyse visuelle & reconnaissance" },
        { title: "Analyse en Temps Réel", description: "Traitement de données instantané" },
      ],
    },
    features: [
      { title: "Développement de Chatbot", description: "Service client intelligent", icon: "💬" },
      { title: "Apprentissage Automatique", description: "Analyse et prédiction de données", icon: "🧠" },
      { title: "Traitement du Langage Naturel", description: "Analyse et compréhension de texte", icon: "📝" },
      { title: "Automatisation des Processus", description: "Automatiser les tâches routinières", icon: "⚙️" },
    ],
    process: [
      { step: "1", title: "Analyse des Besoins", description: "Nous identifions les processus nécessitant des solutions IA." },
      { step: "2", title: "Sélection du Modèle", description: "Nous sélectionnons le modèle IA et la technologie les plus adaptés." },
      { step: "3", title: "Développement & Formation", description: "Nous développons et formons le système IA." },
      { step: "4", title: "Intégration & Tests", description: "Nous intégrons dans les systèmes existants et testons." },
    ],
    addOnServices: [
      { name: "Langue Supplémentaire", description: "Anglais + Allemand etc.", price: "€100" },
      { name: "Modèle Personnalisé", description: "Fine-tuning avec e-mails clients", price: "€350" },
      { name: "Contenu IA", description: "Blog, réseaux sociaux, description produit", price: "€400" },
      { name: "Traitement d'Image", description: "Images produits, contrôle qualité", price: "€900" },
      { name: "Module Assistant Vocal", description: "Intégration centre d'appels", price: "€1 000" },
      { name: "Formation Utilisateur", description: "Formation utilisation IA pour votre équipe", price: "€200" },
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
        <ServiceProcess data={serviceData} duration="2 - 4 Semaines" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

