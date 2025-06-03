"use client"

import ContentGeneratorTool from "@/components/dashboard/content-generator-tool"
import DashboardLayout from "@/components/dashboard/dashboard-layout"

export default function DashboardPage() {
  return (
    <DashboardLayout pageTitle="AI Post Generator">
      <ContentGeneratorTool />
    </DashboardLayout>
  )
} 