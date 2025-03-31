'use client'

import { BotMessageSquareIcon, PlusIcon, Trash, Settings, Sparkles, AlignJustify, Cpu, UserCircle, ChevronUp } from 'lucide-react'
import { CardTitle, CardHeader } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { handleNewChat } from '@/lib/handle-new-chat'
import { handleDeleteChat } from '@/lib/handle-delete-chat'
import { useRouter, usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

// Define options for each setting
const modelOptions = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "claude-3-opus", label: "Claude 3 Opus" },
  { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
]

const personaOptions = [
  { value: "helpful", label: "Helpful Assistant" },
  { value: "creative", label: "Creative Writer" },
  { value: "technical", label: "Technical Expert" },
  { value: "concise", label: "Concise Responder" },
  { value: "friendly", label: "Friendly Conversationalist" },
]

const responseLengthOptions = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
  { value: "detailed", label: "Detailed" },
]

// Define types for our chat settings
interface ChatSettings {
  model: string
  persona: string
  creativity: number
  responseLength: string
}

export function ChatHeader() {
  const router = useRouter()
  const chatId = usePathname().split('/').pop() || ''
  const [isSettingsOpen, setIsSettingsOpen] = useState(true)
    // Initialize settings with default values
    const [settings, setSettings] = useState<ChatSettings>({
      model: "gpt-4o",
      persona: "helpful",
      creativity: 0.7,
      responseLength: "medium",
    })
  
      // Get label for a value
  const getLabel = (options: { value: string; label: string }[], value: string) => {
    return options.find((option) => option.value === value)?.label || value
  }

  const updateSettings = (key: keyof ChatSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>
          <BotMessageSquareIcon className="inline size-6 ml-4" /> Chat
        </CardTitle>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipContent>{isSettingsOpen ? "Hide settings" : "Show settings"}</TooltipContent>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                {isSettingsOpen ? <ChevronUp className="inline size-4" /> : <Settings className="inline size-4" />}
              </Button>
            </TooltipTrigger>
          </Tooltip>
          <Tooltip>
            <TooltipContent>Delete chat</TooltipContent>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" onClick={() => handleDeleteChat(chatId, router)}>
                <Trash className="inline size-4 text-red-500" />
              </Button>
            </TooltipTrigger>
          </Tooltip>
          <Tooltip>
            <TooltipContent>New chat</TooltipContent>
            <TooltipTrigger asChild>
              <Button onClick={() => handleNewChat(router)} size="icon">
                <PlusIcon className="inline size-4" />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </div>
      </div>
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-3 py-2 mt-1">
                  {/* Model Setting */}
                  <Tooltip>
                    <Popover>
                      <PopoverTrigger asChild>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="h-9 gap-2 px-3">
                            <Cpu className="h-4 w-4" />
                            <span className="font-normal">
                              {settings.model === "gpt-4o"
                                ? "GPT-4o"
                                : settings.model === "gpt-4-turbo"
                                  ? "GPT-4 Turbo"
                                  : settings.model === "gpt-3.5-turbo"
                                    ? "GPT-3.5"
                                    : settings.model.includes("claude")
                                      ? "Claude"
                                      : "AI"}
                            </span>
                          </Button>
                        </TooltipTrigger>
                      </PopoverTrigger>
                      <TooltipContent side="bottom">
                        <p>Model: {getLabel(modelOptions, settings.model)}</p>
                      </TooltipContent>
                      <PopoverContent className="w-[200px] p-0" align="center">
                        <div className="p-2 font-medium border-b">Select Model</div>
                        <div className="p-2">
                          <Select value={settings.model} onValueChange={(value) => updateSettings("model", value)}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                              {modelOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </Tooltip>

                  {/* Persona Setting */}
                  <Tooltip>
                    <Popover>
                      <PopoverTrigger asChild>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="h-9 gap-2 px-3">
                            <UserCircle className="h-4 w-4" />
                            <span className="font-normal">
                              {settings.persona === "helpful"
                                ? "Helpful"
                                : settings.persona === "creative"
                                  ? "Creative"
                                  : settings.persona === "technical"
                                    ? "Technical"
                                    : settings.persona === "concise"
                                      ? "Concise"
                                      : "Friendly"}
                            </span>
                          </Button>
                        </TooltipTrigger>
                      </PopoverTrigger>
                      <TooltipContent side="bottom">
                        <p>Persona: {getLabel(personaOptions, settings.persona)}</p>
                      </TooltipContent>
                      <PopoverContent className="w-[200px] p-0" align="center">
                        <div className="p-2 font-medium border-b">Select Persona</div>
                        <div className="p-2">
                          <Select value={settings.persona} onValueChange={(value) => updateSettings("persona", value)}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select persona" />
                            </SelectTrigger>
                            <SelectContent>
                              {personaOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </Tooltip>

                  {/* Creativity Setting */}
                  <Tooltip>
                    <Popover>
                      <PopoverTrigger asChild>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="h-9 gap-2 px-3">
                            <Sparkles className="h-4 w-4" />
                            <span className="font-normal">{Math.round(settings.creativity * 100)}%</span>
                          </Button>
                        </TooltipTrigger>
                      </PopoverTrigger>
                      <TooltipContent side="bottom">
                        <p>Creativity: {Math.round(settings.creativity * 100)}%</p>
                      </TooltipContent>
                      <PopoverContent className="w-[200px] p-0" align="center">
                        <div className="p-2 font-medium border-b">Adjust Creativity</div>
                        <div className="p-4">
                          <Slider
                            min={0}
                            max={1}
                            step={0.1}
                            value={[settings.creativity]}
                            onValueChange={(value) => updateSettings("creativity", value[0])}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>Conservative</span>
                            <span>Creative</span>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </Tooltip>

                  {/* Response Length Setting */}
                  <Tooltip>
                    <Popover>
                      <PopoverTrigger asChild>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="h-9 gap-2 px-3">
                            <AlignJustify className="h-4 w-4" />
                            <span className="font-normal">
                              {settings.responseLength === "short"
                                ? "Short"
                                : settings.responseLength === "medium"
                                  ? "Medium"
                                  : settings.responseLength === "long"
                                    ? "Long"
                                    : "Detailed"}
                            </span>
                          </Button>
                        </TooltipTrigger>
                      </PopoverTrigger>
                      <TooltipContent side="bottom">
                        <p>Length: {getLabel(responseLengthOptions, settings.responseLength)}</p>
                      </TooltipContent>
                      <PopoverContent className="w-[200px] p-0" align="center">
                        <div className="p-2 font-medium border-b">Response Length</div>
                        <div className="p-2">
                          <Select
                            value={settings.responseLength}
                            onValueChange={(value) => updateSettings("responseLength", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select length" />
                            </SelectTrigger>
                            <SelectContent>
                              {responseLengthOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </Tooltip>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </CardHeader>
  )
}
