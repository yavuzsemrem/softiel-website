import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Stats } from "@/components/stats"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <Header />
      <main className="w-full overflow-x-hidden">
        <Hero />
        <Stats />
        <Services />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

