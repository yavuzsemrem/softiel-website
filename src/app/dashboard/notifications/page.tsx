import { DashboardLayout } from "@/components/dashboard-layout"
import { NotificationsManagement } from "@/components/notifications-management"

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-500/10 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Son Aktiviteler
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base">
                  Sistemdeki tüm aktiviteleri görüntüleyin ve takip edin
                </p>
              </div>
            </div>
          </div>
          
          <NotificationsManagement />
        </div>
      </div>
    </DashboardLayout>
  )
}




