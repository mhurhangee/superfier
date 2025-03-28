'use client'

import { useChat } from '@ai-sdk/react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { MessageInput } from './input'
import { ChatHeader } from './header'
import { MessageArea } from './message-area'
import { useScrollToLatestMessage } from '@/hooks/useScrollToLatestMessage'
import { useState } from 'react'
import { ConfirmationModal, ConfirmationState } from './confirmation-modal'
import { handleConfirmAction } from '@/lib/chat'


export function ChatContainer() {
  const { messages, input, setInput, append, status, setMessages, reload } = useChat({
    experimental_throttle: 50,
    onError: () => {
      toast.error('An error occured, please try again!')
    },
  })

  useScrollToLatestMessage(messages)

  const [confirmationState, setConfirmationState] = useState<ConfirmationState>({
    open: false,
    action: null,
    index: null,
  });

  const [editingMessageIndex, setEditingMessageIndex] = useState<number | null>(null);
  const [editingMessageContent, setEditingMessageContent] = useState('');

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex justify-center">
      <Card className="w-full min-w-xs sm:min-w-sm md:min-w-md lg:min-w-2xl xl:min-w-4xl mx-auto h-full flex flex-col border-0 bg-background">
        <ChatHeader setInput={setInput} setMessages={setMessages} />
        <MessageArea 
        messages={messages} 
        status={status} 
        setConfirmationState={setConfirmationState} 
        editingMessageIndex={editingMessageIndex}
        editingMessageContent={editingMessageContent}
        setEditingMessageContent={setEditingMessageContent}
        setEditingMessageIndex={setEditingMessageIndex}
        setMessages={setMessages}
        reload={reload}
        />
        <MessageInput input={input} setInput={setInput} append={append} status={status} />
      </Card>
      <ConfirmationModal
        open={confirmationState.open}
        onOpenChange={(open) => setConfirmationState({ ...confirmationState, open })}
        onConfirm={() => handleConfirmAction({
          messages,
          setMessages,
          confirmationState,
          reload,
          setEditingMessageIndex,
          setEditingMessageContent
        })}
        actionType={confirmationState.action}
      />
    </div>
  )
}
