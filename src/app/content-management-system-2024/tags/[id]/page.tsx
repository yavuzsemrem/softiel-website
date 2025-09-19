import React from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { TagDetailView } from '@/components/tag-detail-view'

interface TagDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TagDetailPage({ params }: TagDetailPageProps) {
  const { id } = await params
  
  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Etiket Detayları
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base">
                  Etiket bilgilerini görüntüleyin ve yönetin
                </p>
              </div>
            </div>
          </div>
          
          <TagDetailView tagId={id} />
        </div>
      </div>
    </DashboardLayout>
  )
}