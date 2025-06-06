"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Copy, Linkedin, MessageCircle, Newspaper, BookOpen, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface GeneratedPost {
  platform: "twitter" | "linkedin" | "threads" | "substack" | "medium"
  content: string
  hashtags: string[]
}

interface PostCardProps {
  post: GeneratedPost
}

const platformStyles = {
  twitter: {
    card: "border-sky-900/50 bg-sky-950/30 hover:border-sky-700/70",
    header: "text-sky-300",
    accent: "bg-sky-500/10 text-sky-300",
    button: "text-sky-300 hover:bg-sky-900/50 hover:text-sky-200",
    name: "Twitter",
    icon: <X className="h-5 w-5 text-sky-400" />,
  },
  linkedin: {
    card: "border-blue-900/50 bg-blue-950/30 hover:border-blue-700/70",
    header: "text-blue-300",
    accent: "bg-blue-500/10 text-blue-300",
    button: "text-blue-300 hover:bg-blue-900/50 hover:text-blue-200",
    name: "LinkedIn",
    icon: <Linkedin className="h-5 w-5 text-blue-400" />,
  },
  threads: {
    card: "border-purple-900/50 bg-purple-950/30 hover:border-purple-700/70",
    header: "text-purple-300",
    accent: "bg-purple-500/10 text-purple-300",
    button: "text-purple-300 hover:bg-purple-900/50 hover:text-purple-200",
    name: "Threads",
    icon: <MessageCircle className="h-5 w-5 text-purple-400" />,
  },
  substack: {
    card: "border-orange-900/50 bg-orange-950/30 hover:border-orange-700/70",
    header: "text-orange-300",
    accent: "bg-orange-500/10 text-orange-300",
    button: "text-orange-300 hover:bg-orange-900/50 hover:text-orange-200",
    name: "Substack",
    icon: <Newspaper className="h-5 w-5 text-orange-400" />,
  },
  medium: {
    card: "border-emerald-900/50 bg-emerald-950/30 hover:border-emerald-700/70",
    header: "text-emerald-300",
    accent: "bg-emerald-500/10 text-emerald-300",
    button: "text-emerald-300 hover:bg-emerald-900/50 hover:text-emerald-200",
    name: "Medium",
    icon: <BookOpen className="h-5 w-5 text-emerald-400" />,
  },
}

export default function PostCard({ post }: PostCardProps) {
  const { toast } = useToast()
  const styles = platformStyles[post.platform]

  const copyToClipboard = async () => {
    try {
      const fullContent = `${post.content}\n\n${post.hashtags.join(" ")}`
      await navigator.clipboard.writeText(fullContent)
      toast({
        title: "Copied to Clipboard! 📋",
        description: `${styles.name} post copied successfully.`,
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className={cn("transition-all duration-300 backdrop-blur-sm shadow-lg", styles.card)}>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className={cn("text-md font-bold flex items-center", styles.header)}>
          {styles.icon}
          <span className="ml-2">{styles.name}</span>
        </CardTitle>
        <Button size="icon" variant="ghost" className={cn("h-8 w-8 rounded-full", styles.button)} onClick={copyToClipboard}>
          <Copy className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-base text-slate-200 whitespace-pre-wrap leading-relaxed">{post.content}</p>
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.hashtags.map((tag) => (
              <span key={tag} className={cn("text-sm font-medium px-3 py-1 rounded-full", styles.accent)}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 