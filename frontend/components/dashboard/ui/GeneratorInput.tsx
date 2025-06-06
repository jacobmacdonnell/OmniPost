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
  const wordCount = inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length
  const charCount = inputText.length
  const countColor = charCount < 50 ? "text-yellow-400" : "text-green-400"

  return (
    <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-lg text-white">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <FileText className="h-5 w-5 text-sky-400 mr-2" />
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
            className="bg-slate-800/80 border-slate-700 text-slate-200 min-h-[180px] text-base rounded-md focus:ring-sky-500 focus:border-sky-500 transition-all duration-300"
            disabled={isGenerating}
          />
          <div className="flex justify-between items-center mt-2">
            <div className={`text-sm ${countColor} font-mono`}>
              <span>{wordCount} Words</span> / <span>{charCount} Characters</span>
            </div>
            <Button
              onClick={onGenerate}
              disabled={isGenerating || !inputText.trim()}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
              {isGenerating ? "Generating..." : "Generate Posts"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 