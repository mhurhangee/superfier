'use client'

import { ChatMessage } from './message'
import type { Message } from 'ai'
import { SetConfirmationState } from './confirmation-modal'
import { MessageEdit } from './message-edit'

interface MessageListProps {
  messages: Message[]
  status: string
  setConfirmationState: SetConfirmationState
  editingMessageIndex: number | null
  setEditingMessageIndex: (index: number | null) => void
  editingMessageContent: string
  setEditingMessageContent: (content: string) => void
  setMessages: (messages: Message[]) => void
  reload: () => void
  tooLong: boolean
}

export function MessageList({
  messages,
  status,
  setConfirmationState,
  editingMessageIndex,
  setEditingMessageIndex,
  editingMessageContent,
  setEditingMessageContent,
  setMessages,
  reload,
  tooLong,
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
          return (
            <div key={index}>
              <ChatMessage
                message={message}
                lastMessage={index === messages.length - 1}
                index={index}
                status={status}
                setConfirmationState={setConfirmationState}
                tooLong={tooLong}
              />
            </div>
          )
        }
      })}
    </div>
  )
}
