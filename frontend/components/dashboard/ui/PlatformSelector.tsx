"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2, Twitter, Linkedin, MessageCircle, Newspaper, BookOpen } from "lucide-react"
import type { Platform, PlatformSettings } from "../content-generator-tool"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const platformOptions: {
  id: Platform
  label: string
  icon: React.ReactNode
}[] = [
  { id: "twitter", label: "Twitter", icon: <Twitter className="h-5 w-5" /> },
  { id: "linkedin", label: "LinkedIn", icon: <Linkedin className="h-5 w-5" /> },
  { id: "threads", label: "Threads", icon: <MessageCircle className="h-5 w-5" /> },
  { id: "substack", label: "Substack", icon: <Newspaper className="h-5 w-5" /> },
  { id: "medium", label: "Medium", icon: <BookOpen className="h-5 w-5" /> },
]

interface PlatformSelectorProps {
  selectedPlatforms: Platform[]
  onSelectionChange: (selected: Platform[]) => void
  settings: PlatformSettings
  onSettingsChange: (settings: PlatformSettings) => void
}

export default function PlatformSelector({
  selectedPlatforms,
  onSelectionChange,
  settings,
  onSettingsChange,
}: PlatformSelectorProps) {
  const handleCheckboxChange = (platformId: Platform) => {
    const newSelection = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter((p) => p !== platformId)
      : [...selectedPlatforms, platformId]
    onSelectionChange(newSelection)
  }

  const handleSettingChange = <T extends keyof PlatformSettings>(
    platform: T,
    key: keyof PlatformSettings[T],
    value: PlatformSettings[T][keyof PlatformSettings[T]]
  ) => {
    onSettingsChange({
      ...settings,
      [platform]: {
        ...settings[platform],
        [key]: value,
      },
    })
  }

  const renderAdvancedOptions = (platform: Platform) => {
    if (!selectedPlatforms.includes(platform)) return null

    const commonSelectTriggerStyle = "w-full h-8 text-xs bg-slate-700/60 border-slate-600 focus:ring-blue-500"
    const commonSelectContentStyle = "bg-slate-800 border-slate-700 text-white"
    const commonLabelStyle = "text-xs text-slate-400 mb-1"
    const commonContainerStyle = "mt-4 pt-4 border-t border-slate-700/60 space-y-3"
    
    const settingsForPlatform = settings[platform]

    const baseOptions = (
      <div className="space-y-3">
        {/* Style Dropdown */}
        <div>
          <Label htmlFor={`${platform}-style`} className={commonLabelStyle}>Post Style</Label>
          <Select
            value={settingsForPlatform.style}
            onValueChange={(value: "standard" | "listicle" | "thought_leadership" | "qa") => handleSettingChange(platform, "style", value)}
          >
            <SelectTrigger id={`${platform}-style`} className={commonSelectTriggerStyle}><SelectValue /></SelectTrigger>
            <SelectContent className={commonSelectContentStyle}>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="listicle">Listicle</SelectItem>
              <SelectItem value="thought_leadership">Thought Leadership</SelectItem>
              <SelectItem value="qa">Q&A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Engagement Dropdown */}
        <div>
          <Label htmlFor={`${platform}-engagement`} className={commonLabelStyle}>Engagement Tactic</Label>
          <Select
            value={settingsForPlatform.engagement}
            onValueChange={(value: "none" | "question" | "poll" | "experiences") => handleSettingChange(platform, "engagement", value)}
          >
            <SelectTrigger id={`${platform}-engagement`} className={commonSelectTriggerStyle}><SelectValue /></SelectTrigger>
            <SelectContent className={commonSelectContentStyle}>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="question">Ask a Question</SelectItem>
              <SelectItem value="poll">Suggest a Poll</SelectItem>
              <SelectItem value="experiences">Request Experiences</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Emoji Level Dropdown */}
        <div>
          <Label htmlFor={`${platform}-emoji`} className={commonLabelStyle}>Emoji Level</Label>
          <Select
            value={settingsForPlatform.emojiLevel}
            onValueChange={(value: "none" | "minimal" | "moderate" | "high") => handleSettingChange(platform, "emojiLevel", value)}
          >
            <SelectTrigger id={`${platform}-emoji`} className={commonSelectTriggerStyle}><SelectValue /></SelectTrigger>
            <SelectContent className={commonSelectContentStyle}>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    )

    let deeperOptions = null
    switch (platform) {
      case "twitter":
        deeperOptions = (
          <div>
            <Label htmlFor="twitter-format" className={commonLabelStyle}>Post Format</Label>
            <Select
              value={settings.twitter.format}
              onValueChange={(value: "auto" | "force_thread" | "single_tweet") => handleSettingChange("twitter", "format", value)}
            >
              <SelectTrigger id="twitter-format" className={commonSelectTriggerStyle}><SelectValue /></SelectTrigger>
              <SelectContent className={commonSelectContentStyle}>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="force_thread">Force Thread</SelectItem>
                <SelectItem value="single_tweet">Single Tweet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
        break
      case "substack":
      case "medium":
        const label = platform === 'substack' ? "Suggest Titles" : "Suggest Headlines"
        deeperOptions = (
          <div>
            <Label htmlFor={`${platform}-title`} className={commonLabelStyle}>{label}</Label>
            <Select
              value={settings[platform].generateTitle ? 'yes' : 'no'}
              onValueChange={(value) => handleSettingChange(platform, "generateTitle", value === 'yes')}
            >
              <SelectTrigger id={`${platform}-title`} className={commonSelectTriggerStyle}><SelectValue /></SelectTrigger>
              <SelectContent className={commonSelectContentStyle}>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
        break
    }

    return (
      <div className="mt-3 pl-8 space-y-3">
        {baseOptions}
        {deeperOptions && <div className={commonContainerStyle}>{deeperOptions}</div>}
      </div>
    )
  }

  return (
    <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-lg text-white">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Share2 className="h-5 w-5 text-green-400 mr-2" />
          Platforms & Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {platformOptions.map((platform) => (
            <div
              key={platform.id}
              className={cn(
                "p-3 rounded-lg transition-all border",
                selectedPlatforms.includes(platform.id)
                  ? "bg-slate-800/50 border-slate-700"
                  : "bg-transparent border-transparent"
              )}
            >
              <div className="flex items-center">
                <Checkbox
                  id={platform.id}
                  checked={selectedPlatforms.includes(platform.id)}
                  onCheckedChange={() => handleCheckboxChange(platform.id)}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-500"
                />
                <Label
                  htmlFor={platform.id}
                  className="flex items-center ml-3 cursor-pointer text-slate-300 w-full"
                >
                  <div className="flex-shrink-0 mr-2">{platform.icon}</div>
                  <span className="flex-grow">{platform.label}</span>
                </Label>
              </div>
              {renderAdvancedOptions(platform.id)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
