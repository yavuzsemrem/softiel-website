import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Metadata } from "next"

// Sadece ağır bileşenleri lazy load et
const LazyHomeContent = dynamic(() => import("@/components/lazy-home-content"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-slate-800 animate-pulse" />
})

export const metadata: Metadata = {
  title: "Softiel - Modern Web Agency | Web Design & Digital Marketing",
  description: "Make a difference in the digital world with Softiel. Web design, web development, SEO optimization and digital marketing services. Softiel Software - Modern Web Agency.",
  keywords: [
    "Softiel",
    "Softiel Software",
    "web design",
    "web development",
    "SEO",
    "digital marketing",
    "mobile app development",
    "artificial intelligence",
    "web agency"
  ],
  alternates: {
    canonical: 'https://softiel.com/en',
    languages: {
      'tr': 'https://softiel.com/tr',
      'en': 'https://softiel.com/en',
      'de': 'https://softiel.com/de',
      'fr': 'https://softiel.com/fr',
      'ru': 'https://softiel.com/ru',
      'ar': 'https://softiel.com/ar',
    },
  },
  openGraph: {
    title: "Softiel - Modern Web Agency",
    description: "Make a difference in the digital world with Softiel. Web design, development, SEO and digital marketing services.",
    url: "https://softiel.com/en",
    siteName: "Softiel",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: 'https://softiel.com/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Softiel Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Softiel - Modern Web Agency',
    description: 'Make a difference in the digital world with Softiel.',
    images: ['https://softiel.com/android-chrome-512x512.png'],
  },
}

export default function Home() {
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
        
        <Hero />
        <LazyHomeContent />
      </main>
    </div>
  )
}
