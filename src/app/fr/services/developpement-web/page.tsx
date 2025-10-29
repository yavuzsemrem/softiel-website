import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceHero } from "@/components/service-hero"
import { ServiceDetails } from "@/components/service-details"
import { ServiceProcess } from "@/components/service-process"
import { ServicePricing } from "@/components/service-pricing"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Développement d’applications web - Softiel",
  description: "Applications web modernes avec React, Next.js et Node.js. Services professionnels de développement web.",
}

export const dynamic = 'force-static'

export default function DeveloppementWebPage() {
  const serviceData = {
    title: "Développement d’applications web",
    subtitle: "Des solutions sur mesure",
    description: "Nous développons des applications web personnalisées avec des technologies modernes. Des solutions conviviales, rapides et sécurisées pour des résultats professionnels.",
    detailDescription: "Les applications web sont devenues essentielles pour les entreprises. Avec la bonne approche et les bonnes technologies, vous augmentez la satisfaction client et l’efficacité opérationnelle.",
    icon: "💻",
    serviceType: "web-gelistirme",
    labels: {
      detailsBadge: "Détails du service",
      whyPrefix: "Pourquoi",
      processBadge: "Processus",
      processHeadingBefore: "Comment",
      processHeadingGradient: "Nous travaillons",
      processSubtitle: "Nous livrons votre projet étape par étape avec des tests et retours continus.",
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
      domainNotice: "Domaine + SSL + frais d’hébergement non inclus",
      addOnsBadge: "Services additionnels",
      addOnsHeadingBefore: "Services",
      addOnsHeadingGradient: "Additionnels",
      addOnsSubtitle: "Améliorez votre projet avec des options additionnelles. Des solutions flexibles sont proposées.",
      ctaGetDetails: "Voir les détails",
      ctaAddOnMessageTemplate: "Bonjour ! Je souhaite obtenir des informations sur l’option {addOnName} pour le service {serviceTitle}.",
      featuresWebDevelopment: [
        { title: "Solution sur mesure", description: "Parfaite adéquation à vos besoins" },
        { title: "Intégrations", description: "ERP, CRM, paiements, API" },
        { title: "Scalabilité", description: "Prêt pour la croissance" },
        { title: "Sécurité & Vitesse", description: "Frameworks modernes, haute performance" },
        { title: "Intégration Base de Données", description: "Compatibilité complète avec tous les systèmes de base de données" },
        { title: "Approche API First", description: "Architecture microservices et REST API pour un développement orienté avenir" },
      ],
    },
    features: [
      { title: "Solution sur mesure", description: "Parfaite adéquation à vos besoins", icon: "🎯" },
      { title: "Intégrations", description: "ERP, CRM, paiements, API", icon: "🔗" },
      { title: "Scalabilité", description: "Prêt pour la croissance", icon: "📈" },
      { title: "Sécurité & Vitesse", description: "Frameworks modernes, haute performance", icon: "⚡" },
    ],
    process: [
      { step: "1", title: "Analyse des besoins", description: "Nous analysons vos besoins et définissons le périmètre." },
      { step: "2", title: "Choix du stack", description: "Nous choisissons le meilleur stack et concevons l’architecture." },
      { step: "3", title: "Développement agile", description: "Itérations avec tests et retours continus." },
      { step: "4", title: "Déploiement & Maintenance", description: "Mise en production et support long terme." },
    ],
    pricing: [
      { name: "Starter", price: "€1 500", period: "à partir de", features: [
        "Apps CRUD simples",
        "Auth avec rôles et permissions",
        "UI responsive",
        "Rapports de base (tables, graphiques)",
        "1 intégration (ex. e‑mail ou SMS API)",
        "1 tour de révision",
      ], popular: false, icon: "Zap", color: "from-green-500 to-emerald-500" },
      { name: "Pro", price: "€2 750", period: "à partir de", features: [
        "Tableau de bord et modules complets",
        "Gestion multi‑rôles & permissions",
        "Rapports avancés (graphiques, filtres, export)",
        "2–3 intégrations (ERP, CRM, paiements)",
        "Sécurité renforcée (2FA, logging)",
        "2 tours de révision",
      ], popular: true, icon: "Star", color: "from-yellow-500 to-orange-500" },
      { name: "Enterprise", price: "€4 500", period: "à partir de", features: [
        "Solutions d’entreprise à grande échelle",
        "Support multi‑utilisateurs",
        "Contrôle d’accès avancé (RBAC, LDAP, SSO)",
        "Architecture microservices / API‑first",
        "Scalabilité (équilibrage, cache)",
        "Intégration CI/CD",
        "SLA + 3–6 mois de maintenance",
        "3 tours de révision",
      ], popular: false, icon: "Shield", color: "from-blue-500 to-indigo-500" },
    ],
    addOnServices: [
      { name: "Module Additionnel", description: "Modules supplémentaires pour vos processus", price: "€300" },
      { name: "Progressive Web App", description: "Application hors‑ligne adaptée mobile", price: "€400" },
      { name: "Analytics / BI", description: "Intégration BI", price: "€300" },
      { name: "Sécurité Avancée", description: "Pen‑test et journalisation", price: "€300" },
      { name: "Mise en place CI/CD", description: "Pipeline GitHub Actions", price: "€200" },
      { name: "Backup / Monitoring", description: "Sauvegardes automatiques & monitoring", price: "€150/mois" },
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
        <ServiceProcess data={serviceData} duration="2 - 4 Semaines" />
        <ServicePricing data={serviceData} showDomainNotice={true} showAddOnServices={true} serviceType="web-gelistirme" />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}


