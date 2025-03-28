'use client'

import { ChatMessage } from './message'
import type { Message } from 'ai'
import { ActionType } from './confirmation-modal'

interface MessageListProps {
  messages: Message[]
  status: string
  lastAssistantMessageIndex: number
  setConfirmationState: (state: {
    open: boolean;
    action: ActionType | null;
    index: number | null;
  }) => void;
  editingMessageIndex?: number | null;
  editingMessageContent?: string;
  setEditingMessageContent?: (content: string) => void;
}

export function MessageList({ 
  messages, 
  status, 
  lastAssistantMessageIndex, 
  setConfirmationState,
  editingMessageIndex = null,
  editingMessageContent = '',
  setEditingMessageContent = () => {}
}: MessageListProps) {
  return (
    <div className="space-y-1">
      {messages.map((message, index) => {
        //Hacky method to make scrolling to user message work
        //Do not render last user message until padded AI message is streaming back
        //TODO: Remove this hack
        //Skip rendering the last user message if:
        // 1. It's the last message in the array
        // 2. It's a user message
        // 3. The status is 'in_progress' meaning the AI is thinking but not streaming yet
        const isLastUserMessageWaitingForResponse =
          index === messages.length - 1 &&
          message.role === 'user' &&
          index > lastAssistantMessageIndex

        // Only render the message if it's not the last user message waiting for a response
        if (!isLastUserMessageWaitingForResponse) {
          return (
            <div key={index}>
              <ChatMessage
                message={message}
                index={index}
                status={status}
                lastAssistantMessageIndex={lastAssistantMessageIndex}
                setConfirmationState={setConfirmationState}
                isEditing={editingMessageIndex === index}
                editingContent={editingMessageIndex === index ? editingMessageContent : ''}
                setEditingContent={setEditingMessageContent}
              />
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
