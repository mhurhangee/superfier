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
import { MAX_CONTEXT_TOKENS } from '@/lib/constants'
import { LanguageModelUsage } from 'ai'
import { ChatError } from './error'

interface ChatContainerProps {
  id: string
  initialMessages: Message[]
  initialSettings: ChatSettings
  initialContextTokens?: number
}

export function ChatContainer({
  id,
  initialMessages,
  initialSettings,
  initialContextTokens,
}: ChatContainerProps) {
  const { getAIOptions, updateSettings } = useChatSettings()
  const initializedRef = useRef(false)
  const [tokenUsage, setTokenUsage] = useState(initialContextTokens || 0)
  const [tooLong, setTooLong] = useState(false)

  useEffect(() => {
    if (!initialSettings || initializedRef.current) return
    updateSettings('model', initialSettings.model)
    updateSettings('persona', initialSettings.persona)
    updateSettings('creativity', initialSettings.creativity)
    updateSettings('responseLength', initialSettings.responseLength)
    initializedRef.current = true
    if (initialContextTokens && initialContextTokens > MAX_CONTEXT_TOKENS) {
      setTooLong(true)
    }
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
      if (error.message.includes('Token limit exceeded') || error.message.includes('token limit')) {
        setTooLong(true)
        toast.error('Memory limit exceeded. Start a new chat.')
      } else {
        console.error(error)
        toast.error('An error occurred, please try again!')
      }
    },
    onFinish: (message: Message, options: { usage: LanguageModelUsage }) => {
      //TODO some sort of safeguarding, send to e.g. moderation API
      console.log(message)
      // Update token usage display when we get usage data
      if (options.usage) {
        setTokenUsage(options.usage.totalTokens)
      }
      if (options.usage?.totalTokens > MAX_CONTEXT_TOKENS) {
        toast.error('Memory limit exceeded. Start a new chat.')
        setTooLong(true)
      }
      if (options.usage?.totalTokens > MAX_CONTEXT_TOKENS * 0.9) {
        toast.warning('Very close to memory limit. Start a new chat.')
      }
      if (options.usage?.totalTokens > MAX_CONTEXT_TOKENS * 0.8) {
        toast.warning('Close to memory limit. Start a new chat.')
      }
      if (options.usage?.totalTokens > MAX_CONTEXT_TOKENS * 0.7) {
        toast.info('Approaching memory limit. Start a new chat soon.')
      }
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
        <ChatHeader tokenUsage={tokenUsage} />
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <ChatError status={status} tooLong={tooLong} />
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
            tooLong={tooLong}
          />
        </div>
        <MessageInput
          input={input}
          setInput={setInput}
          append={append}
          status={status}
          tooLong={tooLong}
        />
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
