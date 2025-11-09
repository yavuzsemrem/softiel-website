import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardHero } from "@/components/dashboard-hero"
import { DashboardQuickActions } from "@/components/dashboard-quick-actions"
import { DashboardRecentContent } from "@/components/dashboard-recent-content"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-200 dark:bg-cyan-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-200 dark:bg-sky-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        {/* Dashboard Hero */}
        <DashboardHero />

        {/* Quick Actions */}
        <DashboardQuickActions />

        {/* Recent Content */}
        <DashboardRecentContent />
      </div>
    </DashboardLayout>
  )
}
