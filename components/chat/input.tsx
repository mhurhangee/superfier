'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CardFooter } from '@/components/ui/card'
import { ArrowUp, Loader2 } from 'lucide-react'
import type { CreateMessage } from 'ai'
import { handleMessageSend } from '@/lib/handle-message-send'

interface MessageInputProps {
  input: string
  setInput: (input: string) => void
  append: (message: CreateMessage) => void
  status: 'submitted' | 'streaming' | 'ready' | 'error'
}

export function MessageInput({ input, setInput, append, status }: MessageInputProps) {
  return (
    <CardFooter className="sticky bottom-0 z-10 rounded-bl-xl rounded-br-xl">
      <form
        onSubmit={(e) =>
          handleMessageSend({
            e,
            input,
            setInput,
            append,
            status,
          })
        }
        className="w-full relative"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'Type your message...'}
          className="w-full min-h-[80px] max-h-[160px] resize-none pr-14 bg-background/50 focus:bg-background"
          disabled={status !== 'ready' && status !== 'error'}
          autoFocus
          autoComplete="off"
          withCounter
          maxLength={500}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleMessageSend({
                e,
                input,
                setInput,
                append,
                status,
              })
            }
          }}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-3 top-3 h-10 w-10 rounded-full shadow-sm"
          disabled={(status !== 'ready' && status !== 'error') || input.trim() === ''}
        >
          {status === 'submitted' || status === 'streaming' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </CardFooter>
  )
}
