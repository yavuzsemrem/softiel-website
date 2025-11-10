import dynamic from "next/dynamic"

const Header = dynamic(() => import("@/components/header").then(mod => ({ default: mod.Header })), {
  ssr: true,
  loading: () => <div className="h-16 bg-slate-800 animate-pulse" />
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  ssr: true,
  loading: () => <div className="h-64 bg-slate-900 animate-pulse" />
})

const NotFoundHero = dynamic(() => import("@/components/not-found-hero").then(mod => ({ default: mod.NotFoundHero })), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse" />
})

const NotFoundContent = dynamic(() => import("@/components/not-found-content").then(mod => ({ default: mod.NotFoundContent })), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse" />
})

export default function NotFoundPageRU() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 via-slate-900 via-slate-950 to-black dark:from-slate-800 dark:via-slate-900 dark:via-slate-950 dark:via-black dark:to-black">
      <Header />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-200 dark:bg-red-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-200 dark:bg-orange-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-yellow-200 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        <NotFoundHero lang="ru" />
        <NotFoundContent lang="ru" />
      </main>
      <Footer />
    </div>
  )
}












