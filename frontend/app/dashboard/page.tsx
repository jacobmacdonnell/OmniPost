"use client"

import ContentGeneratorTool from "@/components/dashboard/content-generator-tool"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import PlanOverview from "@/components/dashboard/plan-overview"

export default function DashboardPage() {
  return (
    <DashboardLayout pageTitle="AI Post Generator">
      <div className="space-y-6">
        <PlanOverview />
        <ContentGeneratorTool />
      </div>
    </DashboardLayout>
  )
} 