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

    switch (platform) {
      case "twitter":
        return (
          <div className="mt-3 pl-8 space-y-2">
            <Label htmlFor="twitter-format" className={commonLabelStyle}>
              Post Format
            </Label>
            <Select
              value={settings.twitter.format}
              onValueChange={(value: "auto" | "force_thread" | "single_tweet") =>
                handleSettingChange("twitter", "format", value)
              }
            >
              <SelectTrigger id="twitter-format" className={commonSelectTriggerStyle}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={commonSelectContentStyle}>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="force_thread">Force Thread</SelectItem>
                <SelectItem value="single_tweet">Single Tweet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      case "linkedin":
        return (
          <div className="mt-3 pl-8 space-y-3">
            <div>
              <Label htmlFor="linkedin-style" className={commonLabelStyle}>
                Post Style
              </Label>
              <Select
                value={settings.linkedin.style}
                onValueChange={(value: "standard" | "thought_leadership" | "listicle") =>
                  handleSettingChange("linkedin", "style", value)
                }
              >
                <SelectTrigger id="linkedin-style" className={commonSelectTriggerStyle}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={commonSelectContentStyle}>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="thought_leadership">Thought Leadership</SelectItem>
                  <SelectItem value="listicle">Listicle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="linkedin-include-question"
                checked={settings.linkedin.includeQuestion}
                onCheckedChange={(checked) => handleSettingChange("linkedin", "includeQuestion", !!checked)}
              />
              <Label htmlFor="linkedin-include-question" className="text-xs text-slate-400">
                Include Engaging Question
              </Label>
            </div>
          </div>
        )
      case "threads":
        return (
          <div className="mt-3 pl-8 space-y-3">
            <div>
              <Label htmlFor="threads-emoji-usage" className={commonLabelStyle}>
                Emoji Usage
              </Label>
              <Select
                value={settings.threads.emojiUsage}
                onValueChange={(value: "none" | "minimal" | "moderate" | "high") =>
                  handleSettingChange("threads", "emojiUsage", value)
                }
              >
                <SelectTrigger id="threads-emoji-usage" className={commonSelectTriggerStyle}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={commonSelectContentStyle}>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="threads-engagement-prompt" className={commonLabelStyle}>
                Engagement Prompt
              </Label>
              <Select
                value={settings.threads.engagementPrompt}
                onValueChange={(value: "none" | "ask_question" | "request_experiences") =>
                  handleSettingChange("threads", "engagementPrompt", value)
                }
              >
                <SelectTrigger id="threads-engagement-prompt" className={commonSelectTriggerStyle}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={commonSelectContentStyle}>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="ask_question">Ask a Question</SelectItem>
                  <SelectItem value="request_experiences">Request Experiences</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case "substack":
      case "medium":
        const settingsKey = platform
        const isSubstack = settingsKey === "substack"
        const angleValue = settings[settingsKey].repurposeAngle
        const suggestValue = isSubstack
          ? settings.substack.suggestTitles
          : settings.medium.suggestHeadlines

        return (
          <div className="mt-3 pl-8 space-y-3">
            <div>
              <Label htmlFor={`${settingsKey}-repurpose-angle`} className={commonLabelStyle}>
                Repurpose Angle
              </Label>
              <Select
                value={angleValue}
                onValueChange={(value: "summary" | "deep_dive" | "opinion_piece") =>
                  handleSettingChange(settingsKey, "repurposeAngle", value)
                }
              >
                <SelectTrigger id={`${settingsKey}-repurpose-angle`} className={commonSelectTriggerStyle}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={commonSelectContentStyle}>
                  <SelectItem value="summary">Summary</SelectItem>
                  <SelectItem value="deep_dive">Deep Dive</SelectItem>
                  <SelectItem value="opinion_piece">Opinion Piece</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`${settingsKey}-suggest-titles`}
                checked={suggestValue}
                onCheckedChange={(checked) => {
                  if (isSubstack) {
                    handleSettingChange("substack", "suggestTitles", !!checked)
                  } else {
                    handleSettingChange("medium", "suggestHeadlines", !!checked)
                  }
                }}
              />
              <Label htmlFor={`${settingsKey}-suggest-titles`} className="text-xs text-slate-400">
                Suggest Titles/Headlines
              </Label>
            </div>
          </div>
        )
      default:
        return null
    }
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
