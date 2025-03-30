'use client'

import { BotMessageSquareIcon } from 'lucide-react'
import { CardTitle, CardHeader } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Message } from '@ai-sdk/react'
import { redirect } from 'next/navigation'

interface ChatHeaderProps {
  setInput: (input: string) => void
  setMessages: (messages: Message[]) => void
}

export function ChatHeader({ setInput, setMessages }: ChatHeaderProps) {
  const handleNewChat = () => {
    redirect('/~/chat')
  }

  return (
    <CardHeader className="flex items-center justify-between">
      <CardTitle>
        <BotMessageSquareIcon className="inline size-6 ml-4" /> Chat
      </CardTitle>
      <Tooltip>
        <TooltipContent>New chat</TooltipContent>
        <TooltipTrigger asChild>
          <Button onClick={handleNewChat} size="icon">
            <PlusIcon className="inline size-6" />
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </CardHeader>
  )
}
