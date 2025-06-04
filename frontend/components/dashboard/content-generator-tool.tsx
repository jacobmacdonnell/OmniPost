"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import {
  Copy,
  Loader2,
  Sparkles,
  X,
  Linkedin,
  MessageCircle,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  FileText,
  BookOpen,
  Newspaper,
  Eye,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface GeneratedPost {
  platform: "twitter" | "linkedin" | "threads" | "substack" | "medium"
  content: string
  hashtags: string[]
}

export default function ContentGeneratorTool() {
  const [inputText, setInputText] = useState("")
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

    setIsGenerating(true)
    setProgress(0)
    setGeneratedPosts([]) // Clear previous posts
    setFeedback({ type: null, message: "" })

    let progressInterval: NodeJS.Timeout | null = null

    try {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            if (progressInterval) clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

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
        body: JSON.stringify({ longFormContent: inputText }),
      })

      if (progressInterval) clearInterval(progressInterval)

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch (e) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`)
        }
        console.error("n8n API error response:", errorData)
        const errorMessage = errorData?.message || errorData?.error?.message || `API request failed with status: ${response.status}`
        throw new Error(errorMessage)
      }

      const data = await response.json()
      const n8nOutput = data.output 

      if (!n8nOutput) {
        console.error("N8N response is missing the 'output' field:", data)
        throw new Error("Invalid response structure from n8n: 'output' field missing.")
      }
      
      const newPosts: GeneratedPost[] = []
      if (n8nOutput.twitterPost && typeof n8nOutput.twitterPost === 'string') {
        newPosts.push({
          platform: "twitter",
          content: n8nOutput.twitterPost,
          hashtags: [], 
        })
      }
      if (n8nOutput.linkedinPost && typeof n8nOutput.linkedinPost === 'string') {
        newPosts.push({
          platform: "linkedin",
          content: n8nOutput.linkedinPost, 
          hashtags: [], 
        })
      }
      if (n8nOutput.threadsPost && typeof n8nOutput.threadsPost === 'string') {
        newPosts.push({
          platform: "threads",
          content: n8nOutput.threadsPost, 
          hashtags: [], 
        })
      }
      if (n8nOutput.substackPost && typeof n8nOutput.substackPost === 'string') {
        newPosts.push({
          platform: "substack",
          content: n8nOutput.substackPost,
          hashtags: [],
        })
      }
      if (n8nOutput.mediumPost && typeof n8nOutput.mediumPost === 'string') {
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
      if (progressInterval) clearInterval(progressInterval)
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

  const copyToClipboard = async (content: string, hashtags: string[], platform: string) => {
    try {
      const fullContent = `${content}\n\n${hashtags.join(" ")}`
      await navigator.clipboard.writeText(fullContent)
      toast({
        title: "Copied to Clipboard! 📋",
        description: `${platform.charAt(0).toUpperCase() + platform.slice(1)} post copied successfully.`,
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  const getPlatformIcon = (platform: string, iconColor: string) => {
    switch (platform) {
      case "twitter":
        return <X className={cn("h-4 w-4", iconColor)} />
      case "linkedin":
        return <Linkedin className={cn("h-4 w-4", iconColor)} />
      case "threads":
        return <MessageCircle className={cn("h-4 w-4", iconColor)} />
      case "substack":
        return <Newspaper className={cn("h-4 w-4", iconColor)} />
      case "medium":
        return <BookOpen className={cn("h-4 w-4", iconColor)} />
      default:
        return null
    }
  }

  const getPlatformStyles = (platform: string) => {
    switch (platform) {
      case "twitter":
        return {
          card: "border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50",
          header: "text-slate-200",
          accent: "bg-sky-500/20 text-sky-300",
          button: "hover:bg-slate-700/50 text-slate-300 hover:text-white",
          name: "Twitter",
          icon: "text-sky-400",
        }
      case "linkedin":
        return {
          card: "border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50",
          header: "text-slate-200",
          accent: "bg-blue-500/20 text-blue-300",
          button: "hover:bg-slate-700/50 text-slate-300 hover:text-white",
          name: "LinkedIn",
          icon: "text-blue-400",
        }
      case "threads":
        return {
          card: "border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50",
          header: "text-slate-200",
          accent: "bg-purple-500/20 text-purple-300",
          button: "hover:bg-slate-700/50 text-slate-300 hover:text-white",
          name: "Threads",
          icon: "text-purple-400",
        }
      case "substack":
        return {
          card: "border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50",
          header: "text-slate-200",
          accent: "bg-orange-500/20 text-orange-300",
          button: "hover:bg-slate-700/50 text-slate-300 hover:text-white",
          name: "Substack",
          icon: "text-orange-400",
        }
      case "medium":
        return {
          card: "border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50",
          header: "text-slate-200",
          accent: "bg-green-500/20 text-green-300",
          button: "hover:bg-slate-700/50 text-slate-300 hover:text-white",
          name: "Medium",
          icon: "text-green-400",
        }
      default:
        return {
          card: "border-slate-700",
          header: "text-slate-300",
          accent: "bg-slate-800 text-slate-300",
          button: "hover:bg-slate-700 text-slate-300",
          name: "",
          icon: "text-slate-400",
        }
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto"> {/* Retain max-width for content, but allow DashboardLayout to control overall padding */}
      <div className="text-center mb-6"> {/* Simplified spacing */}
        <div className="inline-flex items-center gap-2 bg-slate-800/40 border border-slate-700/50 rounded-full px-3 py-1.5 mb-4">
          <Zap className="h-3 w-3 text-yellow-400" />
          <span className="text-xs text-slate-400 font-medium">Powered by Advanced AI</span>
        </div>
        {/* Removed H2 and P from here, as pageTitle in DashboardLayout covers the main title */}
      </div>

      {/* Input Section */}
      <Card className="mb-8 border-slate-800/60 bg-slate-900/40 backdrop-blur-sm shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-white">
            <FileText className="h-5 w-5 text-blue-400" />
            Your Content
          </CardTitle>
          <CardDescription className="text-slate-400">
            Paste your blog post, article, or any long-form content below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Paste your long-form content here... (minimum 50 characters for optimal results)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="h-32 resize-none border-slate-700/50 bg-slate-800/50 text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20 transition-colors"
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-500">{inputText.length} characters</div>
          </div>

          {/* Feedback Area */}
          {feedback.type && (
            <Alert
              className={cn(
                "border",
                feedback.type === "success"
                  ? "border-green-500/20 bg-green-500/10 text-green-400"
                  : "border-red-500/20 bg-red-500/10 text-red-400",
              )}
            >
              {feedback.type === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription className="text-sm">{feedback.message}</AlertDescription>
            </Alert>
          )}

          {/* Progress Bar */}
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Generating posts...</span>
                <span className="text-slate-400">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-slate-800" />
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-slate-500">
              {inputText.length >= 50 ? (
                <span className="text-green-400">✓ Ready to generate</span>
              ) : inputText.length > 0 ? (
                <span className="text-yellow-400">Need {50 - inputText.length} more characters</span>
              ) : (
                <span>Enter your content to get started</span>
              )}
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || inputText.length < 50}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Posts
                  <ArrowRight className="ml-1 h-3 w-3" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {generatedPosts.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white">Generated Posts</h3>
            <p className="text-slate-400 mt-1">Your content has been optimized for each platform</p>
          </div>

          <div className="relative">
            {/* Posts Carousel */}
            <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              <div className="flex gap-6 min-w-max px-1">
                {generatedPosts.map((post, index) => {
                  const styles = getPlatformStyles(post.platform);
                  return (
                    <Card
                      key={index}
                      className={cn(
                        "w-[400px] border backdrop-blur-sm shadow-lg",
                        styles.card,
                      )}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between">
                          <div className={cn("flex items-center gap-2 text-sm font-semibold", styles.header)}>
                            <div className={cn("p-1.5 rounded-md", styles.accent)}>
                              {getPlatformIcon(post.platform, styles.icon)}
                            </div>
                            {styles.name}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn("h-8 w-8 p-0 rounded-md", styles.button)}
                              onClick={() => {
                                const previewWindow = window.open('', '_blank');
                                if (previewWindow) {
                                  previewWindow.document.write(`
                                    <html>
                                      <head>
                                        <title>${styles.name} Preview</title>
                                        <style>
                                          body { 
                                            font-family: system-ui, -apple-system, sans-serif;
                                            max-width: 600px;
                                            margin: 40px auto;
                                            padding: 20px;
                                            line-height: 1.6;
                                          }
                                          .content { white-space: pre-wrap; }
                                        </style>
                                      </head>
                                      <body>
                                        <div class="content">${post.content}</div>
                                      </body>
                                    </html>
                                  `);
                                }
                              }}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(post.content, post.hashtags, post.platform)}
                              className={cn("h-8 w-8 p-0 rounded-md", styles.button)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/30 h-fit">
                          <div className="space-y-3">
                            <p className="text-slate-100 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                            {post.hashtags.length > 0 && (
                              <div className="pt-2 border-t border-slate-700/30">
                                <div className="flex flex-wrap gap-1.5">
                                  {post.hashtags.map((hashtag, hashIndex) => (
                                    <span
                                      key={hashIndex}
                                      className={cn("text-xs px-2 py-1 rounded-md font-medium", styles.accent)}
                                    >
                                      {hashtag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {generatedPosts.length === 0 && !isGenerating && (
        <div className="text-center py-12">
          <div className="mx-auto w-20 h-20 bg-slate-800/50 rounded-xl flex items-center justify-center mb-4 border border-slate-700/50">
            <Sparkles className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Ready to Get Started?</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            Add your long-form content above and generate platform-optimized social media posts in seconds.
          </p>
        </div>
      )}
    </div> 
  )
} 