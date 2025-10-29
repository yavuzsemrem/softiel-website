import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Gestion Google Ads - Softiel",
  description: "Gestion efficace de campagnes publicitaires sur Google Ads et Meta Ads. Taux de conversion élevés à faible coût.",
}

export const dynamic = 'force-static'

export default function GestionGoogleAdsPage() {
  const serviceData = {
    title: "Gestion\nGoogle Ads",
    subtitle: "Campagnes Publicitaires Ciblées",
    description: "Nous gérons des campagnes publicitaires efficaces sur Google Ads et Meta Ads. Nous vous aidons à obtenir des taux de conversion élevés à faible coût.",
    detailDescription: "La publicité en ligne est maintenant vitale pour les entreprises. Avec la bonne stratégie de plateforme et la gestion de campagnes, vous pouvez atteindre directement vos clients et augmenter vos ventes.",
    icon: "📢",
    serviceType: "google-ads",
    labels: {
      detailsBadge: "Détails du service",
      whyPrefix: "Pourquoi",
      processBadge: "Processus",
      processHeadingBefore: "Comment",
      processHeadingGradient: "Nous travaillons",
      processSubtitle: "Nous réalisons votre projet étape par étape. À chaque phase, nous restons en contact pour garantir le meilleur résultat.",
      timelineAverage: "Durée moyenne",
      timelineSupport: "Support",
      timelineSatisfaction: "Satisfaction",
      pricingBadge: "Tarification",
      pricingHeadingBefore: "Tarifs",
      pricingHeadingGradient: "Avantageux",
      pricingSubtitle: "Choisissez le pack adapté à votre projet. Des offres sur mesure sont possibles.",
      popularBadge: "Le plus populaire",
      ctaGetOffer: "Demander un devis",
      ctaOfferMessageTemplate: "Bonjour ! Je souhaite obtenir des informations sur l'offre {planName} pour le service {serviceTitle}.",
      domainNotice: "Domaine + SSL + frais d'hébergement non inclus",
      addOnsBadge: "Services additionnels",
      addOnsHeadingBefore: "Services",
      addOnsHeadingGradient: "Additionnels",
      addOnsSubtitle: "Améliorez votre projet avec des options additionnelles. Des solutions flexibles sont proposées.",
      ctaGetDetails: "Voir les détails",
      ctaAddOnMessageTemplate: "Bonjour ! Je souhaite obtenir des informations sur l'option {addOnName} pour le service {serviceTitle}.",
      featuresGoogleAds: [
        { title: "Publicité Ciblée", description: "Atteignez le bon public avec un ciblage précis" },
        { title: "Stratégies Axées ROI", description: "Rendement élevé de chaque campagne lancée" },
        { title: "Optimisation en Temps Réel", description: "Suivi et amélioration des performances 7/24" },
        { title: "Gestion Multi-Plateformes", description: "Google Ads, Meta Ads et LinkedIn sous un même toit" },
        { title: "Mise en Place Rapide", description: "Campagnes actives sous 24 heures" },
        { title: "Analyse Détaillée des Performances", description: "Résultats de campagnes avec rapports mensuels" },
      ],
    },
    features: [
      { title: "Campagnes Ciblées", description: "Atteignez les bons clients", icon: "🎯" },
      { title: "Garantie d'augmentation du ROI", description: "Retour garanti sur votre investissement", icon: "💰" },
      { title: "Optimisation en Temps Réel", description: "Suivi de campagne 7/24", icon: "⚡" },
      { title: "Design Professionnel", description: "Y compris visuels publicitaires", icon: "🎨" },
    ],
    process: [
      { step: "1", title: "Analyse de la Cible", description: "Nous analysons votre public cible et déterminons les canaux les plus efficaces." },
      { step: "2", title: "Conception de Campagne", description: "Nous créons textes publicitaires, visuels et stratégie de ciblage." },
      { step: "3", title: "Optimisation", description: "Nous optimisons continuellement les campagnes et améliorons les performances." },
      { step: "4", title: "Reporting", description: "Nous suivons les résultats avec des rapports de performance détaillés." },
    ],
    pricing: [
      {
        name: "Starter (Gestion de Base)",
        price: "€300",
        period: "mois",
        features: [
          "Google Ads ou Meta Ads (un seul canal)",
          "Mise en place de campagne (Recherche/Affichage/Instagram-Facebook)",
          "Paramètres de ciblage (localisation, démographie, mots-clés)",
          "Textes publicitaires de base + visuels (si fournis par le client)",
          "1 rapport mensuel (performance de base)",
          "1 révision / modification",
        ],
        popular: false,
        icon: "Zap",
        color: "from-green-500 to-emerald-500"
      },
      {
        name: "Pro (Gestion Optimisée)",
        price: "€500",
        period: "mois",
        features: [
          "Google Ads + Meta Ads (2 canaux gérés ensemble)",
          "2-3 campagnes (recherche + remarketing + réseaux sociaux)",
          "Textes publicitaires + design visuel (de notre part)",
          "Tests A/B (titres, CTA)",
          "Optimisation hebdomadaire (budget, ciblage)",
          "Rapport mensuel détaillé (CTR, conversion, analyse des coûts)",
          "2 révisions / modifications",
        ],
        popular: true,
        icon: "Star",
        color: "from-yellow-500 to-orange-500"
      },
      {
        name: "Enterprise (Gestion Stratégique)",
        price: "€750",
        period: "mois",
        features: [
          "Gestion multi-canaux (Google Ads + Meta + LinkedIn)",
          "5+ campagnes (recherche, affichage, remarketing, vidéo, annonces de leads)",
          "Designs publicitaires professionnels (visuels + vidéos inclus)",
          "Planification entonnoir de conversion (optimisation landing page incluse)",
          "Reporting hebdomadaire + réunion stratégique mensuelle",
          "Tests A/B mensuels et optimisation continue",
          "Adapté aux projets avec budget publicitaire supérieur à €2.000",
          "3 révisions / modifications",
        ],
        popular: false,
        icon: "Shield",
        color: "from-blue-500 to-indigo-500"
      }
    ],
    addOnServices: [
      { name: "Canal Supplémentaire", description: "LinkedIn/TikTok/Twitter – canal", price: "€100/mois" },
      { name: "Design visuel professionnel", description: "Bannière, post social – par pièce", price: "€50" },
      { name: "Production vidéo publicitaire", description: "YouTube/Reels/TikTok – vidéo", price: "€75" },
      { name: "Design landing page", description: "Orienté conversion – par page", price: "€300" },
      { name: "Conseil funnel de conversion", description: "Intégration CRM, suivi des leads", price: "€150" },
      { name: "Rapport Concurrents", description: "Ponctuel", price: "€75" },
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
        <ServiceProcess data={serviceData} duration="1 - 5 Jours" />
        <ServicePricing data={serviceData} showAddOnServices={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
