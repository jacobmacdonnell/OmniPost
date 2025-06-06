"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, FileText } from "lucide-react"

interface GeneratorInputProps {
  inputText: string
  onInputChange: (value: string) => void
  onGenerate: () => void
  isGenerating: boolean
  placeholderText?: string
}

export default function GeneratorInput({
  inputText,
  onInputChange,
  onGenerate,
  isGenerating,
  placeholderText = "Paste your long-form content here... a blog post, an article, a transcript, etc.",
}: GeneratorInputProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-lg text-white">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <FileText className="h-5 w-5 text-blue-400 mr-2" />
          Input Content
        </CardTitle>
        <CardDescription className="text-slate-400 pt-1">
          Provide your long-form content below to transform it into various social media posts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-2">
          <Textarea
            placeholder={placeholderText}
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            className="bg-slate-900/80 border-slate-700 text-slate-200 min-h-[150px] focus:ring-blue-500"
            disabled={isGenerating}
          />
          <Button
            onClick={onGenerate}
            disabled={isGenerating || !inputText.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Posts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 