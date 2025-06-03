"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Zap, ExternalLink } from "lucide-react"

export default function PlanOverview() {
  // Placeholder data - this would come from user data/API later
  const currentPlan = "Pro Tier"
  const postsGenerated = 72
  const postsLimit = 100
  const usagePercentage = (postsGenerated / postsLimit) * 100

  return (
    <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-lg text-white w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Zap className="h-5 w-5 text-yellow-400 mr-2" />
            Your Plan Overview
          </CardTitle>
          <Button variant="outline" size="sm" className="border-slate-700 hover:bg-slate-800/70 text-xs">
            Manage Subscription
            <ExternalLink className="h-3 w-3 ml-1.5" />
          </Button>
        </div>
        <CardDescription className="text-slate-400 pt-1">Current status of your OmniPost.ai usage.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-slate-300">
              Current Plan: <span className="font-semibold text-blue-400">{currentPlan}</span>
            </p>
            <p className="text-sm text-slate-400">
              {postsGenerated} / <span className="font-semibold">{postsLimit}</span> posts used
            </p>
          </div>
          <Progress value={usagePercentage} className="h-2 bg-slate-700/50 border border-slate-700" />
          <p className="text-xs text-slate-500 mt-1 text-right">Renews in X days</p> {/* Placeholder for renewal info */}
        </div>
      </CardContent>
    </Card>
  )
} 