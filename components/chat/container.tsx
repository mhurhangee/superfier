'use client'

import { useChat } from '@ai-sdk/react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { MessageInput } from './input'
import { ChatHeader } from './header'
import { MessageArea } from './message-area'
import { useScrollToLatestMessage } from '@/hooks/useScrollToLatestMessage'
import { useEffect, useState, useRef } from 'react'
import { ConfirmationModal, ConfirmationState } from './confirmation-modal'
import { handleConfirmAction } from '@/lib/chat'
import { Message } from 'ai'
import { useChatSettings, ChatSettings } from '@/components/providers/chat-settings'

interface ChatContainerProps {
  id: string
  initialMessages: Message[]
  initialSettings: ChatSettings
}

export function ChatContainer({ id, initialMessages, initialSettings }: ChatContainerProps) {
  const { getAIOptions, updateSettings } = useChatSettings()
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!initialSettings || initializedRef.current) return
    updateSettings('model', initialSettings.model)
    updateSettings('persona', initialSettings.persona)
    updateSettings('creativity', initialSettings.creativity)
    updateSettings('responseLength', initialSettings.responseLength)
    initializedRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSettings])

  const { messages, input, setInput, append, status, setMessages, reload } = useChat({
    id: id,
    initialMessages,
    body: {
      ...getAIOptions(),
    },
    sendExtraMessageFields: true,
    experimental_throttle: 50,
    onError: (error: Error) => {
      console.error(error)
      toast.error('An error occured, please try again!')
    },
  })

  useScrollToLatestMessage(messages)

  const [confirmationState, setConfirmationState] = useState<ConfirmationState>({
    open: false,
    action: null,
    index: null,
  })

  const [editingMessageIndex, setEditingMessageIndex] = useState<number | null>(null)
  const [editingMessageContent, setEditingMessageContent] = useState('')

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex justify-center">
      <Card className="w-full min-w-xs sm:min-w-sm md:min-w-md lg:min-w-2xl xl:min-w-4xl mx-auto h-screen flex flex-col border-0 bg-background overflow-hidden">
        <ChatHeader />
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
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
        </div>
        <MessageInput input={input} setInput={setInput} append={append} status={status} />
      </Card>
      <ConfirmationModal
        open={confirmationState.open}
        onOpenChange={(open) => setConfirmationState({ ...confirmationState, open })}
        onConfirm={() =>
          handleConfirmAction({
            messages,
            setMessages,
            confirmationState,
            reload,
            setEditingMessageIndex,
            setEditingMessageContent,
            id,
          })
        }
        actionType={confirmationState.action}
      />
    </div>
  )
}
