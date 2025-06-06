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

    switch (platform) {
      case "twitter":
        return (
          <div className="flex items-center space-x-2 mt-2 ml-auto">
            <Checkbox
              id="twitter-thread-mode"
              checked={settings.twitter.threadMode === "thread"}
              onCheckedChange={(checked) =>
                handleSettingChange("twitter", "threadMode", checked ? "thread" : "auto")
              }
            />
            <Label htmlFor="twitter-thread-mode" className="text-xs text-slate-400">
              Force Thread
            </Label>
          </div>
        )
      case "linkedin":
        return (
          <div className="flex items-center space-x-2 mt-2 ml-auto">
            <Checkbox
              id="linkedin-include-question"
              checked={settings.linkedin.includeQuestion}
              onCheckedChange={(checked) =>
                handleSettingChange("linkedin", "includeQuestion", !!checked)
              }
            />
            <Label htmlFor="linkedin-include-question" className="text-xs text-slate-400">
              Include Question
            </Label>
          </div>
        )
      case "threads":
        return (
          <div className="flex items-center space-x-2 mt-2 ml-auto">
            <Label htmlFor="threads-emoji-level" className="text-xs text-slate-400">
              Emoji Level:
            </Label>
            <Select
              value={settings.threads.emojiLevel}
              onValueChange={(value: "none" | "minimal" | "moderate") =>
                handleSettingChange("threads", "emojiLevel", value)
              }
            >
              <SelectTrigger className="w-[100px] h-7 text-xs bg-slate-700 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
              </SelectContent>
            </Select>
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
          Select Platforms
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {platformOptions.map((platform) => (
            <div
              key={platform.id}
              className={cn(
                "p-3 rounded-lg transition-all",
                selectedPlatforms.includes(platform.id) ? "bg-slate-800/50" : "bg-transparent"
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
                {renderAdvancedOptions(platform.id)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 