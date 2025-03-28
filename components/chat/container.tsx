'use client'

import { useChat } from '@ai-sdk/react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { EmptyState } from './empty'
import { MessageList } from './message-list'
import { MessageInput } from './input'
import { ChatError } from './error'
import { useScrollToLatestMessage } from '@/hooks/useScrollToLatestMessage'
import { BotMessageSquareIcon, PlusIcon } from 'lucide-react'


export function ChatContainer() {
  const { messages, input, setInput, append, status, setMessages } = useChat({
    experimental_throttle: 50,
    onError: () => {
      toast.error('An error occured, please try again!')
    },
  })

  const lastAssistantMessageIndex = messages.findLastIndex((m) => m.role === 'assistant')

  useScrollToLatestMessage(messages)

  const handleNewChat = () => {
    setInput('');
    setMessages([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex justify-center">
      <Card className="w-full min-w-xs sm:min-w-sm md:min-w-md lg:min-w-2xl xl:min-w-4xl mx-auto h-full flex flex-col border-0 bg-background">
        <CardHeader className="flex items-center justify-between">
          <CardTitle><BotMessageSquareIcon className="inline size-6 ml-4" /> Chat</CardTitle>
          <Tooltip>
            <TooltipContent>New chat</TooltipContent>
            <TooltipTrigger><Button onClick={handleNewChat} size="icon"><PlusIcon className="inline size-6" /></Button></TooltipTrigger>
          </Tooltip>
        </CardHeader>
        <CardContent className="flex-1 p-0 pt-6 overflow-hidden">
          <ScrollArea
            className="h-full px-6 max-h-[calc(100vh-250px)] scroll-smooth"
          >
            <div className="space-y-4 pb-2">
              {messages.length === 0 ? (
                <EmptyState />
              ) : (
                <MessageList
                  messages={messages}
                  status={status}
                  lastAssistantMessageIndex={lastAssistantMessageIndex}
                />
              )}

              <ChatError status={status} />
            </div>
          </ScrollArea>
        </CardContent>

        <MessageInput input={input} setInput={setInput} append={append} status={status} />
      </Card>
    </div>
  )
}
