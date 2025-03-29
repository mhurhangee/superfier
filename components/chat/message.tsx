'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User, BotMessageSquare } from 'lucide-react'
import type { Message } from 'ai'
import { MemoizedMarkdown } from './memoized-markdown'
import { Streaming } from './streaming'
import { ActionButtons } from './action-buttons'
import { SetConfirmationState } from './confirmation-modal'

interface ChatMessageProps {
  message: Message
  index: number
  status: string
  lastAssistantMessageIndex: number
  setConfirmationState: SetConfirmationState
}

export function ChatMessage({
  message,
  index,
  status,
  lastAssistantMessageIndex,
  setConfirmationState,
}: ChatMessageProps) {
  const isUser = message.role === 'user'
  const [showActions, setShowActions] = useState(false)

  return (
    <div
      className={`flex flex-col gap-1 py-2 ${lastAssistantMessageIndex === index ? 'min-h-[calc(100vh-300px)]' : ''}`}
      key={index}
      data-message-role={message.role}
      data-message-index={index}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-1">
          <Avatar className="h-7 w-7">
            <AvatarFallback
              className={
                isUser ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
              }
            >
              {isUser ? (
                <User className="h-3.5 w-3.5" />
              ) : (
                <BotMessageSquare className="h-3.5 w-3.5" />
              )}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col w-full min-w-0">
          <div className="prose dark:prose-invert text-sm w-full">
            <MemoizedMarkdown content={message.content} id={index.toString()} />
          </div>
        </div>
        <ActionButtons
          message={message}
          showActions={showActions}
          index={index}
          setConfirmationState={setConfirmationState}
        />
      </div>
      <Streaming
        status={status}
        lastAssistantMessageIndex={lastAssistantMessageIndex}
        index={index}
      />
    </div>
  )
}
