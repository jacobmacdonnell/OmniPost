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
  Twitter,
  Linkedin,
  MessageCircle,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface GeneratedPost {
  platform: "twitter" | "linkedin" | "threads"
  content: string
  hashtags: string[]
}

export default function OmniPostAI() {
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
    setFeedback({ type: null, message: "" })

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setProgress(100)

      // Mock generated posts with more realistic content
      const mockPosts: GeneratedPost[] = [
        {
          platform: "twitter",
          content:
            "🚀 Just discovered something game-changing about AI-powered content creation!\n\nThe future of social media is here and it's transforming how we share ideas across platforms.\n\nWhat started as a simple blog post can now become engaging content for every platform. Thread below 👇",
          hashtags: ["#AI", "#ContentCreation", "#SocialMedia", "#Innovation", "#TechTrends"],
        },
        {
          platform: "linkedin",
          content:
            "In today's rapidly evolving digital landscape, the ability to efficiently repurpose long-form content across multiple platforms has become a critical competitive advantage.\n\n🎯 Key insights I've discovered:\n\n→ Consistency across platforms drives 3x more engagement\n→ Platform-specific optimization increases reach by 150%\n→ AI-powered content transformation saves 80% of manual effort\n→ Authentic voice preservation is crucial for brand integrity\n\nThe future of content marketing isn't just about creating more—it's about creating smarter.\n\nWhat's your experience with content repurposing? Share your thoughts below.",
          hashtags: ["#DigitalMarketing", "#ContentStrategy", "#AI", "#BusinessGrowth", "#MarketingAutomation"],
        },
        {
          platform: "threads",
          content:
            "Can we talk about how AI is revolutionizing content creation? 🤯\n\nSeriously, the possibilities are endless when you can transform one piece of long-form content into multiple engaging posts tailored for each platform.\n\nI just tried this new approach and the results are mind-blowing. Each platform gets content that actually fits its vibe and audience.\n\nWhat's your experience with AI tools for content? Are you using any? Drop your thoughts below! 👇",
          hashtags: ["#AI", "#ContentCreation", "#Threads", "#Discussion", "#CreatorEconomy"],
        },
      ]

      setGeneratedPosts(mockPosts)
      setFeedback({ type: "success", message: "Successfully generated 3 platform-optimized posts from your content!" })

      toast({
        title: "Posts Generated Successfully! ✨",
        description: "Your content has been transformed into platform-specific posts.",
      })
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Generation failed. Please try again or contact support if the issue persists.",
      })
      toast({
        title: "Generation Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
      setProgress(0)
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
        return <Twitter className={cn("h-4 w-4", iconColor)} />
      case "linkedin":
        return <Linkedin className={cn("h-4 w-4", iconColor)} />
      case "threads":
        return <MessageCircle className={cn("h-4 w-4", iconColor)} />
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
    <div className="min-h-screen bg-slate-950">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/20 via-slate-950 to-slate-950"></div>

      {/* Header */}
      <header className="border-b border-slate-800/60 bg-slate-950/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  OmniPost.ai
                </h1>
                <p className="text-xs text-slate-500">AI Content Transformation</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs">AI Ready</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-6 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-slate-800/40 border border-slate-700/50 rounded-full px-3 py-1.5 mb-4">
            <Zap className="h-3 w-3 text-yellow-400" />
            <span className="text-xs text-slate-400 font-medium">Powered by Advanced AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Transform Content into
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Platform-Perfect Posts
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Turn your long-form content into engaging, platform-optimized social media posts for Twitter, LinkedIn, and
            Threads.
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm shadow-xl">
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
              <h3 className="text-2xl font-bold text-white mb-2">Generated Posts</h3>
              <p className="text-slate-400">Click the copy button to copy each post with hashtags</p>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              {generatedPosts.map((post, index) => {
                const styles = getPlatformStyles(post.platform)
                return (
                  <Card
                    key={index}
                    className={cn(
                      "border transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm shadow-lg hover:shadow-xl",
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(post.content, post.hashtags, post.platform)}
                          className={cn("h-8 w-8 p-0 rounded-md transition-colors", styles.button)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/30">
                        <div className="space-y-3">
                          <p className="text-slate-100 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
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
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-xl mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm">
            <div className="text-slate-400">
              <p>© 2024 OmniPost.ai - Transform your content, amplify your reach</p>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <Zap className="h-3 w-3 text-yellow-400" />
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
