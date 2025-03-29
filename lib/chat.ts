import { Message, generateId } from 'ai'
import { ActionType } from '@/components/chat/confirmation-modal'
import { toast } from 'sonner'

interface handleDeleteMessageProps {
  index: number
  messages: Message[]
  setMessages: (messages: Message[]) => void
}

const handleDeleteMessage = ({ index, messages, setMessages }: handleDeleteMessageProps) => {
  // Delete the message and all subsequent messages
  const newMessages = messages.slice(0, index)
  setMessages(newMessages)
  toast.success('Message deleted')
}

interface handleDeleteMessageProps {
  index: number
  messages: Message[]
  setMessages: (messages: Message[]) => void
  reload: () => void
}

const handleRegenerateResponse = ({
  index,
  messages,
  setMessages,
  reload,
}: handleDeleteMessageProps) => {
  if (index % 2 === 1) {
    // If it's an AI message (odd index)
    // Get the user message before this AI message
    const userMessageIndex = index - 1
    if (userMessageIndex >= 0) {
      // Keep messages up to and including the user message
      const newMessages = messages.slice(0, userMessageIndex + 1)
      setMessages(newMessages)
      // Then reload to generate a new AI response
      reload()
      toast.success('Regenerating response...')
    }
  }
}

interface startEditingMessageProps {
  index: number
  messages: Message[]
  setEditingMessageIndex: (index: number | null) => void
  setEditingMessageContent: (content: string) => void
}

const startEditingMessage = ({
  index,
  messages,
  setEditingMessageIndex,
  setEditingMessageContent,
}: startEditingMessageProps) => {
  setEditingMessageIndex(index)
  setEditingMessageContent(messages?.[index]?.content || '')
}

interface CancelEditingMessageProps {
  setEditingMessageIndex: (index: number | null) => void
  setEditingMessageContent: (content: string) => void
}

export const cancelEditingMessage = ({
  setEditingMessageIndex,
  setEditingMessageContent,
}: CancelEditingMessageProps) => {
  setEditingMessageIndex(null)
  setEditingMessageContent('')
}

interface saveEditedMessageProps {
  messages: Message[]
  setMessages: (messages: Message[]) => void
  setEditingMessageIndex: (index: number | null) => void
  setEditingMessageContent: (content: string) => void
  reload: () => void
  editingMessageIndex: number | null
  editingMessageContent: string
}

export const saveEditedMessage = ({
  messages,
  setMessages,
  setEditingMessageIndex,
  setEditingMessageContent,
  reload,
  editingMessageIndex,
  editingMessageContent,
}: saveEditedMessageProps) => {
  if (editingMessageIndex === null || !editingMessageContent.trim()) {
    return
  }

  // Ensure the index is valid
  if (editingMessageIndex < 0 || editingMessageIndex >= messages.length) {
    console.error('Invalid message index for editing')
    return
  }

  // Create a completely new message array
  const newMessages = messages.slice(0, editingMessageIndex)

  // Create a new message with proper typing
  const newMessage: Message = {
    id: generateId(),
    role: 'user', // User messages are the only ones that can be edited
    content: editingMessageContent,
  }

  // Add the new message
  newMessages.push(newMessage)

  // Update messages
  setMessages(newMessages)

  // Reset editing state
  setEditingMessageIndex(null)
  setEditingMessageContent('')

  // Reload to generate a new AI response
  reload()
}

interface handleConfirmActionParams {
  messages: Message[]
  setMessages: (messages: Message[]) => void
  confirmationState: {
    open: boolean
    action: ActionType | null
    index: number | null
  }
  reload: () => void
  setEditingMessageIndex: (index: number | null) => void
  setEditingMessageContent: (content: string) => void
}

// Main confirmation action handler - routes to specific handlers
export const handleConfirmAction = ({
  messages,
  setMessages,
  confirmationState,
  reload,
  setEditingMessageIndex,
  setEditingMessageContent,
}: handleConfirmActionParams) => {
  const { action, index } = confirmationState
  if (index === null) return

  switch (action) {
    case 'delete':
      handleDeleteMessage({ index, messages, setMessages, reload })
      break
    case 'regenerate':
      handleRegenerateResponse({ index, messages, setMessages, reload })
      break
    case 'edit':
      startEditingMessage({ index, messages, setEditingMessageIndex, setEditingMessageContent })
      break
  }
}
