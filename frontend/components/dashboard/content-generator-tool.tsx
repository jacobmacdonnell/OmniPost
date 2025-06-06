"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import GeneratorInput from "@/components/dashboard/ui/GeneratorInput"
import GenerationProgress from "@/components/dashboard/ui/GenerationProgress"
import PostCardGrid from "@/components/dashboard/ui/PostCardGrid"
import type { GeneratedPost } from "@/components/dashboard/ui/PostCard"
import PlatformSelector from "@/components/dashboard/ui/PlatformSelector"
import CustomizationControls from "@/components/dashboard/ui/CustomizationControls"

export type Platform = "twitter" | "linkedin" | "threads" | "substack" | "medium"
export type Tone = "professional" | "casual" | "expert" | "engaging" | "custom"
export type Industry =
  | "technology"
  | "marketing"
  | "finance"
  | "healthcare"
  | "education"
  | "ecommerce"
  | "saas"
  | "consulting"
  | "other"

export interface PlatformSettings {
  twitter: {
    format: "auto" | "force_thread" | "single_tweet"
  }
  linkedin: {
    style: "standard" | "thought_leadership" | "listicle"
    includeQuestion: boolean
  }
  threads: {
    emojiUsage: "none" | "minimal" | "moderate" | "high"
    engagementPrompt: "none" | "ask_question" | "request_experiences"
  }
  substack: {
    repurposeAngle: "summary" | "deep_dive" | "opinion_piece"
    suggestTitles: boolean
  }
  medium: {
    repurposeAngle: "summary" | "deep_dive" | "opinion_piece"
    suggestHeadlines: boolean
  }
}

export default function ContentGeneratorTool() {
  const [inputText, setInputText] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["twitter", "linkedin", "threads"])
  const [selectedTone, setSelectedTone] = useState<Tone>("professional")
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>("technology")
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    twitter: { format: "auto" },
    linkedin: { style: "standard", includeQuestion: true },
    threads: { emojiUsage: "moderate", engagementPrompt: "ask_question" },
    substack: { repurposeAngle: "summary", suggestTitles: true },
    medium: { repurposeAngle: "summary", suggestHeadlines: true },
  })
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setFeedback({ type: "error", message: "Please enter some long-form content to transform." })
      return
    }

    if (inputText.length < 50) {
      setFeedback({
        type: "error",
        message: "Content is too short. Please provide at least 50 characters for better results.",
      })
      return
    }

    if (selectedPlatforms.length === 0) {
      setFeedback({
        type: "error",
        message: "Please select at least one platform to generate content for.",
      })
      return
    }

    setIsGenerating(true)
    setProgress(0)
    setGeneratedPosts([])
    setFeedback({ type: null, message: "" })

    let progressInterval: NodeJS.Timeout | null = null
    const SIMULATION_TARGET_PERCENT = 95
    const SIMULATION_INTERVAL_MS = 300
    const SIMULATION_INCREMENT = 2

    try {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= SIMULATION_TARGET_PERCENT) {
            if (progressInterval) {
              clearInterval(progressInterval)
              progressInterval = null
            }
            return SIMULATION_TARGET_PERCENT
          }

          let newProgress = prev + SIMULATION_INCREMENT
          if (newProgress >= SIMULATION_TARGET_PERCENT) {
            newProgress = SIMULATION_TARGET_PERCENT
            if (progressInterval) {
              clearInterval(progressInterval)
              progressInterval = null
            }
          }
          return newProgress
        })
      }, SIMULATION_INTERVAL_MS)

      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
      if (!webhookUrl) {
        console.error("N8N webhook URL is not configured. Please set NEXT_PUBLIC_N8N_WEBHOOK_URL in .env.local")
        throw new Error("Application configuration error: Webhook URL is missing.")
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longFormContent: inputText,
          platforms: selectedPlatforms,
          userSelectedTone: selectedTone,
          userSelectedIndustry: selectedIndustry,
          platformSettings: platformSettings,
        }),
      })

      if (progressInterval) {
        clearInterval(progressInterval)
        progressInterval = null
      }

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch (e) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`)
        }
        console.error("n8n API error response:", errorData)
        const errorMessage =
          errorData?.message || errorData?.error?.message || `API request failed with status: ${response.status}`
        throw new Error(errorMessage)
      }

      const data = await response.json()
      const n8nOutput = data.output

      if (!n8nOutput) {
        console.error("N8N response is missing the 'output' field:", data)
        throw new Error("Invalid response structure from n8n: 'output' field missing.")
      }

      const newPosts: GeneratedPost[] = []
      if (n8nOutput.twitterPost && typeof n8nOutput.twitterPost === "string") {
        newPosts.push({
          platform: "twitter",
          content: n8nOutput.twitterPost,
          hashtags: [],
        })
      }
      if (n8nOutput.linkedinPost && typeof n8nOutput.linkedinPost === "string") {
        newPosts.push({
          platform: "linkedin",
          content: n8nOutput.linkedinPost,
          hashtags: [],
        })
      }
      if (n8nOutput.threadsPost && typeof n8nOutput.threadsPost === "string") {
        newPosts.push({
          platform: "threads",
          content: n8nOutput.threadsPost,
          hashtags: [],
        })
      }
      if (n8nOutput.substackPost && typeof n8nOutput.substackPost === "string") {
        newPosts.push({
          platform: "substack",
          content: n8nOutput.substackPost,
          hashtags: [],
        })
      }
      if (n8nOutput.mediumPost && typeof n8nOutput.mediumPost === "string") {
        newPosts.push({
          platform: "medium",
          content: n8nOutput.mediumPost,
          hashtags: [],
        })
      }

      if (newPosts.length === 0) {
        console.warn("N8N response processed, but no valid posts found in the output:", n8nOutput)
        throw new Error("No posts were generated. The n8n workflow might not have produced the expected output.")
      }

      setGeneratedPosts(newPosts)
      setProgress(100)
      setFeedback({ type: "success", message: `Successfully generated ${newPosts.length} platform-optimized posts!` })
      toast({
        title: "Posts Generated Successfully! ✨",
        description: "Your content has been transformed into platform-specific posts.",
      })
    } catch (error: any) {
      if (progressInterval) {
        clearInterval(progressInterval)
        progressInterval = null
      }
      setProgress(0)
      console.error("Error in handleGenerate:", error)
      setFeedback({
        type: "error",
        message: error.message || "Generation failed. Please check the console for details or try again.",
      })
      toast({
        title: "Generation Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <GeneratorInput
        inputText={inputText}
        onInputChange={setInputText}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PlatformSelector
          selectedPlatforms={selectedPlatforms}
          onSelectionChange={setSelectedPlatforms}
          settings={platformSettings}
          onSettingsChange={setPlatformSettings}
        />
        <CustomizationControls
          selectedTone={selectedTone}
          onToneChange={setSelectedTone}
          selectedIndustry={selectedIndustry}
          onIndustryChange={setSelectedIndustry}
        />
      </div>
      <div className="px-4">
        <GenerationProgress
            isGenerating={isGenerating}
            progress={progress}
            feedback={feedback}
        />
      </div>

      <PostCardGrid posts={generatedPosts} isGenerating={isGenerating} />
    </div>
  )
} 