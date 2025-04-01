import type { CreateMessage } from 'ai'

interface MessageInputProps {
  e:
    | React.FormEvent<HTMLFormElement>
    | React.KeyboardEvent<HTMLFormElement>
    | React.KeyboardEvent<HTMLTextAreaElement>
  input: string
  setInput: (input: string) => void
  append: (message: CreateMessage) => void
  status: 'submitted' | 'streaming' | 'ready' | 'error'
}

export const handleMessageSend = async ({
  e,
  input,
  setInput,
  append,
  status,
}: MessageInputProps) => {
  e.preventDefault()

  if (input.trim() && (status === 'ready' || status === 'error')) {
    append({
      role: 'user',
      content: input,
    })
    setInput('')
  }
}
