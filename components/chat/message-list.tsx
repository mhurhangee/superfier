'use client'

import { ChatMessage } from './message';
import type { Message } from 'ai';

interface MessageListProps {
  messages: Message[];
  status: string;
  lastAssistantMessageIndex: number;
}

export function MessageList({
  messages,
  status,
  lastAssistantMessageIndex,
}: MessageListProps) {
  return (
    <div className="space-y-1">
      {messages.map((message, index) => {
        // Skip rendering the last user message if:
        // 1. It's the last message in the array
        // 2. It's a user message
        // 3. The status is 'in_progress' meaning the AI is thinking but not streaming yet
        const isLastUserMessageWaitingForResponse = 
          index === messages.length - 1 && 
          message.role === 'user' && 
          index > lastAssistantMessageIndex;
        
        // Only render the message if it's not the last user message waiting for a response
        if (!isLastUserMessageWaitingForResponse) {
          return (
            <div key={index}>
              <ChatMessage
                message={message}
                index={index}
                status={status}
                lastAssistantMessageIndex={lastAssistantMessageIndex}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}