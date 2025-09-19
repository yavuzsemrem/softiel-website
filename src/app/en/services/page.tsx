import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/services-hero"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { CTA } from "@/components/cta"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <Header />
      <main>
        <ServicesHero />
        <Services />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
