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
      <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-lg text-white text-center">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-slate-400 mr-2" />
            Your Generated Posts Will Appear Here
          </CardTitle>
          <CardDescription className="text-slate-400 pt-1">
            Once you generate content, the platform-optimized posts will be displayed below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">Ready to start?</p>
        </CardContent>
      </Card>
    )
  }

  if (posts.length === 0 && isGenerating) {
    return null // Grid is hidden while generating and no posts are yet available
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
        <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
        Generated Content
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.platform} post={post} />
        ))}
      </div>
    </div>
  )
} 