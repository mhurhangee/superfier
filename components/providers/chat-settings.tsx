"use client"

import * as React from "react"
import { createContext, useContext, useState } from "react"

// Define types for our chat settings
export interface ChatSettings {
  model: string
  persona: string
  creativity: number
  responseLength: string
}

export const modelOptions = [
  { value: "gpt-4o-mini", label: "Fast" },
  { value: "gpt-4o", label: "Slow" },
]

export type Model = 'gpt-4o' | 'gpt-4o-mini'

export const personaOptions = [
  { value: "helpful", label: "Helpful Assistant" },
  { value: "creative", label: "Creative Writer" },
  { value: "technical", label: "Technical Expert" },
  { value: "concise", label: "Concise Responder" },
  { value: "friendly", label: "Friendly Conversationalist" },
]

export const responseLengthOptions = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
  { value: "detailed", label: "Detailed" },
]

// Default settings
export const defaultSettings: ChatSettings = {
  model: "gpt-4o-mini",
  persona: "helpful",
  creativity: 0.7,
  responseLength: "medium",
}

// Helper function to get label for a value
export const getSettingLabel = (options: { value: string; label: string }[], value: string) => {
  return options.find((option) => option.value === value)?.label || value
}

// Create context type
interface ChatSettingsContextType {
  settings: ChatSettings
  updateSettings: <K extends keyof ChatSettings>(key: K, value: ChatSettings[K]) => void
  isSettingsOpen: boolean
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>
  getAIOptions: () => Record<string, any>
}

// Create context with default values
const ChatSettingsContext = createContext<ChatSettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  isSettingsOpen: true,
  setIsSettingsOpen: () => {},
  getAIOptions: () => ({}),
})

// Provider component
export function ChatSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ChatSettings>(defaultSettings)
  const [isSettingsOpen, setIsSettingsOpen] = useState(true)

  // Update settings function
  const updateSettings = <K extends keyof ChatSettings>(key: K, value: ChatSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  // Function to get options for AI SDK
  const getAIOptions = () => {
    return {
      model: settings.model,
      temperature: settings.creativity,
      persona: settings.persona,
      responseLength: settings.responseLength,
    }
  }

  return (
    <ChatSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        isSettingsOpen,
        setIsSettingsOpen,
        getAIOptions,
      }}
    >
      {children}
    </ChatSettingsContext.Provider>
  )
}

// Custom hook to use the context
export function useChatSettings() {
  const context = useContext(ChatSettingsContext)
  if (context === undefined) {
    throw new Error("useChatSettings must be used within a ChatSettingsProvider")
  }
  return context
}