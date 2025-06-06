"use client"

import ContentGeneratorTool from "@/components/dashboard/content-generator-tool"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import PlanOverview from "@/components/dashboard/plan-overview"

export default function DashboardPage() {
  return (
    <DashboardLayout pageTitle="AI Post Generator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ContentGeneratorTool />
        </div>
        <div className="lg:col-span-1">
          <PlanOverview />
        </div>
      </div>
    </DashboardLayout>
  )
} 