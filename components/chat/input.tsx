'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CardFooter } from '@/components/ui/card'
import { ArrowUp, Loader2, X } from 'lucide-react'
import type { CreateMessage } from 'ai'

interface MessageInputProps {
  input: string
  setInput: (input: string) => void
  append: (message: CreateMessage) => void
  status: 'submitted' | 'streaming' | 'ready' | 'error'
  isEditing?: boolean
  onCancelEditing?: () => void
}

export function MessageInput({ 
  input, 
  setInput, 
  append, 
  status, 
  isEditing = false,
  onCancelEditing = () => {}
}: MessageInputProps) {
  return (
    <CardFooter className="sticky bottom-0 z-10 rounded-bl-xl rounded-br-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim() && (status === 'ready' || status === 'error')) {
            append({
              role: 'user',
              content: input,
            })
            setInput('')
            if (isEditing) {
              onCancelEditing()
            }
          }
        }}
        className="w-full relative"
      >
        {isEditing && (
          <div className="absolute -top-8 left-0 right-0 px-4 py-1 bg-muted text-muted-foreground text-sm flex items-center justify-between">
            <span>Editing message</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 rounded-full"
              onClick={() => {
                onCancelEditing()
                setInput('')
              }}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Cancel editing</span>
            </Button>
          </div>
        )}
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isEditing ? 'Edit your message...' : 'Type your message...'}
          className="w-full min-h-[80px] max-h-[160px] resize-none pr-14 bg-background/50 focus:bg-background"
          disabled={status !== 'ready' && status !== 'error'}
          autoFocus
          autoComplete="off"
          withCounter
          maxLength={500}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              if (input.trim() && (status === 'ready' || status === 'error')) {
                append({
                  role: 'user',
                  content: input,
                })
                setInput('')
                if (isEditing) {
                  onCancelEditing()
                }
              }
            } else if (e.key === 'Escape' && isEditing) {
              onCancelEditing()
              setInput('')
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
          <span className="sr-only">{isEditing ? 'Update message' : 'Send message'}</span>
        </Button>
      </form>
    </CardFooter>
  )
}
