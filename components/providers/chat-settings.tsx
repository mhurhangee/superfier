'use client'

import {
  UserCircle,
  Sparkles,
  Code,
  Scale,
  Atom,
  BookOpen,
  Briefcase,
  HeartHandshake,
  Rabbit,
  Turtle,
  Target,
  PenLine,
  FileText,
  Glasses,
} from 'lucide-react'

import * as React from 'react'
import { createContext, useContext, useState } from 'react'

// Define types for our chat settings
export interface ChatSettings {
  model: string
  persona: string
  creativity: string
  responseLength: string
}

export const modelOptions = [
  {
    value: 'gpt-4o-mini',
    label: 'Speed',
    description: 'Faster responses, less quality',
    icon: <Rabbit className="h-4 w-4" />,
  },
  {
    value: 'gpt-4o',
    label: 'Quality',
    description: 'Slower responses, better quality',
    icon: <Turtle className="h-4 w-4" />,
  },
]

export type Model = 'gpt-4o' | 'gpt-4o-mini'

export const personaOptions = [
  {
    value: 'helpful',
    label: 'Helpful Assistant',
    description: 'A helpful assistant',
    icon: <UserCircle className="h-4 w-4" />,
  },
  {
    value: 'creative',
    label: 'Creative Writer',
    description: 'A creative writer',
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    value: 'technical',
    label: 'Technical Expert',
    description: 'A technical expert',
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    value: 'serious',
    label: 'Serious Assistant',
    description: 'A serious assistant',
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    value: 'playful',
    label: 'Playful Assistant',
    description: 'A playful assistant',
    icon: <HeartHandshake className="h-4 w-4" />,
  },
  {
    value: 'developer',
    label: 'Developer',
    description: 'A developer',
    icon: <Code className="h-4 w-4" />,
  },
  {
    value: 'legal',
    label: 'Legal Expert',
    description: 'A legal expert',
    icon: <Scale className="h-4 w-4" />,
  },
  {
    value: 'friendly',
    label: 'Friendly Assistant',
    description: 'A friendly assistant',
    icon: <HeartHandshake className="h-4 w-4" />,
  },
  {
    value: 'scientific',
    label: 'Scientific Expert',
    description: 'A scientific expert',
    icon: <Atom className="h-4 w-4" />,
  },
  {
    value: 'nerd',
    label: 'Geek/Nerd',
    description: 'Tech enthusiast with detailed knowledge',
    icon: <Glasses className="h-4 w-4" />,
  },
]

export const responseLengthOptions = [
  {
    value: 'short',
    label: 'Short',
    description: 'Concise and brief answers',
    icon: <PenLine className="h-4 w-4" />,
  },
  {
    value: 'balanced',
    label: 'Balanced',
    description: 'Moderate depth and length',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    value: 'detailed',
    label: 'Detailed',
    description: 'Comprehensive and thorough',
    icon: <BookOpen className="h-4 w-4" />,
  },
]

export const creativityOptions = [
  {
    value: 'low',
    label: 'Focused',
    description: 'Deterministic and precise responses',
    icon: <Target className="h-4 w-4" />,
  },
  {
    value: 'mid',
    label: 'Balanced',
    description: 'Blend of accuracy and creativity',
    icon: <Scale className="h-4 w-4" />,
  },
  {
    value: 'high',
    label: 'Creative',
    description: 'Innovative and explorative thinking',
    icon: <Sparkles className="h-4 w-4" />,
  },
]

// Default settings
export const defaultSettings: ChatSettings = {
  model: 'gpt-4o-mini',
  persona: 'helpful',
  creativity: 'mid',
  responseLength: 'balanced',
}

// Helper function to get label for a value
export const getSettingLabel = (
  options: { value: string; label: string; icon: React.ReactNode }[],
  value: string
) => {
  const option = options.find((option) => option.value === value)
  const icon = option?.icon || null
  const label = option?.label || value
  return icon + label
}

// Create context type
interface ChatSettingsContextType {
  settings: ChatSettings
  updateSettings: <K extends keyof ChatSettings>(key: K, value: ChatSettings[K]) => void
  isSettingsOpen: boolean
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>
  getAIOptions: () => Record<string, unknown>
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
      creativity: settings.creativity,
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
    throw new Error('useChatSettings must be used within a ChatSettingsProvider')
  }
  return context
}
