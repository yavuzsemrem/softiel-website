import dynamic from "next/dynamic"

// Bileşenleri lazy load et - bfcache için SSR aktif
const Header = dynamic(() => import("@/components/header").then(mod => ({ default: mod.Header })), {
  ssr: true,
  loading: () => <div className="h-16 bg-slate-800 animate-pulse" />
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  ssr: true,
  loading: () => <div className="h-32 bg-slate-800 animate-pulse" />
})

const ContactHero = dynamic(() => import("@/components/contact-hero").then(mod => ({ default: mod.ContactHero })), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse" />
})

const ContactForm = dynamic(() => import("@/components/contact-form").then(mod => ({ default: mod.ContactForm })), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse" />
})

const Map = dynamic(() => import("@/components/map").then(mod => ({ default: mod.Map })), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse" />
})

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black dark:from-slate-800 dark:via-slate-900 dark:via-slate-950 dark:via-black dark:to-black">
      <Header />
      <main className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-200 dark:bg-cyan-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-200 dark:bg-sky-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <ContactHero />
        <ContactForm />
        <Map />
      </main>
      <Footer />
    </div>
  )
}
