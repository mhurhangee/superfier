'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, PlusCircle, Settings, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  useChatSettings,
  modelOptions,
  personaOptions,
  responseLengthOptions,
  creativityOptions,
} from '@/components/providers/chat-settings'
import { handleNewChat } from '@/lib/handle-new-chat'
import { handleDeleteChat } from '@/lib/handle-delete-chat'
import { useRouter, usePathname } from 'next/navigation'

interface ChatHeaderProps {
  title?: string
  onTitleChange?: (title: string) => void
}

export function ChatHeader({ title = 'New Chat', onTitleChange = () => {} }: ChatHeaderProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [chatTitle, setChatTitle] = React.useState(title)
  const router = useRouter()
  const chatId = usePathname().split('/').pop() || ''
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
    <div className="w-full flex flex-col">
      {/* Main Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="flex items-center gap-1 h-8 px-2"
              >
                {isSettingsOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <Settings className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isSettingsOpen ? 'Hide settings' : 'Show settings'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteChat(chatId, router)}
                aria-label="Delete Chat"
              >
                <Trash2 className="h-5 w-5 text-destructive" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete Chat</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNewChat(router)}
                aria-label="New Chat"
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {/* Model Setting */}
              <Tooltip>
                <DropdownMenu>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 gap-2 px-3">
                        {modelOptions.find((option) => option.value === settings.model)?.icon}
                        <span className="font-normal">
                          {modelOptions.find((option) => option.value === settings.model)?.label ||
                            settings.model}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>AI Model</TooltipContent>
                  <DropdownMenuContent align="start">
                    {modelOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onSelect={() => updateSettings('model', option.value)}
                      >
                        {option.icon}
                        {option.label}
                        <span className="inline-block text-xs text-muted-foreground">
                          {option.description}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </Tooltip>

              {/* Persona Setting */}
              <Tooltip>
                <DropdownMenu>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 gap-2 px-3">
                        {personaOptions.find((option) => option.value === settings.persona)?.icon}
                        <span className="font-normal">
                          {personaOptions.find((option) => option.value === settings.persona)
                            ?.label || settings.persona}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Persona</TooltipContent>
                  <DropdownMenuContent align="start">
                    {personaOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onSelect={() => updateSettings('persona', option.value)}
                      >
                        {option.icon}
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </Tooltip>

              {/* Creativity Setting */}
              <Tooltip>
                <DropdownMenu>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 gap-2 px-3">
                        {
                          creativityOptions.find((option) => option.value === settings.creativity)
                            ?.icon
                        }
                        <span className="font-normal">
                          {creativityOptions.find((option) => option.value === settings.creativity)
                            ?.label || settings.creativity}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Creativity</TooltipContent>
                  <DropdownMenuContent align="start">
                    {creativityOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onSelect={() => updateSettings('creativity', option.value)}
                      >
                        {option.icon}
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </Tooltip>

              {/* Response Length Setting */}
              <Tooltip>
                <DropdownMenu>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 gap-2 px-3">
                        {
                          responseLengthOptions.find(
                            (option) => option.value === settings.responseLength
                          )?.icon
                        }
                        <span className="font-normal">
                          {responseLengthOptions.find(
                            (option) => option.value === settings.responseLength
                          )?.label || settings.responseLength}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Response Length</TooltipContent>
                  <DropdownMenuContent align="start">
                    {responseLengthOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onSelect={() => updateSettings('responseLength', option.value)}
                      >
                        {option.icon}
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </Tooltip>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
