"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Wand2 } from "lucide-react"
import type { Tone, Industry } from "../content-generator-tool"

const toneOptions: { id: Tone; name: string }[] = [
  { id: "professional", name: "Professional" },
  { id: "casual", name: "Casual" },
  { id: "expert", name: "Expert" },
  { id: "engaging", name: "Engaging" },
]

const industryOptions: { id: Industry; name: string }[] = [
  { id: "technology", name: "Technology" },
  { id: "marketing", name: "Marketing" },
  { id: "finance", name: "Finance" },
  { id: "healthcare", name: "Healthcare" },
  { id: "education", name: "Education" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "saas", name: "SaaS" },
  { id: "consulting", name: "Consulting" },
  { id: "other", name: "Other/General" },
]

interface CustomizationControlsProps {
  selectedTone: Tone
  onToneChange: (tone: Tone) => void
  selectedIndustry: Industry
  onIndustryChange: (industry: Industry) => void
}

export default function CustomizationControls({
  selectedTone,
  onToneChange,
  selectedIndustry,
  onIndustryChange,
}: CustomizationControlsProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-lg text-white">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Wand2 className="h-5 w-5 text-purple-400 mr-2" />
          Customize AI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="tone-select" className="text-slate-400">Tone of Voice</Label>
          <Select value={selectedTone} onValueChange={onToneChange}>
            <SelectTrigger id="tone-select" className="w-full bg-slate-800 border-slate-700">
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              {toneOptions.map((option) => (
                <SelectItem key={option.id} value={option.id} className="cursor-pointer focus:bg-slate-700">
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry-select" className="text-slate-400">Industry / Niche</Label>
          <Select value={selectedIndustry} onValueChange={onIndustryChange}>
            <SelectTrigger id="industry-select" className="w-full bg-slate-800 border-slate-700">
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              {industryOptions.map((option) => (
                <SelectItem key={option.id} value={option.id} className="cursor-pointer focus:bg-slate-700">
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
} 