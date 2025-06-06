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
    card: "border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50",
    header: "text-slate-200",
    accent: "bg-sky-500/20 text-sky-300",
    button: "hover:bg-slate-700/50 text-slate-300 hover:text-white",
    name: "Twitter",
    icon: <X className="h-4 w-4 text-sky-400" />,
  },
  linkedin: {
    card: "border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50",
    header: "text-slate-200",
    accent: "bg-blue-500/20 text-blue-300",
    button: "hover:bg-slate-700/50 text-slate-300 hover:text-white",
    name: "LinkedIn",
    icon: <Linkedin className="h-4 w-4 text-blue-400" />,
  },
  threads: {
    card: "border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50",
    header: "text-slate-200",
    accent: "bg-purple-500/20 text-purple-300",
    button: "hover:bg-slate-700/50 text-slate-300 hover:text-white",
    name: "Threads",
    icon: <MessageCircle className="h-4 w-4 text-purple-400" />,
  },
  substack: {
    card: "border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50",
    header: "text-slate-200",
    accent: "bg-orange-500/20 text-orange-300",
    button: "hover:bg-slate-700/50 text-slate-300 hover:text-white",
    name: "Substack",
    icon: <Newspaper className="h-4 w-4 text-orange-400" />,
  },
  medium: {
    card: "border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50",
    header: "text-slate-200",
    accent: "bg-green-500/20 text-green-300",
    button: "hover:bg-slate-700/50 text-slate-300 hover:text-white",
    name: "Medium",
    icon: <BookOpen className="h-4 w-4 text-green-400" />,
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
    <Card className={cn("transition-all duration-300", styles.card)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className={cn("text-sm font-medium flex items-center", styles.header)}>
          {styles.icon}
          <span className="ml-2">{styles.name}</span>
        </CardTitle>
        <Button size="icon" variant="ghost" className={cn("h-7 w-7", styles.button)} onClick={copyToClipboard}>
          <Copy className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-300 whitespace-pre-wrap">{post.content}</p>
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.hashtags.map((tag) => (
              <span key={tag} className={cn("text-xs px-2 py-1 rounded-full", styles.accent)}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 