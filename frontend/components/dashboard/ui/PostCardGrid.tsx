"use client"

import PostCard, { GeneratedPost } from "./PostCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface PostCardGridProps {
  posts: GeneratedPost[]
  isGenerating: boolean
}

export default function PostCardGrid({ posts, isGenerating }: PostCardGridProps) {
  if (posts.length === 0 && !isGenerating) {
    return (
      <Card className="border-2 border-dashed border-slate-700/80 bg-slate-900/50 backdrop-blur-sm shadow-lg text-white text-center flex items-center justify-center min-h-[200px]">
        <div className="p-8">
          <Sparkles className="h-10 w-10 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300">
            Your Generated Posts Will Appear Here
          </h3>
          <p className="text-slate-400 mt-2">
            Once you generate content, the platform-optimized posts will be displayed below.
          </p>
        </div>
      </Card>
    )
  }

  if (posts.length === 0 && isGenerating) {
    return null // Grid is hidden while generating and no posts are yet available
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
        <Sparkles className="h-6 w-6 text-green-400 mr-3" />
        Generated Content
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div
            key={post.platform}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  )
} 