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
        <div className="w-full space-y-3 transition-opacity duration-500 ease-in-out">
          <div className="flex items-center justify-between text-sm font-medium text-slate-300">
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-sky-400" />
              {getProgressMessage(progress)}
            </span>
            <span className="font-mono">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 [&>div]:bg-green-500 bg-slate-700/50 border border-slate-700" />
        </div>
      )}
      {feedback.type && (
        <Alert
          variant={feedback.type === "error" ? "destructive" : "default"}
          className={`
            ${feedback.type === "success"
              ? "bg-green-900/50 border-green-700/60 text-green-300"
              : "bg-red-900/50 border-red-700/60 text-red-300"}
            mt-4 animate-fade-in
          `}
        >
          {feedback.type === "success" ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <AlertDescription className="font-semibold">{feedback.message}</AlertDescription>
        </Alert>
      )}
    </>
  )
} 