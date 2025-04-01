import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Check, X, BotMessageSquare } from 'lucide-react'
import { cancelEditingMessage, saveEditedMessage } from '@/lib/chat'
import { Message } from '@ai-sdk/react'

interface MessageEditProps {
  editingMessageContent: string
  setEditingMessageContent: (content: string) => void
  messages: Message[]
  setMessages: (messages: Message[]) => void
  setEditingMessageIndex: (index: number | null) => void
  reload: () => void
  editingMessageIndex: number | null
}

export function MessageEdit({
  editingMessageContent,
  setEditingMessageContent,
  messages,
  setMessages,
  setEditingMessageIndex,
  reload,
  editingMessageIndex,
}: MessageEditProps) {
  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-1">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <BotMessageSquare className="h-3.5 w-3.5" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          <Textarea
            value={editingMessageContent}
            onChange={(e) => setEditingMessageContent(e.target.value)}
            className="min-h-[100px] text-sm"
            placeholder="Edit your message..."
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3"
              onClick={() => cancelEditingMessage}
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              className="h-8 px-3"
              onClick={() =>
                saveEditedMessage({
                  messages,
                  setMessages,
                  setEditingMessageIndex,
                  setEditingMessageContent,
                  reload,
                  editingMessageIndex,
                  editingMessageContent,
                })
              }
              disabled={!editingMessageContent.trim()}
            >
              <Check className="h-3.5 w-3.5 mr-1" />
              Save & Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
