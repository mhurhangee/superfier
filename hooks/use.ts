'use client'

import { useEffect } from 'react'

import { type Message } from '@ai-sdk/react'

export const useScrollToLatestMessage = (messages: Message[]) => {
    useEffect(() => {
      const lastMessageIndex = messages.length - 1
      if (lastMessageIndex >= 0) {
        const scrollToLastMessage = () => {
          const lastMessageElement = document.querySelector(
            `[data-message-role="${messages[lastMessageIndex].role}"][data-message-index="${lastMessageIndex}"]`
          )
          lastMessageElement?.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
        setTimeout(scrollToLastMessage, 100)
      }
    }, [messages])
}