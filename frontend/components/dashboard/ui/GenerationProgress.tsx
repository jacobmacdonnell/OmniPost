"use client"

import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface GenerationProgressProps {
  isGenerating: boolean
  progress: number
  feedback: {
    type: "success" | "error" | null
    message: string
  }
}

export default function GenerationProgress({ isGenerating, progress, feedback }: GenerationProgressProps) {
  const getProgressMessage = (progress: number) => {
    if (progress < 20) return "Warming up the AI..."
    if (progress < 50) return "Analyzing content structure..."
    if (progress < 80) return "Generating platform-specific posts..."
    if (progress < 100) return "Finalizing and polishing..."
    return "Done!"
  }

  return (
    <>
      {isGenerating && (
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {getProgressMessage(progress)}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-slate-700/50 border border-slate-700" />
        </div>
      )}
      {feedback.type && (
        <Alert
          variant={feedback.type === "error" ? "destructive" : "default"}
          className={
            feedback.type === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }
        >
          {feedback.type === "success" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{feedback.message}</AlertDescription>
        </Alert>
      )}
    </>
  )
} 