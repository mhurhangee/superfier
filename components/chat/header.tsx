"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircle, Trash2, UserCircle, Sparkles, AlignJustify, ChevronUp, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  useChatSettings,
  modelOptions,
  personaOptions,
  responseLengthOptions,
  getSettingLabel,
} from "@/components/providers/chat-settings"

interface ChatHeaderProps {
  title?: string
  onNewChat?: () => void
  onDeleteChat?: () => void
  onTitleChange?: (title: string) => void
}

export function ChatHeader({
  title = "New Chat",
  onNewChat = () => {},
  onDeleteChat = () => {},
  onTitleChange = () => {},
}: ChatHeaderProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [chatTitle, setChatTitle] = React.useState(title)

  // Use the chat settings context
  const { settings, updateSettings, isSettingsOpen, setIsSettingsOpen } = useChatSettings()

  // Handle title edit
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatTitle(e.target.value)
  }

  const handleTitleSubmit = () => {
    setIsEditing(false)
    onTitleChange(chatTitle)
  }

  return (
    <div className="w-full">
        {/* Main Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onNewChat} aria-label="New Chat">
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>New Chat</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {isEditing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleTitleSubmit()
                }}
                className="flex items-center"
              >
                <Input
                  value={chatTitle}
                  onChange={handleTitleChange}
                  className="h-9 w-[200px]"
                  autoFocus
                  onBlur={handleTitleSubmit}
                />
              </form>
            ) : (
              <motion.h1
                className="text-lg font-medium truncate max-w-[200px] sm:max-w-xs cursor-pointer hover:underline"
                onClick={() => setIsEditing(true)}
                title={chatTitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {chatTitle}
              </motion.h1>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="flex items-center gap-1 h-8 px-2"
            >
              {isSettingsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onDeleteChat} aria-label="Delete Chat">
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete Chat</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Settings Panel */}
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
                    <DropdownMenu>
                      <TooltipTrigger asChild> 
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 gap-2 px-3">
                          {modelOptions.find(option => option.value === settings.model)?.icon}
                          <span className="font-normal">
                            {modelOptions.find(option => option.value === settings.model)?.label || settings.model}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent>Chat odel</TooltipContent>
                      <DropdownMenuContent align="start">
                        {modelOptions.map((option) => (
                          <DropdownMenuItem key={option.value} onSelect={() => updateSettings("model", option.value)}>
                            {option.icon}
                            {option.label}
                            <span className="inline-block text-xs text-muted-foreground">{option.description}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                        <p>Persona: </p>
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
                        <p>Length: </p>
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
    </div>
  )
}