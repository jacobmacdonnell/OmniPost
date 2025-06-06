"use client"

import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings as SettingsIcon } from "lucide-react"

export default function SettingsPage() {
  return (
    <DashboardLayout pageTitle="Application Settings">
      <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-lg text-white">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <SettingsIcon className="h-5 w-5 text-purple-400 mr-2" />
            Application Settings
          </CardTitle>
          <CardDescription className="text-slate-400 pt-1">
            Configure your application preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">Under Construction</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              This section is being developed. Here you will be able to configure your application preferences and settings.
            </p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
} 