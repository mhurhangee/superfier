'use client'

import { BotMessageSquareIcon, PlusIcon, Trash } from 'lucide-react'
import { CardTitle, CardHeader } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { handleNewChat } from '@/lib/handle-new-chat'
import { handleDeleteChat } from '@/lib/handle-delete-chat'
import { usePathname, useRouter } from 'next/navigation'

export function ChatHeader() {
  const router = useRouter()
  const chatId = usePathname().split('/').pop() || ''

  return (
    <CardHeader className="flex items-center justify-between">
      <CardTitle>
        <BotMessageSquareIcon className="inline size-6 ml-4" /> Chat
      </CardTitle>
      <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipContent>
          Delete chat
        </TooltipContent>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" onClick={() => handleDeleteChat(chatId, router)}>
            <Trash className="inline size-6" />
          </Button>
        </TooltipTrigger>
      </Tooltip>
      <Tooltip>
        <TooltipContent>New chat</TooltipContent>
        <TooltipTrigger asChild>
          <Button onClick={() => handleNewChat(router)} size="icon">
            <PlusIcon className="inline size-6" />
          </Button>
        </TooltipTrigger>
      </Tooltip>
      </div>
    </CardHeader>
  )
}
