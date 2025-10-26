"use client"

import React, { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReferencesHero } from "@/components/references-hero"
import { ReferencesGrid } from "@/components/references-grid"
import { ReferencesFilter } from "@/components/references-filter"
import { CTA } from "@/components/cta"

export default function ReferencesPage() {
  const [filters, setFilters] = useState({
    category: "all",
    search: "",
    sortBy: "newest"
  })
  const [projectCounts, setProjectCounts] = useState<{ [category: string]: number }>({})
  const [totalProjects, setTotalProjects] = useState(0)

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  const handleProjectCountsChange = (counts: { [category: string]: number }, total: number) => {
    setProjectCounts(counts)
    setTotalProjects(total)
  }

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
        
        <ReferencesHero />
        <ReferencesGrid 
          filters={filters} 
          onProjectCountsChange={handleProjectCountsChange}
        />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
