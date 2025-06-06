"use client"

import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCog } from "lucide-react"

export default function AccountPage() {
  return (
    <DashboardLayout pageTitle="Account Management">
      <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-lg text-white">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <UserCog className="h-5 w-5 text-blue-400 mr-2" />
            Account Details
          </CardTitle>
          <CardDescription className="text-slate-400 pt-1">
            Manage your profile and subscription settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">Under Construction</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              This section is being developed. Soon, you'll be able to manage your account details, subscription, and billing information here.
            </p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
} 