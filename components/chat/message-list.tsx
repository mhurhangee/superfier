'use client'

import { ChatMessage } from './message'
import type { Message } from 'ai'
import { SetConfirmationState } from './confirmation-modal'
import { MessageEdit } from './message-edit'

interface MessageListProps {
  messages: Message[]
  status: string
  lastAssistantMessageIndex: number
  setConfirmationState: SetConfirmationState
  editingMessageIndex: number | null
  setEditingMessageIndex: (index: number | null) => void
  editingMessageContent: string
  setEditingMessageContent: (content: string) => void
  setMessages: (messages: Message[]) => void
  reload: () => void
}

export function MessageList({
  messages,
  status,
  lastAssistantMessageIndex,
  setConfirmationState,
  editingMessageIndex,
  setEditingMessageIndex,
  editingMessageContent,
  setEditingMessageContent,
  setMessages,
  reload,
}: MessageListProps) {
  return (
    <div className="space-y-1">
      {messages.map((message, index) => {
        //Edit mode
        if (editingMessageIndex === index) {
          return (
            <div key={index}>
              <MessageEdit
                editingMessageContent={editingMessageContent}
                setEditingMessageContent={setEditingMessageContent}
                messages={messages}
                setMessages={setMessages}
                setEditingMessageIndex={setEditingMessageIndex}
                reload={reload}
                editingMessageIndex={editingMessageIndex}
              />
            </div>
          )
        } else {
          //Hacky method to make scrolling to user message work
          //Do not render last user message until padded AI message is streaming back
          //TODO: Remove this hack
          //Skip rendering the last user message if:
          // 1. It's the last message in the array
          // 2. It's a user message
          // 3. The status is 'streaming' meaning the AI is streaming back
          const isLastUserMessageWaitingForResponse =
            index === messages.length - 1 &&
            message.role === 'user' &&
            status !== 'streaming' &&
            index > lastAssistantMessageIndex
          // Message render
          if (!isLastUserMessageWaitingForResponse) {
            return (
              <div key={index}>
                <ChatMessage
                  message={message}
                  index={index}
                  status={status}
                  lastAssistantMessageIndex={lastAssistantMessageIndex}
                  setConfirmationState={setConfirmationState}
                />
              </div>
            )
          }
          return null
        }
      })}
    </div>
  )
}
