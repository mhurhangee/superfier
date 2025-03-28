import { CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { EmptyState } from '@/components/chat/empty'
import { MessageList } from '@/components/chat/message-list'
import { ChatError } from '@/components/chat/error'
import { Message } from '@ai-sdk/react'
import { ActionType } from './confirmation-modal'

interface MessageAreaProps {
  messages: Message[]
  status: string
  setConfirmationState: (state: {
    open: boolean;
    action: ActionType | null;
    index: number | null;
  }) => void;
  editingMessageIndex?: number | null;
  editingMessageContent?: string;
  setEditingMessageContent?: (content: string) => void;
}

export function MessageArea({ 
  messages, 
  status, 
  setConfirmationState,
  editingMessageIndex = null,
  editingMessageContent = '',
  setEditingMessageContent = () => {} 
}: MessageAreaProps) {
  const lastAssistantMessageIndex = messages.findLastIndex((m) => m.role === 'assistant')
  return (
    <CardContent className="flex-1 p-0 pt-6 overflow-hidden">
      <ScrollArea className="h-full px-6 max-h-[calc(100vh-250px)] scroll-smooth">
        <div className="space-y-4 pb-2">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <MessageList
              messages={messages}
              status={status}
              lastAssistantMessageIndex={lastAssistantMessageIndex}
              setConfirmationState={setConfirmationState}
              editingMessageIndex={editingMessageIndex}
              editingMessageContent={editingMessageContent}
              setEditingMessageContent={setEditingMessageContent}
            />
          )}

          <ChatError status={status} />
        </div>
      </ScrollArea>
    </CardContent>
  )
}
