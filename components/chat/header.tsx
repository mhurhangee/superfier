'use client'

import { BotMessageSquareIcon } from 'lucide-react'
import { CardTitle, CardHeader } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { handleNewChat } from '@/lib/handle-new-chat'
import { useRouter } from 'next/navigation'

export function ChatHeader() {
  const router = useRouter()

  return (
    <CardHeader className="flex items-center justify-between">
      <CardTitle>
        <BotMessageSquareIcon className="inline size-6 ml-4" /> Chat
      </CardTitle>
      <Tooltip>
        <TooltipContent>New chat</TooltipContent>
        <TooltipTrigger asChild>
          <Button onClick={() => handleNewChat(router)} size="icon">
            <PlusIcon className="inline size-6" />
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </CardHeader>
  )
}
