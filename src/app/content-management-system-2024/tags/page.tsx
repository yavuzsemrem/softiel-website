import { DashboardLayout } from "@/components/dashboard-layout"
import { TagManagement } from "@/components/tag-management"

export default function TagsPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Etiketler
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base">
                  Blog etiketlerini oluşturun, düzenleyin ve yönetin
                </p>
              </div>
            </div>
          </div>
          
          <TagManagement />
        </div>
      </div>
    </DashboardLayout>
  )
}





