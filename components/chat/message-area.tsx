import { CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { EmptyState } from '@/components/chat/empty'
import { MessageList } from '@/components/chat/message-list'
import { ChatError } from '@/components/chat/error'
import { Message } from '@ai-sdk/react'
import { SetConfirmationState } from './confirmation-modal'

interface MessageAreaProps {
  messages: Message[]
  status: string
  setConfirmationState: SetConfirmationState
  editingMessageIndex: number | null
  editingMessageContent: string
  setEditingMessageContent: (content: string) => void
  setEditingMessageIndex: (index: number | null) => void
  setMessages: (messages: Message[]) => void
  reload: () => void
  tooLong: boolean
}

export function MessageArea({
  messages,
  status,
  setConfirmationState,
  editingMessageIndex,
  editingMessageContent,
  setEditingMessageContent,
  setEditingMessageIndex,
  setMessages,
  reload,
  tooLong
}: MessageAreaProps) {
  return (
    <CardContent className="flex-1 p-0 overflow-hidden">
      <ScrollArea className="h-full scroll-smooth">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <MessageList
              messages={messages}
              status={status}
              setConfirmationState={setConfirmationState}
              editingMessageIndex={editingMessageIndex}
              editingMessageContent={editingMessageContent}
              setEditingMessageContent={setEditingMessageContent}
              setEditingMessageIndex={setEditingMessageIndex}
              setMessages={setMessages}
              reload={reload}
              tooLong={tooLong}
            />
          )}
        </div>
      </ScrollArea>
    </CardContent>
  )
}
