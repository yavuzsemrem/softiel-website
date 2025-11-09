import { DashboardLayout } from "@/components/dashboard-layout"
import { UserManagement } from "@/components/user-management"

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Kullanıcılar
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base">
                  Sistem kullanıcılarını yönetin ve yetkilendirin
                </p>
              </div>
            </div>
          </div>
          
          <UserManagement />
        </div>
      </div>
    </DashboardLayout>
  )
}





